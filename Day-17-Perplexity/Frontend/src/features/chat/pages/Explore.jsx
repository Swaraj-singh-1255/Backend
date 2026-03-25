import React from 'react'

const Explore = () => {
  const items = [
    { title: 'Productivity', text: 'Work smarter with guided prompts.' },
    { title: 'Learning', text: 'Explain concepts in a step-by-step way.' },
    { title: 'Coding', text: 'Debug, refactor, and design APIs.' }
  ]

  return (
    <div className='flex h-full min-h-0 flex-col gap-4'>
      <div className='rounded-3xl border border-white/10 bg-[#070d1b]/75 p-4 backdrop-blur-md md:p-6'>
        <h2 className='text-xl font-semibold text-white'>Explore</h2>
        <p className='mt-1 text-sm text-white/55'>Discover what you can build and learn today.</p>

        <div className='mt-5 grid grid-cols-1 gap-3 md:grid-cols-3'>
          {items.map((t) => (
            <article key={t.title} className='rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/8'>
              <h3 className='text-base font-semibold text-white'>{t.title}</h3>
              <p className='mt-1 text-sm text-white/55'>{t.text}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Explore

