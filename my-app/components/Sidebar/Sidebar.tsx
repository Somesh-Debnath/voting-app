import router, { useRouter } from 'next/router'
import React from 'react'
import useAuth from '../../hooks/useAuth'

function Sidebar() {
    const {logout}=useAuth()
    const router=useRouter()
  return (
    <div className="max-w-[180px] flex flex-col items-center h-screen
    shadow-xl pr-12 pb-7 fixed">
        <div className="mt-4">
            <button onClick={()=>router.push('/')}>Logo</button>
        </div>
        <div className=" pl-[3.5rem] mt-10">
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
                <li className="sidebar__menu--item">
                    <a href="#">Election Stats</a>
                </li>
                <li className="sidebar__menu--item">
                   <button className='font-medium flex-1'
                   onClick={()=>router.push("/CreateElection")}>Create Election</button>
                </li>
                
            </ul>
          </div>
          <button className='mt-32 font-medium' onClick={logout} >Logout</button>
    </div>
  )
}

export default Sidebar