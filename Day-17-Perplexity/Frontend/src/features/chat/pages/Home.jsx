import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import remarkGfm from 'remark-gfm'

const Home = () => {
  const chat = useChat()
  const [ chatInput, setChatInput ] = useState('')

  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)
  const isLoading = useSelector((state) => state.chat.isLoading)

  const handleSubmitMessage = (event) => {
    event.preventDefault()

    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) return

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    setChatInput('')
  }

  const currentMessages = chats[ currentChatId ]?.messages || []

  return (
    <div className='flex h-full min-h-0 flex-1 flex-col gap-4'>
      <div className='messages flex-1 space-y-4 overflow-y-auto rounded-3xl border border-white/10 bg-[#070d1b]/75 p-4 backdrop-blur-md md:p-6'>
        {!currentMessages.length && (
          <div className='flex h-full min-h-72 flex-col items-center justify-center text-center'>
            <div className='ai-orb mb-7'></div>
            <h2 className='text-3xl font-semibold text-white'>Good Evening</h2>
            <p className='mt-2 max-w-md text-base text-white/65'>How can I help you today? Ask anything, generate ideas, or continue your previous chat.</p>
          </div>
        )}

        {currentMessages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[85%] w-fit rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm md:text-base ${
              message.role === 'user'
                ? 'ml-auto rounded-br-none border border-sky-200/30 bg-gradient-to-br from-sky-500/35 to-indigo-500/30 text-white'
                : 'mr-auto border border-white/10 bg-white/5 text-white/90'
            }`}
          >
            {message.role === 'user' ? (
              <p>{message.content}</p>
            ) : (
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className='mb-2 last:mb-0'>{children}</p>,
                  ul: ({ children }) => <ul className='mb-2 list-disc pl-5'>{children}</ul>,
                  ol: ({ children }) => <ol className='mb-2 list-decimal pl-5'>{children}</ol>,
                  code: ({ children }) => <code className='rounded bg-white/10 px-1 py-0.5 text-sky-200'>{children}</code>,
                  pre: ({ children }) => <pre className='mb-2 overflow-x-auto rounded-xl border border-white/10 bg-black/30 p-3'>{children}</pre>
                }}
                remarkPlugins={[remarkGfm]}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>
        ))}

        {isLoading && (
          <div className='mr-auto w-fit rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/90'>
            <div className='mb-2 text-xs text-white/55'>AI is thinking...</div>
            <div className='typing-dots'>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      <footer className='space-y-3 rounded-3xl border border-white/10 bg-[#0b1325]/75 p-4 backdrop-blur-md md:p-5'>
        <form onSubmit={handleSubmitMessage} className='space-y-3'>
          <input
            type='text'
            value={chatInput}
            onChange={(event) => setChatInput(event.target.value)}
            placeholder='Message AI Chat...'
            className='w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-base text-white outline-none transition placeholder:text-white/35 focus:border-sky-300/60 md:text-lg'
          />

          <div className='flex flex-wrap items-center justify-between gap-3'>
            <div className='flex flex-wrap gap-2'>
              <button type='button' className='rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/85 transition hover:bg-white/12 md:text-sm'>
                Create an image
              </button>
              <button type='button' className='rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/85 transition hover:bg-white/12 md:text-sm'>
                Search the web
              </button>
            </div>

            <button
              type='submit'
              disabled={!chatInput.trim()}
              className='rounded-xl border border-sky-200/25 bg-gradient-to-r from-sky-500/70 to-indigo-500/70 px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 md:text-base'
            >
              Send
            </button>
          </div>
        </form>

        <div className='grid grid-cols-1 gap-3 pt-1 md:grid-cols-3'>
          {[
            { title: 'Smart Budget', text: 'A budget that fits your lifestyle, not the other way around.' },
            { title: 'Analytics', text: 'Clear insights that help you make better decisions quickly.' },
            { title: 'Spending', text: 'Track and improve where your money goes each month.' }
          ].map((card) => (
            <article key={card.title} className='rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/8'>
              <h3 className='text-base font-semibold text-white'>{card.title}</h3>
              <p className='mt-1 text-sm text-white/55'>{card.text}</p>
            </article>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default Home

