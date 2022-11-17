import { useEffect, useRef, useState } from "react";
import InputCard from '../components/Card/InputCard'
import MuiModal from "@mui/material/Modal"
import { useRouter } from "next/router";
import { AnyARecord } from "dns";
import FormCard from "../components/Card/FormCard";
function create_vote() {
    const [showModal, setShowModal] = useState(false)
    
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [formData,setFormData] = useState([])
    const router=useRouter()

    function handleChange(event:any) {
        setFormData((prevFormData:any) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }
    const handleSubmit = (e:any) => {
        e.preventDefault()
        console.log( typeof formData)
        localStorage.setItem("formData", JSON.stringify(formData))
        
    }

    const handleModalSubmit = (e:any) => {
        e.preventDefault()
        console.log(formData)
        setShowModal(false)
    }
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

        
      <div className='flex-1 font-bold h-screen fixed ml-[183px] flex flex-col'>

            <div className='flex flex-col'>
                <div className='px-8 py-4 shadow-lg max-h-[80px] w-screen flex 
                            border-b-2 '>
                    <h1 className='px-4 font-semibold text-2xl font-sans'>Create Election</h1>
                    <div className='flex top-5 z-50 right-8 fixed space-x-4'>
                        <h3>avatar</h3>
                        <h3>name</h3>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className='w-[800px] p-8'>
                <div className=' flex flex-col '>
                    <h2 className='font-bold mb-2'>TITLE OF THE VOTE</h2>
                    <input className='bg-white rounded-lg p-2
                    border-[1px] border-[#93278F] 
                    w-full outline-none' type='text' 
                    name="title"
                    onChange={handleChange}  placeholder='TITLE' />
                    <input className='bg-white rounded-lg p-4  my-3
                    border-[1px] border-[#93278F] 
                    w-full outline-none' type='text'
                    name="description"
                    onChange={handleChange} placeholder='DESCRIPTION' />
                    <h2 className='font-bold mb-2'>Name of the Organization</h2>
                    <input className='bg-white rounded-lg p-2
                    border-[1px] border-[#93278F] 
                    w-full outline-none' type='text'
                    name="org"
                    onChange={handleChange} />
                </div>
                <div className='flex my-10 '>
                    <button className='
                        rounded-xl px-8 py-3 mr-1 text-[#93278F] 
                        font-semibold border-[1px] border-[#93278F]'
                        onClick={()=>setShowModal(true)
                        // router.push('/FormCard')
                        }>Add Candidate</button>
                        <button className='
                        rounded-xl px-8 py-3 mx-2 text-[#93278F] 
                        font-semibold border-[1px] border-[#93278F]'>Determine Who can Vote</button>
                    <button className='
                        rounded-xl px-8 py-3 text-[#93278F] 
                        font-semibold border-[1px] border-[#93278F]'>Voting Duration</button>
                </div>

            <button className='bg-[#93278F]
                    rounded-xl px-9 py-3 text-white font-semibold'
                   onClick={()=>router.push('/adminDashboard')}>Create Vote</button>
            </form>


            <MuiModal open={showModal} onClose={()=>setShowModal(false)}>
               <div className="bg-white rounded-lg w-[500px] flex items-center p-8">
               <FormCard/>
                </div>
        </MuiModal>
      </div>
    </div>
  )
}

export default create_vote