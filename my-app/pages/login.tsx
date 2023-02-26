import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
//import constants from '../constants'

interface Inputs{
  email:string
  password:string
}
function login() {
  const [login,setLogin]=useState(false)
  const {signIn,signUp} = useAuth()
  const { register,
     handleSubmit,
      watch,
       formState: { errors } }
      = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({email,password}) => {
    if(login){
      await signIn(email,password)
    }
    else{
      await signUp(email,password)
    }
  }

const [adminLogin,setAdminLogin]=useState(false)
const router=useRouter()
// const handleClick=()=>{
//   const owner=constants.methods.admin().call();
//   const address=web3.eth.requestAccounts().then(console.log);
//   if(owner===address){
//     setAdminLogin(true)
//     setLogin(false)
//   }
//   else{
//     setAdminLogin(false)
//     //alert("You are not an admin")
//   }
// }

  return (
    <div className='flex'>
       <div className='max-w-xl items-center pt-28 pl-16 pr-12 h-screen'>
           <img  className='object-cover' src="/userlogin.png" alt="userlogin" />
        </div>
      <div className='flex flex-col pt-16 pl-24  max-w-lg'>
        <h1 className='text-4xl font-bold mb-7'>Welcome !</h1>
        <p className='text-sm font-normal leading-4'>Register as a voter on the decentralized 
        voting platform to vote your prefered candidate</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col mt-8'>

                    <input className='bg-white rounded-full p-3 text-gray-500 mb-3
                    border-[1.5px] border-[#93278F] 
                    w-full outline-none' type='email'
                     placeholder='Enter your email'
                     {...register('email',{required:true})} />
                    
                    {errors.email && 
                    <p className="p-1 text-[13px] font-light text-orange-500">Please enter a valid email</p>}

                    <input className='bg-white rounded-full p-3 text-gray-500 
                    my-2 border-[1.5px] border-[#93278F] 
                    w-full outline-none' 
                    type='password'  
                     placeholder='Enter your password'
                    {...register('password',{required:true})} />
                    
                    {errors.password &&
                    <p className="p-1 text-[13px] font-light text-orange-500">
                      Your password must contain between 4 and 60 characters </p>}

                    <p className='text-sm my-6'>By clicking the sign up button, you agree with our 
                        Terms and Condtions</p>
                    <button className='bg-[#93278F] rounded-full px-1 py-3 text-white font-semibold'
                    onClick={()=>setLogin(false)}
                    >Sign Up</button>
                </div>
            
            <div className='flex flex-col mt-5'>

            <button type='button' onClick={()=>{ 
            router.push('./adminDashboard')}}
             className=' font-medium text-center'>
             Sign in as Admin</button>

            <span className=' mb-3 text-center
            '>Already have an account,</span>
            <button onClick={()=>setLogin(true)}
            className="text-[#93278F] text-lg font-bold">Login</button>
            </div>
          </form>
        </div>
      </div>
    
  )
}

export default login