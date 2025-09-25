import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import type { IMessage } from '@/interfaces/app.interfaces'
import { StoreNames } from '@/utils/constants'
import { getStoreName } from '@/utils/global'

export interface IChatState {
  conversationId?: string
  setConversationId: (conversationId?: string) => void
  chatResponseLoading?: boolean
  setChatResponseLoading: (chatResponseLoading?: boolean) => void
  storeMessages: IMessage[]
  setStoreMessages: (messages: IMessage[]) => void
}

export const useChatStore = create<IChatState>()(
  devtools(
    set => ({
      setChatResponseLoading: chatResponseLoading => set({ chatResponseLoading }),
      setConversationId: (conversationId?: string) => set({ conversationId }),
      storeMessages: [],
      setStoreMessages: (messages: IMessage[]) => set({ storeMessages: messages })
    }),
    { name: getStoreName(StoreNames.chatStore) }
  )
)
