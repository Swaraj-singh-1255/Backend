import React from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'

const History = () => {
  const chat = useChat()
  const navigate = useNavigate()

  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)

  const chatList = Object.values(chats).sort((a, b) => {
    const aTime = new Date(a.lastUpdated || 0).getTime()
    const bTime = new Date(b.lastUpdated || 0).getTime()
    return bTime - aTime
  })

  const openChat = async (chatId) => {
    await chat.handleOpenChat(chatId, chats)
    navigate('/')
  }

  return (
    <div className='flex h-full min-h-0 flex-col gap-4'>
      <div className='rounded-3xl border border-white/10 bg-[#070d1b]/75 p-4 backdrop-blur-md md:p-6'>
        <h2 className='text-xl font-semibold text-white'>Chat History</h2>
        <p className='mt-1 text-sm text-white/55'>Select a conversation to continue.</p>

        <div className='mt-4 max-h-[60vh] overflow-y-auto pr-2'>
          {chatList.length === 0 ? (
            <div className='py-10 text-center text-white/60'>No chats yet.</div>
          ) : (
            <div className='space-y-2'>
              {chatList.map((c) => {
                const active = c.id === currentChatId
                return (
                  <button
                    key={c.id}
                    type='button'
                    onClick={() => { openChat(c.id) }}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      active
                        ? 'border-sky-300/40 bg-sky-500/10'
                        : 'border-white/10 bg-white/5 hover:bg-white/8'
                    }`}
                  >
                    <div className='flex items-center justify-between gap-3'>
                      <div className='truncate text-sm font-medium text-white/90'>{c.title}</div>
                      {c.messages?.length ? (
                        <div className='text-xs text-white/45'>{c.messages.length} msgs</div>
                      ) : (
                        <div className='text-xs text-white/35'>new</div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default History

