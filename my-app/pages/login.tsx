import React from 'react'
import Image from 'next/image'
function login() {
  return (
    <div className='flex'>
       <div className='max-w-xl items-center pt-28 pl-16 pr-12 h-screen'>
           <img  className='object-cover' src="/userlogin.png" alt="userlogin" />
        </div>
      <div className='flex flex-col pt-16 pl-24  max-w-lg'>
        <h1 className='text-4xl font-bold mb-7'>Welcome !</h1>
        <p className='text-sm font-normal leading-4'>Register as a voter on the decentralized 
        voting platform to vote your prefered candidate</p>

        <div>
            <form>
                <div className='flex flex-col mt-8'>
                    <input className='bg-white rounded-full p-5 text-gray-500 my-3
                    border-[1px] border-[#93278F] 
                    w-full outline-none' type='email' name='email' id='email' placeholder='Enter your email' />
                    <input className='bg-white rounded-full p-5 text-gray-500 my-3
                    border-[1px] border-[#93278F] 
                    w-full outline-none' type='password' name='password' id='password' placeholder='Enter your password' />
                    
                    <p className='text-sm my-6'>By clicking the sign up button, you agree with our 
                        Terms and Condtions</p>
                    <button className='bg-[#93278F]
                    rounded-full px-1 py-4 text-white font-semibold'>Sign Up</button>
                </div>
            </form>
            <div className='flex flex-col mt-5'>
            <span className='text-sm mb-4 text-center
            '>Sign in as Admin</span>
            <span className='text-sm mb-4 text-center'>Already have an account, Log In</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default login