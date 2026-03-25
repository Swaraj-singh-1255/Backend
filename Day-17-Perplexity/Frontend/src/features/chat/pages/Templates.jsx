import React from 'react'

const Templates = () => {
  const templates = [
    { title: 'Summarize', text: 'Turn long content into crisp bullet points.' },
    { title: 'Rewrite', text: 'Improve clarity, tone, and structure.' },
    { title: 'Brainstorm', text: 'Generate ideas tailored to your goal.' }
  ]

  return (
    <div className='flex h-full min-h-0 flex-col gap-4'>
      <div className='rounded-3xl border border-white/10 bg-[#070d1b]/75 p-4 backdrop-blur-md md:p-6'>
        <h2 className='text-xl font-semibold text-white'>Templates</h2>
        <p className='mt-1 text-sm text-white/55'>Choose a template to start faster.</p>

        <div className='mt-5 grid grid-cols-1 gap-3 md:grid-cols-3'>
          {templates.map((t) => (
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

export default Templates

