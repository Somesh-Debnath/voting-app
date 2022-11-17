import { Router, useRouter } from 'next/router'
import React from 'react'
import { useEffect,useState } from 'react'
import Card from '../components/Card/Card'
import useAuth from '../hooks/useAuth'


function adminDashboard()
{
  const [cardDetails, setCardDetails] = useState([]);
  const FormData=JSON.parse(localStorage.getItem('formData'))
  const Candidates=JSON.parse(localStorage.getItem('people'))
  console.log(typeof people)

  //console.log(localStorage.getItem('formData'))
  // console.log(typeof FormData)
  // const [cardData, setCardData] = React.useState([])

  // const handleCardData = () => {
  //   setCardData(FormData)
  // }
  const {logout}=useAuth()
  const router=useRouter()

  // useEffect(() => {
  //   handleCardData()
  //   }, [])

    console.log(typeof cardData)
  return (
    <div className='flex w-screen m-0  h-screen'>
           
        <div className="max-w-[180px] flex flex-col items-center h-screen
        shadow-xl pr-12 pb-7 fixed">
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
                    <li className="sidebar__menu--item">
                       <button className='font-medium flex-1'
                       onClick={()=>router.push("/CreateElection")}>Create Election</button>
                    </li>
                    
                </ul>
              </div>
              <button className='mt-48 font-medium' onClick={logout} >Logout</button>
        </div>
       <div className='flex flex-col w-screen ml-[183px]'>
          <div className='px-8 py-4 shadow-lg max-h-[80px] fixed 
          top-0 z-50  w-full flex  bg-opacity-100'>
            <input className='w-[40rem] px-6
            h-10 border-[1.7px] border-gray-400 outline-none rounded-xl'
            type="search" name="search" 
            id="search" placeholder='Search' />

            <div className='flex fixed space-x-1 top-5 z-50 right-8'>
                    <h3>avatar</h3>
                    <h3>name</h3>
            </div>
          </div>
          <div className='flex flex-col mt-20 px-4'>
            <h1 className='font-bold text-2xl'>Your Vote is Secure, Your Vote Counts</h1>
            <p className='px-1 text-sm font-normal mt-2 text-gray-500'>znbvjsdbvjkfdkjvbkjfbvkjsdnv kjdvkjnjk</p>
          </div>

          <div className='flex mt-5 mx-[11px]'>

            <div className="w-[10px] h-[10px] ml-3 mt-[6.7px] bg-[#93278F] rounded-full"></div>
            <span className="font-semibold px-2">{FormData.title}</span>
          </div>
          <div className='flex flex-row justify-around mt-4'>
          {
          Candidates.map((item,index)=>{
            return <Card key={index} walletConnected={undefined} 
            web3ModalRef={undefined} 
            Name={item.Name}
            role={item.role}/>
          })
          }
        </div>
     
          
        </div>
    </div>
  )
}

export default adminDashboard