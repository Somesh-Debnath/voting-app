import Link from "next/link"
import { useRouter } from "next/router"

const NavBar=()=>{
    const router=useRouter()
    return(
        <div className="flex mt-8">
           <h1 className="ml-28 pr-80 font-medium text-lg font-extrabold text-fuchsia-700">
                E-VOTING APP
            </h1>
            <ul className="flex ml-10 space-x-11">
                <li className="Navlink" onClick={()=>router.push('/')}>Home</li>
                <li className="Navlink" onClick={()=>router.push('/about')}>About</li>
                <li className="Navlink" onClick={()=>router.push('/contact')}>Contact</li>
                <li className="Navlink" onClick={()=>router.push('/FAQ')}>FAQS</li>
            </ul>

            <div className="flex ml-20 space-x-11 mt-[-9px]">
                    <button className='bg-white rounded-full px-6 py-[10px]
                    border-[1px] border-[#93278F] text-[#93278F] font-semibold'
                    onClick={()=>router.push('/login')}
                    >Sign In</button>

                <button className='bg-[#93278F] ml-12 px-12 py-[10px] rounded-full text-white font-semibold'
                    onClick={()=>router.push('/login')}
                    >Register as a Voter</button>
            </div>
        </div>
    )
}
        

export default NavBar