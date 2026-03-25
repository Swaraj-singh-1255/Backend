import React from 'react'

const Wallet = () => {
  const plans = [
    { title: 'Free', price: '$0', text: 'Basic chat and limited features.' },
    { title: 'Pro', price: '$19', text: 'Faster responses and advanced tools.' },
    { title: 'Team', price: '$49', text: 'Collaboration and shared workspaces.' }
  ]

  return (
    <div className='flex h-full min-h-0 flex-col gap-4'>
      <div className='rounded-3xl border border-white/10 bg-[#070d1b]/75 p-4 backdrop-blur-md md:p-6'>
        <h2 className='text-xl font-semibold text-white'>Wallet & Billing</h2>
        <p className='mt-1 text-sm text-white/55'>Manage your plan and payment settings.</p>

        <div className='mt-5 grid grid-cols-1 gap-3 md:grid-cols-3'>
          {plans.map((p) => (
            <article key={p.title} className='rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/8'>
              <h3 className='text-base font-semibold text-white'>{p.title}</h3>
              <div className='mt-2 text-2xl font-black text-white'>{p.price}</div>
              <p className='mt-1 text-sm text-white/55'>{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wallet

