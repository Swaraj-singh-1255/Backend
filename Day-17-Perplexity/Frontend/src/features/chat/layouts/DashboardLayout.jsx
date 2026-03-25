import React, { useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import Sidebar from '../components/Sidebar'

const DashboardLayout = () => {
  const chat = useChat()
  const navigate = useNavigate()
  const location = useLocation()

  const chats = useSelector((state) => state.chat.chats)

  const [ isSidebarOpen, setIsSidebarOpen ] = useState(false)

  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleGetChats()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const pageTitle = useMemo(() => {
    switch (location.pathname) {
      case '/':
        return 'Home'
      case '/history':
        return 'History'
      case '/templates':
        return 'Templates'
      case '/explore':
        return 'Explore'
      case '/wallet':
        return 'Wallet'
      default:
        return 'Home'
    }
  }, [ location.pathname ])

  const openChatFromSidebar = (chatId) => {
    chat.handleOpenChat(chatId, chats)
    setIsSidebarOpen(false)
    const target = location.pathname === '/history' ? '/history' : '/'
    navigate(target)
  }

  const sidebarHistoryMode = location.pathname === '/history' ? 'all' : 'recent'

  return (
    <main className='min-h-screen w-full bg-[#050811] bg-[radial-gradient(circle_at_50%_20%,rgba(50,85,190,0.2),transparent_42%)] p-3 text-white md:p-5'>
      <section className='relative mx-auto flex h-[calc(100vh-1.5rem)] w-full gap-4 rounded-3xl md:h-[calc(100vh-2.5rem)] md:gap-5'>
        <div
          className={`fixed inset-0 z-20 bg-black/45 transition-opacity duration-300 md:hidden ${isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          onClick={() => setIsSidebarOpen(false)}
        />

        <Sidebar
          chats={chats}
          onOpenChat={openChatFromSidebar}
          onRequestClose={() => setIsSidebarOpen(false)}
          historyMode={sidebarHistoryMode}
          className={`fixed left-0 top-0 z-30 flex h-full w-[85vw] max-w-[220px] shrink-0 flex-col border-r border-white/10 bg-[#090f1d]/95 p-4 backdrop-blur-xl transition-transform duration-300 ease-out md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        />

        <Sidebar
          chats={chats}
          onOpenChat={openChatFromSidebar}
          historyMode={sidebarHistoryMode}
          className={`hidden h-full w-[88px] shrink-0 rounded-3xl border border-white/10 bg-[#090f1d]/80 p-3 backdrop-blur-xl transition-all duration-300 ease-out md:flex md:flex-col ${
            sidebarHistoryMode === 'all' ? 'md:w-[220px] lg:w-[220px]' : 'lg:w-[220px]'
          } lg:p-4`}
        />

        <section className='relative mx-auto flex h-full min-w-0 flex-1 flex-col gap-4'>
          <header className='flex items-center justify-between rounded-2xl border border-white/10 bg-[#0b1325]/70 px-3 py-2 backdrop-blur-md md:px-4 md:hidden'>
            <button
              type='button'
              aria-label='Toggle chat history'
              className={`icon nav-icon-2 ${isSidebarOpen ? 'open' : ''}`}
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className='rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80'>
              {pageTitle}
            </div>

            <div className='flex items-center gap-2 text-xs text-emerald-300/90'>
              <span className='inline-block size-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]' />
              Live
            </div>
          </header>

          <div className='flex-1 min-h-0'>
            <Outlet />
          </div>
        </section>
      </section>
    </main>
  )
}

export default DashboardLayout

