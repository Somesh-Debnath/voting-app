import router, { useRouter } from 'next/router'
import React from 'react'
import useAuth from '../../hooks/useAuth'

function AdminSidebar() {
    const {logout}=useAuth()
    const router=useRouter()
  return (
    <div className="max-w-[200px] flex flex-col items-center h-screen
    shadow-xl pr-12 pb-7 fixed">
        <div className="mt-4">
            <button onClick={()=>router.push('/')}>Logo</button>
        </div>
        <div className=" pl-[2.5rem] mt-32 text-sm">
            <ul>
                <li className="sidebar__menu--item">
                <button
                   onClick={()=>router.push("/adminDashboard")}>Dashboard</button>
                </li>
                <li className="sidebar__menu--item">
                <button
                   onClick={()=>router.push("/ElectionStats")}>Election Stats</button>
                </li>
                <li className="sidebar__menu--item">
                   <button
                   onClick={()=>router.push("/CreateElection")}>Create Election</button>
                </li>
                
                <button className='mt-48 font-medium' onClick={logout} >Logout</button>
            </ul>
          </div>
    </div>
  )
}

export default AdminSidebar