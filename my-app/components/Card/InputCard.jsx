import React from 'react'

function InputCard({handleChange}) {
  return (
    <div className='flex justify-between '>
      
                            <input className='bg-white rounded-lg py-2 px-5
                            border-[1px] border-[#93278F] my-1
                            w-[150px] outline-none' type='text'
                            name="name"
                            onChange={handleChange} placeholder='NAME' />
                            <input className='bg-white rounded-lg py-2 px-5
                            border-[1px] my-1 border-[#93278F]
                            w-[150px] outline-none' type='text'
                            name="email"
                            onChange={handleChange} placeholder='EMAIL' />

     </div>
  )
}

export default InputCard