import React from 'react'
import InputCard from '../components/Card/InputCard'

function create_vote() {
  return (
    <div className='flex w-screen m-0 relative md:flex h-screen overflow-hidden'>
        <div className=" w-auto flex flex-col items-center h-screen
        shadow-xl pr-12 pb-7">
            <div className="mt-4">
                <h1>Logo</h1>
            </div>
            <div className=" pl-[3.5rem] mt-24">
                <ul>
                    <li className="sidebar__menu--item">
                        <a href="#">Dashboard</a>
                    </li>
                    <li className="sidebar__menu--item">
                        <a href="#">Voters</a>
                    </li>
                    <li className="sidebar__menu--item">
                        <a href="#">Candidates</a>
                    </li>  
                </ul>
              </div>
              <button className='mt-48 font-medium bottom-0'>Logout</button>
        </div>

        
      <div className='flex-1 font-bold h-screen overflow-y-auto flex flex-col'>

            <div className='flex flex-col'>
                <div className='px-8 py-4 shadow-lg max-h-[80px] w-screen flex 
                            border-b-2 '>
                    <h1 className='px-4 font-semibold text-2xl font-sans'>Create Election</h1>
                    <div className='flex space-x-4'>
                        <h3>avatar</h3>
                        <h3>name</h3>
                    </div>
                </div>
            </div>

            <form className='w-[800px] p-8'>
                <div className='min-w-3/4 flex flex-col '>
                    <h2 className='font-bold'>TITLE OF THE VOTE</h2>
                    <input className='bg-white rounded-full p-2
                    border-[1px] border-[#93278F] 
                    w-full outline-none' type='text' />
                    <input className='bg-white rounded-full p-4 text-gray-200 my-3
                    border-[1px] border-[#93278F] 
                    w-full outline-none' type='text' placeholder='DESCRIPTION' />
                    <h2 className='font-bold'>Name of the Organization</h2>
                    <input className='bg-white rounded-full p-2
                    border-[1px] border-[#93278F] 
                    w-full outline-none' type='text' />
                </div>
                <div className='flex justify-around m-10 border-x-18'>
                    <button className='
                        rounded-xl px-9 py-3 text-[#93278F] min-w-[250px]
                        font-semibold border-[1px] border-[#93278F]'>Determine who can vote</button>
                    <button className='
                        rounded-xl px-9 py-3 text-[#93278F] min-w-[250px]
                        font-semibold border-[1px] border-[#93278F]'>Voting Duration</button>
                </div>

                <h1 className='font-bold'>CANDIDATES</h1>
                <InputCard/>
                <h1 className='font-bold text-[#93278F] '>Add more candidates</h1>
                <br></br>
                <button className='bg-[#93278F]
                    rounded-xl px-9 py-3 text-white font-semibold'>Create Vote</button>
            </form>
      </div>
    </div>
  )
}

export default create_vote