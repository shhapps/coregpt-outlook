import { CheckIcon, CopyIcon, Cross2Icon, MaskOnIcon, PaperPlaneIcon, Pencil2Icon } from '@radix-ui/react-icons'
import { Box, Flex, Grid, IconButton, Text, TextArea, Tooltip } from '@radix-ui/themes'
import {
  createRef,
  useLayoutEffect,
  useRef,
  useState,
  type FC,
  type RefObject,
  type KeyboardEvent,
  useEffect
} from 'react'
import ReactMarkdown from 'react-markdown'
import { toast } from 'sonner'

import classes from './chat.module.css'

import ChatIcon from '@/components/ui/icons/ChatIcon.tsx'
import useCopy from '@/hooks/useCopy.ts'
import type { IMessage, IMessageExamples } from '@/interfaces/app.interfaces.ts'
import { useAppStore } from '@/stores/app.store.ts'
import { useChatStore } from '@/stores/chat.store.ts'
import { API_URL, conversationIdHeader, cssThemeColorVarName, LocalStorageKeys, Theme } from '@/utils/constants.ts'
import { debounce, reloadWithClearing } from '@/utils/global'
import { getSelectedSlidesText } from '@/utils/office/slide-utils.ts'
import { sendErrorToSentry } from '@/utils/sentry.ts'
import { streamAsyncIterable } from '@/utils/streaming.ts'

interface ICopyBtnProps {
  index: number
  content: string
  assistantRefs: RefObject<RefObject<HTMLDivElement>[]>
}

const examples: IMessageExamples[] = [
  { icon: '📋', message: 'Create a presentation outline for my topic' },
  { icon: '✨', message: 'Generate slide content for this section' },
  { icon: '🎨', message: 'Suggest design improvements for my slides' },
  { icon: '🎤', message: 'Write speaker notes for this presentation' }
]

const CopyBtn: FC<ICopyBtnProps> = ({ index, content, assistantRefs }) => {
  const { handleCopy: handleCopyFallback } = useCopy()
  const [copied, setCopied] = useState(false)
  const handleCopy = async (idx: number, markdown: string) => {
    const container = assistantRefs.current[idx].current
    if (!container) return

    const html = container.innerHTML
    const blobPlain = new Blob([markdown], { type: 'text/plain' })
    const blobHtml = new Blob([html], { type: 'text/html' })

    try {
      await navigator.clipboard.write([new ClipboardItem({ 'text/plain': blobPlain, 'text/html': blobHtml })])
      setCopied(true)
    } catch {
      try {
        await navigator.clipboard.writeText(markdown)
      } catch (error) {
        console.error('Error while second copy:', error)
        handleCopyFallback(markdown)
      }
      setCopied(true)
    } finally {
      setTimeout(() => setCopied(false), 2 * 1000)
    }
  }

  return (
    <IconButton onClick={() => handleCopy(index, content)} variant="solid" size="1" className={classes.copyIcon}>
      {copied ? <CheckIcon width="12px" height="12px" /> : <CopyIcon width="12px" height="12px" />}
    </IconButton>
  )
}

export default function Chat() {
  const {
    conversationId,
    setConversationId,
    chatResponseLoading,
    setChatResponseLoading,
    storeMessages,
    setStoreMessages
  } = useChatStore()
  const [currentSelection, setCurrentSelection] = useState<string>('')
  const { theme, appTab } = useAppStore()
  const [messages, setMessages] = useState<IMessage[]>(storeMessages)
  const messagesRef = useRef<HTMLDivElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const abortControllerRef = useRef<AbortController>(null)

  const assistantRefs = useRef<RefObject<HTMLDivElement>[]>([])

  useLayoutEffect(() => {
    assistantRefs.current = messages.map((_, i) => assistantRefs.current[i] || createRef<HTMLDivElement>())
  }, [messages])

  async function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement | HTMLButtonElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      await handleSend()
    }
  }

  const handleSend = async () => {
    const userMessage = textAreaRef.current?.value
    if (!userMessage || chatResponseLoading) return

    setMessages(old => [...old, { role: 'user', content: userMessage }])
    textAreaRef.current!.value = ''

    if (!chatResponseLoading) await handleGenerate(userMessage)
  }

  const handleGenerate = async (prompt: string) => {
    try {
      const accessToken = localStorage.getItem(LocalStorageKeys.accessToken)
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken!}`,
        [LocalStorageKeys.requestId]: localStorage.getItem(LocalStorageKeys.requestId)!
      } as HeadersInit

      setChatResponseLoading(true)

      const abortController = new AbortController()
      abortControllerRef.current = abortController

      const response = await fetch(`${API_URL}/powerpoint/ai-chat`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: `${prompt}${currentSelection.trim().length ? ` ${currentSelection}` : ''}`,
          conversation_id: conversationId
        }),
        signal: abortController.signal
      })

      if (response.status === 401) return reloadWithClearing()
      if (!response.ok) throw new Error((await response.json()).message)
      if (!response.body) throw new Error('Streaming not supported')

      setMessages(old => [...old, { role: 'assistant', content: '' }])

      const chatConversationId = response.headers.get(conversationIdHeader)

      if (chatConversationId !== conversationId) setConversationId(String(chatConversationId))

      for await (const chunk of streamAsyncIterable(response)) {
        setMessages(old => {
          const next = [...old]
          next[next.length - 1] = {
            ...next[next.length - 1],
            content: next[next.length - 1].content + chunk
          }
          return next
        })
      }
    } catch (err) {
      const errorMessage = String(err)
      if (errorMessage.includes('AbortError:')) return
      console.error(err)
      toast.error('Error streaming response', {
        action: { label: <Cross2Icon />, onClick: () => {} }
      })
      sendErrorToSentry(err)
    } finally {
      setChatResponseLoading(false)
      textAreaRef.current?.focus()
    }
  }

  const handleSendClick = async () => {
    if (chatResponseLoading && abortControllerRef.current) return abortControllerRef.current.abort()
    else await handleSend()
  }

  const handleExampleClick = async (message: string) => {
    textAreaRef.current!.value = message
    await handleSend()
  }

  const handleNewChatClick = () => {
    textAreaRef.current!.value = ''
    setMessages([])
    setConversationId()
    textAreaRef.current?.focus()
  }

  useLayoutEffect(() => {
    const el = messagesRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages])

  useEffect(() => {
    debounce(() => setStoreMessages(messages))()
  }, [messages, setStoreMessages])

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort()
    }
  }, [appTab])

  useEffect(() => {
    async function checkCurrentSelection() {
      if (!currentSelection) {
        const currentSelectionText = await getSelectedSlidesText()
        if (currentSelectionText.trim().length !== 0) setCurrentSelection(currentSelectionText)
      }
    }

    async function handleSelectionChange() {
      Office.context.document.addHandlerAsync(Office.EventType.DocumentSelectionChanged, async function () {
        const currentSelectionText = await getSelectedSlidesText()
        setCurrentSelection(currentSelectionText)
      })
    }

    void handleSelectionChange()
    void checkCurrentSelection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.header}>
        <Flex justify="between" align="center">
          <Flex align="center" justify="start" gap="2">
            <IconButton className={classes.chatIcon} variant="outline">
              <ChatIcon />
            </IconButton>
            <Text size="3" weight="bold" style={{ color: `var(${cssThemeColorVarName})` }}>
              GPT Chat Assistant
            </Text>
          </Flex>
          <Tooltip content="New Chat">
            <IconButton
              disabled={chatResponseLoading || !messages.length}
              onClick={handleNewChatClick}
              variant="outline"
              size="1"
              className={classes.newChatIcon}
            >
              <Pencil2Icon />
            </IconButton>
          </Tooltip>
        </Flex>
      </Box>

      <Box className={classes.messages} ref={messagesRef}>
        {!messages.length && (
          <Grid gap="3" className={classes.examplesContainer}>
            {examples.map(({ icon, message }, i) => (
              <Text
                onClick={() => handleExampleClick(message)}
                className={classes.exampleMessage}
                key={message}
                as="span"
                size="1"
                mt={i === 0 ? '4' : '1'}
                mb="1"
              >
                {icon} <i>{message}</i>
              </Text>
            ))}
          </Grid>
        )}

        {messages.map((message, i) =>
          message.role === 'assistant' ? (
            <Flex justify="start" key={i} my="2" align="start">
              <Text size="1">
                <Box
                  className={`${classes.assistantMessage} ${theme === Theme.light ? classes.light : classes.dark}`}
                  ref={assistantRefs.current[i]}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                  {!chatResponseLoading && (
                    <CopyBtn index={i} content={message.content} assistantRefs={assistantRefs} />
                  )}
                </Box>
              </Text>
            </Flex>
          ) : (
            <Flex justify="end" key={i} my="2">
              <Box className={`${classes.userMessage} whitespace-pre-line`}>
                <Text size="1">{message.content}</Text>
              </Box>
            </Flex>
          )
        )}
      </Box>

      <Box className={classes.input}>
        {currentSelection && (
          <Box className={classes.selection}>
            <Text size="1">Selection: {currentSelection}</Text>
          </Box>
        )}
        <TextArea
          className={classes.textArea}
          onKeyDown={handleKeyDown}
          autoFocus
          ref={textAreaRef}
          rows={4}
          placeholder="Ask freely... Select slides for context"
        />
        <IconButton
          onClick={handleSendClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          className={classes.sendBtn}
          variant="outline"
          autoFocus
        >
          {chatResponseLoading ? <MaskOnIcon color="red" /> : <PaperPlaneIcon />}
        </IconButton>
      </Box>
    </Box>
  )
}
