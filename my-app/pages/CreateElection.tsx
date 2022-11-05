import React from 'react'
import useAuth from '../hooks/useAuth'

function CreateElection() {
    const {logout}=useAuth()
  return (
    
        <div className='flex w-screen m-0  h-screen'>
           
           <div className="max-w-[180px] flex flex-col items-center h-screen
           shadow-xl pr-12 pb-7 border-r-[1px] border-gray-400 ">
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
                 <button className='mt-48 font-medium' onClick={logout} >Logout</button>
           </div>

           <div className='flex flex-col w-screen'>
          <div className='px-8 py-4 shadow-lg max-h-[80px] w-full flex 
          border-b-2 border-gray-400 '>
           <h1 className='px-4 font-semibold text-2xl font-sans'>Create Election</h1>
            </div>

            <div>
                
            </div>
          </div>

    </div>
    
  )
}

export default CreateElection