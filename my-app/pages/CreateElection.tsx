import { useEffect, useRef, useState, useContext } from "react";
import InputCard from '../components/Card/InputCard'
import MuiModal from "@mui/material/Modal"
import { useRouter } from "next/router";
import { AnyARecord } from "dns";
import { TextField } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AppContext } from "./_app";

function CreateElection() {

    const context = useContext(AppContext)

    const [showModalOne, setShowModalOne] = useState(false)
    const [showModalTwo, setShowModalTwo] = useState(false)
    
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [formData,setFormData] = useState([{title:"", description:"", org:""}])
    const [dateValue, setDateValue] = useState<any>(
        dayjs('2022-08-18T09:11:54'),
    )
    const router=useRouter()
    

    function handleChange(event:any) {
        setFormData((prevFormData:any) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleDateChange = (newValue: any) => {
        setDateValue(newValue);
        setFormData((prevFormData:any) => {
            return {
                ...prevFormData,
                dateValue: dateValue
            }
        })
        
        // if(context) {
        //     context.setFormContext(JSON.stringify(formData))
        // }
        // console.log(context)
    };

    const handleSubmit = (e:any) => {
        e.preventDefault()
        // localStorage.setItem("formData", JSON.stringify(formData))
        if(context) {
            context.setFormContext(JSON.stringify(formData))
            context.formContext = JSON.stringify(formData)
            console.log(context.formContext)
        }
    }

    const handleModalOneSubmit = (e:any) => {
        e.preventDefault()
        console.log(formData)
        console.log("from add candi")
        setShowModalOne(false)
        // console.log(context?.formContext)
    }
    const handleModalTwoSubmit = (e:any) => {
        e.preventDefault()
        console.log(dateValue.toString())
        console.log(formData)
        console.log("from voting dur")
        setShowModalTwo(false)
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
                        onClick={()=>setShowModalOne(true)
                        }>Add Candidate</button>
                        <button className='
                        rounded-xl px-8 py-3 mx-2 text-[#93278F] 
                        font-semibold border-[1px] border-[#93278F]'>Determine Who can Vote</button>
                    <button className='
                        rounded-xl px-8 py-3 text-[#93278F] 
                        font-semibold border-[1px] border-[#93278F]'
                        onClick={()=>setShowModalTwo(true)}>Voting Duration</button>
                </div>

            <button className='bg-[#93278F]
                    rounded-xl px-9 py-3 text-white font-semibold'
                   onClick={()=>router.push('/adminDashboard')}>Create Vote</button>
            </form>


            <MuiModal 
            open={showModalOne} 
            onClose={()=>setShowModalOne(false)}>
                <form onSubmit={handleModalOneSubmit} >
                <div className='flex justify-center items-center h-screen'>
                    <div className='bg-white rounded-lg w-[500px] p-8'>
                    <svg className="absolute top-[8rem] w-6 h-6 right-[27rem] mt-4 mr-4 cursor-pointer"
                    onClick={()=>setShowModalOne(false)}
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 
                        0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3
                         265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
                        <h1 className='font-bold text-2xl'>Add Candidates</h1>
                        <div className='flex flex-col'>
                            <h2 className='font-bold mb-2'>Name</h2>
                            <input className='bg-white rounded-lg p-2
                            border-[1px] border-[#93278F]
                            w-full outline-none' onChange={handleChange} type='text' name='name'  />
                             
                             
                            <h2 className='font-bold mb-2'>Email</h2>
                            <input className='bg-white rounded-lg p-2
                            border-[1px] border-[#93278F]
                            w-full outline-none' 
                            onChange={handleChange} name='email' type='email' />
                            <h2 className='font-bold mb-2'>Role</h2>
                            <input className='bg-white rounded-lg p-2
                            border-[1px] border-[#93278F]
                            w-full outline-none' type='text'
                            onChange={handleChange} name="role"/>

                            <button className='bg-[#93278F]
                            rounded-xl px-9 py-3 text-white font-semibold mt-4'
                            >Add Candidate</button>
                            </div>
                    </div>
                </div>
            </form>
        </MuiModal>

        <MuiModal 
            open={showModalTwo} 
            onClose={()=>setShowModalTwo(false)}>
                <form onSubmit={handleModalTwoSubmit} >
                <div className='flex justify-center items-center h-screen'>
                    <div className='bg-white rounded-lg w-[500px] p-8'>
                    <svg className="absolute top-[8rem] w-6 h-6 right-[27rem] mt-4 mr-4 cursor-pointer"
                    onClick={()=>setShowModalTwo(false)}
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 
                        0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3
                         265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
                        <h1 className='font-bold text-2xl'>Voting Duration</h1>
                        <div className='flex flex-col mt-5'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                className='
                                rounded-xl px-8 py-3 mr-1 text-[#93278F] 
                                font-semibold border-[1px] border-[#93278F]'
                                label="Set Time"
                                value={dateValue}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>

                            <button className='bg-[#93278F]
                            rounded-xl px-9 py-3 text-white font-semibold mt-4'
                            >Set Duration</button>
                            </div>
                    </div>
                </div>
            </form>
        </MuiModal>
      </div>
    </div>
  )
}

export default CreateElection