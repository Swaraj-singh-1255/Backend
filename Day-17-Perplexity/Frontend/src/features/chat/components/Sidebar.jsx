import React, { useMemo } from 'react'
import { NavLink } from 'react-router'

function startOfDay(d) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function formatBucketLabel(diffDays) {
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays >= 2 && diffDays <= 7) return 'Last 7 days'
  return 'Earlier'
}

function computeDiffDays(date) {
  const nowStart = startOfDay(new Date())
  const thatStart = startOfDay(date)
  const msPerDay = 24 * 60 * 60 * 1000
  return Math.floor((nowStart - thatStart) / msPerDay)
}

const Icon = ({ children, className = '' }) => (
  <span className={`inline-flex items-center justify-center ${className}`}>{children}</span>
)

const Sidebar = ({ chats, onOpenChat, className = '', onRequestClose, historyMode = 'recent' }) => {
  const chatList = useMemo(() => Object.values(chats || {}), [ chats ])

  const sortedChats = useMemo(() => {
    return [ ...chatList ].sort((a, b) => {
      const aTime = new Date(a.lastUpdated || 0).getTime()
      const bTime = new Date(b.lastUpdated || 0).getTime()
      return bTime - aTime
    })
  }, [ chatList ])

  const visibleChats = useMemo(() => {
    if (historyMode === 'all') return sortedChats
    // Recent mode: keep it compact while still grouped by date.
    return sortedChats.slice(0, 8)
  }, [ sortedChats, historyMode ])

  const grouped = useMemo(() => {
    const buckets = {
      Today: [],
      Yesterday: [],
      'Last 7 days': [],
      Earlier: []
    }

    for (const c of visibleChats) {
      const rawDate = c.lastUpdated ? new Date(c.lastUpdated) : new Date(0)
      const diffDays = computeDiffDays(rawDate)
      const label = formatBucketLabel(diffDays)
      buckets[ label ].push(c)
    }

    return buckets
  }, [ visibleChats ])

  const showHistoryLabels = historyMode === 'all'

  const navItems = useMemo(
    () => [
      { label: 'Home', to: '/' },
      { label: 'Templates', to: '/templates' },
      { label: 'Explore', to: '/explore' },
      { label: 'History', to: '/history' },
      { label: 'Wallet', to: '/wallet' }
    ],
    []
  )

  const renderNavIcon = (label) => {
    const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
    switch (label) {
      case 'Home':
        return (
          <svg className='h-5 w-5' viewBox='0 0 24 24' aria-hidden='true'>
            <path {...common} d='M3 10.5 12 3l9 7.5' />
            <path {...common} d='M5 9.9V21h14V9.9' />
          </svg>
        )
      case 'Templates':
        return (
          <svg className='h-5 w-5' viewBox='0 0 24 24' aria-hidden='true'>
            <rect {...common} x='4' y='4' width='16' height='16' rx='3' />
            <path {...common} d='M8 8h8M8 12h8M8 16h6' />
          </svg>
        )
      case 'Explore':
        return (
          <svg className='h-5 w-5' viewBox='0 0 24 24' aria-hidden='true'>
            <circle {...common} cx='12' cy='12' r='9' />
            <path {...common} d='M14.8 9.2 13 14l-4.8 1.8L10 11l4.8-1.8Z' />
          </svg>
        )
      case 'History':
        return (
          <svg className='h-5 w-5' viewBox='0 0 24 24' aria-hidden='true'>
            <path {...common} d='M3 12a9 9 0 1 0 3-6.7' />
            <path {...common} d='M3 4v4h4' />
            <path {...common} d='M12 7v6l4 2' />
          </svg>
        )
      case 'Wallet':
        return (
          <svg className='h-5 w-5' viewBox='0 0 24 24' aria-hidden='true'>
            <rect {...common} x='3' y='6' width='18' height='14' rx='3' />
            <path {...common} d='M16 12h5' />
            <path {...common} d='M16 12a2 2 0 1 0-0.1 0Z' />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <aside
      className={`${className} h-full min-h-0 overflow-hidden transition-all duration-300 ease-out`}
    >
      <div className='shrink-0'>
        <div className='mb-6 flex items-center gap-2 px-1'>
          <div className='grid size-8 place-items-center rounded-lg bg-gradient-to-br from-sky-400 to-violet-500 text-sm font-black text-white'>
            A
          </div>
          <h1 className='hidden lg:block text-2xl font-semibold tracking-tight text-white'>Axora</h1>
          <h1 className='md:hidden text-2xl font-semibold tracking-tight text-white'>Axora</h1>
        </div>

        <div className='mb-5 rounded-2xl border border-white/10 bg-white/5 px-3 py-2'>
          <div className='flex items-center gap-2'>
            <svg className='h-4 w-4 text-white/60' viewBox='0 0 24 24' aria-hidden='true'>
              <circle fill='none' stroke='currentColor' strokeWidth='2' cx='11' cy='11' r='7' />
              <path fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' d='M21 21l-4.3-4.3' />
            </svg>
            <input
              type='text'
              placeholder='Search chats'
              className='w-full bg-transparent text-sm text-white/85 outline-none placeholder:text-white/35 md:hidden'
            />
            <input
              type='text'
              placeholder='Search chats'
              className='hidden w-full bg-transparent text-sm text-white/85 outline-none placeholder:text-white/35 lg:block'
            />
          </div>
        </div>

        <nav className='mb-6 space-y-1 text-sm'>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => onRequestClose?.()}
              className={({ isActive }) => {
                const active = isActive
                return [
                  'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-all duration-200 ease-out',
                  active
                    ? 'border border-sky-200/30 bg-white/10 text-white shadow-[0_0_0_1px_rgba(125,211,252,0.08)]'
                    : 'border border-transparent text-white/70 hover:bg-white/8 hover:text-white'
                ].join(' ')
              }}
            >
              {renderNavIcon(item.label)}

              <span className='md:hidden text-sm font-medium text-white/85'>{item.label}</span>
              <span className='hidden lg:inline text-sm font-medium text-white/85'>{item.label}</span>

              {/* Tooltip for md/tablet when labels are hidden */}
              <span className='pointer-events-none absolute left-full top-1/2 ml-3 hidden w-max -translate-y-1/2 rounded-md bg-[#0b1325]/95 px-2 py-1 text-xs text-white/90 opacity-0 shadow-lg ring-1 ring-white/10 transition-opacity duration-150 md:block lg:hidden group-hover:opacity-100'>
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className='min-h-0 flex-1 overflow-y-auto pb-2'>
        <div className='space-y-5'>
          {[
            { label: 'Today', chats: grouped['Today'] },
            { label: 'Yesterday', chats: grouped['Yesterday'] },
            { label: 'Last 7 days', chats: grouped['Last 7 days'] },
            { label: 'Earlier', chats: grouped.Earlier }
          ].map((bucket) => (
            bucket.chats.length > 0 ? (
              <div key={bucket.label}>
                <h3
                  className={`mb-2 px-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/35 ${
                    showHistoryLabels ? '' : 'md:hidden lg:block'
                  }`}
                >
                  {bucket.label}
                </h3>
                <div className='space-y-1'>
                  {bucket.chats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => { onOpenChat(chat.id); onRequestClose?.() }}
                      type='button'
                      className='w-full truncate rounded-xl border border-transparent bg-transparent px-3 py-2 text-left text-sm text-white/80 transition-all duration-150 hover:border-white/10 hover:bg-white/6 hover:text-white'
                      title={chat.title}
                    >
                      <div className='flex items-center gap-2'>
                        <span
                          className={`truncate ${
                            showHistoryLabels ? '' : 'md:hidden lg:block'
                          }`}
                        >
                          {chat.title}
                        </span>

                        {!showHistoryLabels && (
                          <span
                            className='hidden size-2 rounded-full bg-white/35 md:inline-block lg:hidden'
                            aria-hidden='true'
                          />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : null
          ))}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
