import Link from "next/link"
import { useRouter } from "next/router"

const NavBar=()=>{
    const Router=useRouter()
    return(
        <div className="">
            <ul>
                <li className="Navlink" onClick={()=>Router.push('/')}>Home</li>
                <li className="Navlink" onClick={()=>Router.push('/about')}>About</li>
                <li className="Navlink" onClick={()=>Router.push('/contact')}>Contact</li>
                <li className="Navlink" onClick={()=>Router.push('/FAQ')}>FAQS</li>
            </ul>
        </div>
    )
}
        

export default NavBar