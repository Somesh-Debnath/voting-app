import React from 'react'

function Card() {
  return (
    <div className='flex flex-col shadow-lg max-h-[420px]'>
       <div className='flex mt-5 mx-[11px]'>

          <div className="w-[10px] h-[10px] ml-3 mt-[6.7px] bg-[#93278F] rounded-full"></div>
          <span className="font-semibold px-2">President for Student Council</span>
      </div>

              <div className='flex justify-around mt-4'>
            <div className='flex flex-col items-center '>
              <div className='h-[58px] w-[58px] rounded-full'>
                  <img className="object-contain" 
                  src='/w-removebg-preview.png' alt='w' />
              </div>
              <h3>Debanshiii Das</h3>
              <h2 className='font-bold text-md mb-2'>Software Developer</h2>

              <div className='flex mx-1 mb-4'>
                  <button className='bg-[#93278F] text-white px-8 py-2
                  text-sm rounded-2xl'>Vote</button>
                  <button className='bg-white border-[1px] border-[#93278F] ml-2
                  text-sm rounded-2xl text-[#93278F] px-4 py-2'>View Profile</button>
              </div>
            </div>

            <div className='flex flex-col items-center '>
              <div className='h-[58px] w-[58px] rounded-full'>
                  <img className="object-contain" 
                  src='/w-removebg-preview.png' alt='w' />
              </div>
              <h3>Debanshiii Das</h3>
              <h2 className='font-bold text-md mb-2'>Software Developer</h2>

              <div className='flex mx-1 mb-2'>
                  <button className='bg-[#93278F] text-white px-8 py-2
                  text-sm rounded-2xl'>Vote</button>
                  <button className='bg-white border-[1px] border-[#93278F] ml-2
                  text-sm rounded-2xl text-[#93278F] px-4 py-2'>View Profile</button>
              </div>
            </div>

            <div className='flex flex-col items-center '>
              <div className='h-[58px] w-[58px] rounded-full'>
                  <img className="object-contain" 
                  src='/w-removebg-preview.png' alt='w' />
              </div>
              <h3>Debanshiii Das</h3>
              <h2 className='font-bold text-md mb-2'>Software Developer</h2>

              <div className='flex mx-1 mb-2'>
                  <button className='bg-[#93278F] text-white px-8 py-2
                  text-sm rounded-2xl'>Vote</button>
                  <button className='bg-white border-[1px] border-[#93278F] ml-2
                  text-sm rounded-2xl text-[#93278F] px-4 py-2'>View Profile</button>
              </div>
            </div>
            <div className='flex flex-col items-center '>
              <div className='h-[58px] w-[58px] rounded-full'>
                  <img className="object-contain" 
                  src='/w-removebg-preview.png' alt='w' />
              </div>
              <h3>Debanshiii Das</h3>
              <h2 className='font-bold text-md mb-2'>Software Developer</h2>

              <div className='flex mx-1 mb-2'>
                  <button className='bg-[#93278F] text-white px-8 py-2
                  text-sm rounded-2xl'>Vote</button>
                  <button className='bg-white border-[1px] border-[#93278F] ml-2
                  text-sm rounded-2xl text-[#93278F] px-4 py-2'>View Profile</button>
              </div>
            </div>
              </div>
    </div>
  )
}

export default Card