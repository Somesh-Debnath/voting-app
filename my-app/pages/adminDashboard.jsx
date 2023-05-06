
import Card from '../components/Card/Card';

import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import useAuth from "../hooks/useAuth";
import { db } from "../utils/Firebase";
import Sidebar from '../components/Sidebar/Sidebar';


function adminDashboard()
{
  const candidateQuery=collection(db,'Elections');
  const [docs,loading,error]=useCollectionData(candidateQuery);
  const [cardDetails, setCardDetails] = useState([]);
  const FormData=JSON.parse(localStorage.getItem('formData'))
  const [users,setUsers]=useState([]);
  
  console.log(typeof people)

  //console.log(localStorage.getItem('formData'))
  // console.log(typeof FormData)
  // const [cardData, setCardData] = React.useState([])

  // const handleCardData = () => {
  //   setCardData(FormData)
  // }
  const {logout}=useAuth()
  const router=useRouter()

  useEffect(() => {
    const getCandidates=async()=>{
      const getCandidates=await getDocs(candidateQuery);
      const candidates=getCandidates.docs.map((doc)=>doc.data());
      setUsers(candidates);
    }
    getCandidates();
    }, [])

    console.log(typeof cardData)
  return (
    <div className='flex w-screen m-0  h-screen'>
           
      <Sidebar/>
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
            <p className='px-1 text-sm font-normal mt-2 text-gray-500'>Admin can create candidates</p>
          </div>

          <div className='flex mt-5 mx-[11px]'>
{/* 
            <div className="w-[10px] h-[10px] ml-3 mt-[6.7px] bg-[#93278F] rounded-full"></div>
            <span className="font-semibold px-2">hj</span> */}
          </div>
          {loading && "Loading..."}
          {users && users.map((doc) => (
            <div>
              <div className="flex mt-5 mx-[11px]">
              <div className="w-[10px] h-[10px] ml-3 mt-[6.7px] bg-[#93278F] rounded-full"></div>
              <span className="font-semibold px-2">{doc.title}</span>
              </div>
              <div className="flex flex-row justify-around mt-4">
                {doc.people.map((person) => (
                  <Card
                    key={person.uId}
                    Name={person.Name}
                    role={person.Role}                   
                  />
                ))}
                 </div>
                 </div>
          ))}
            </div>
        </div>       

  )
}

export default adminDashboard