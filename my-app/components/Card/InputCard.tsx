import React from 'react'

function InputCard() {
  return (
    <div className='flex items-center p-1.5' >
      <h1 className='font-bold p-3'>1</h1>
      <input className='bg-white rounded-full p-2.5
                    border-[1px] border-[#93278F] 
                    w-full ' type='text' text-p-4 placeholder='Name of the candidate' />
    </div>
  )
}

export default InputCard