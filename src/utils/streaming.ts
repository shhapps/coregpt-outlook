export async function* streamAsyncIterable(response: Response): AsyncGenerator<string, void, unknown> {
  const reader: ReadableStreamDefaultReader<Uint8Array> = response.body!.getReader()
  const decoder = new TextDecoder()

  try {
    while (true) {
      const { done, value }: ReadableStreamReadResult<Uint8Array> = await reader.read()
      if (done) return
      yield decoder.decode(value, { stream: true })
    }
  } finally {
    reader.releaseLock()
  }
}
