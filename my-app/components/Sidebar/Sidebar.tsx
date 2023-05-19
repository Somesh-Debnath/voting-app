import router, { useRouter } from 'next/router'
import React from 'react'
import useAuth from '../../hooks/useAuth'

function Sidebar() {
    const {logout}=useAuth()
    const router=useRouter()
  return (
    <div className="max-w-[200px] flex flex-col items-center h-screen
    shadow-xl pr-12 pb-7 fixed">
        <div className="mt-6 ml-5 font-medium text-lg font-extrabold text-fuchsia-700">
            <button onClick={()=>router.push('/')}>E-VOTING APP</button>
        </div>
        <div className=" pl-[1.5rem] mt-32 text-sm">
            <ul>
                <li className="sidebar__menu--item">
                <button
                   onClick={()=>router.push("/dashboard")}>Dashboard</button>
                </li>
                <li className="sidebar__menu--item">
                <button
                   onClick={()=>router.push("/ElectionStats")}>Election Stats</button>
                </li>
                
                <button className='mt-48 font-medium' onClick={logout} >Logout</button>
            </ul>
          </div>
    </div>
  )
}

export default Sidebar