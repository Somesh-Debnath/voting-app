import { useEffect, useRef, useState } from "react";
import MuiModal from "@mui/material/Modal"
import { useRouter } from "next/router";
import { AnyARecord } from "dns";
import InputCard from "../components/Card/InputCard";


function CreateElection() {
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [showModal3, setShowModal3] = useState(false)
    const [inputListSize, setInputListSize] = useState(10)
    const inputList: any[] = []
    const arr: any[] = []
    
    for(let i = 0; i < inputListSize; i++) {
    inputList.push(<InputCard handleChange={handleChange}/>)
    }    
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
       arr.push(formData)
       console.log(arr)
        localStorage.setItem("formData", JSON.stringify(formData))
        
    }
   // console.log(inputList)

    const handleModalSubmit = (e:any) => {
        e.preventDefault()
        setShowModal(false)
        setShowModal2(false)
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
                        onClick={(e:any)=>{setShowModal(true); e.preventDefault()}}>
                          Add Candidate</button>
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
                <form onSubmit={handleModalSubmit} >
                <div className='flex justify-center text-center items-center h-screen'>
                    <div className='bg-white rounded-lg w-[400px] p-8'>
                    <svg className="absolute top-[8rem] w-6 h-6 right-[27rem] mt-4 mr-4 cursor-pointer"
                    onClick={()=>setShowModal(false)}
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 
                        0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3
                         265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
                        <h1 className='font-bold -center text-2xl'>Add Candidates</h1>
                
                        <div className='flex justify-between mt-5'>
                           <button className='bg-[#93278F] px-3 py-1 rounded-lg text-white'
                           onClick={(e:any)=>{setShowModal2(true);
                         e.preventDefault()}}>Enter Manualy</button>
                            <button className='bg-[#93278F] px-3 py-1 rounded-lg text-white'>Upload CSV</button>      
                        </div>                  
                    </div>
                </div>
             </form>
        </MuiModal>

        <MuiModal open={showModal2 } onClose={()=>setShowModal2(false)}>
            <form onSubmit={handleModalSubmit} >
                <div className='flex justify-center text-center items-center h-screen'>
                    <div className='bg-white rounded-lg w-[500px] p-8'>
                    <svg className="absolute top-[2rem] w-6 h-6 right-[27rem] mt-4 mr-4 cursor-pointer"
                    onClick={()=>setShowModal2(false)}
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3
                            0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3
                            265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
                   <div className="flex flex-col">
                    <h1 className="font-semibold text-xl mb-2">Add Candidates</h1>  {inputList}</div>       
                     
                    <button className='bg-[#93278F]
                            rounded-xl px-9 py-3 text-white font-semibold mt-4'
                            >Add Candidate</button>

                     </div>
                        </div>
             </form>
                        </MuiModal>




      </div>
    </div>
  )
}

export default CreateElection;