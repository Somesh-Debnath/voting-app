
import Card from '../components/Card/Card';

import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import useAuth from "../hooks/useAuth";
import { db } from "../utils/Firebase";
import AdminSidebar from '../components/Sidebar/AdminSidebar';
import Avatar from 'react-avatar';


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
           
      <AdminSidebar/>
       <div className='flex flex-col w-screen ml-[183px]'>
        {/* put in a single component topbar */}
          <div className='px-8 py-4 shadow-lg max-h-[80px] fixed 
          top-0 z-50  w-full flex  bg-opacity-100'>
            <input className='w-[40rem] px-6
            h-10 border-[1.7px] border-gray-400 outline-none rounded-xl'
            type="search" name="search" 
            id="search" placeholder='Search' />

        <div className="flex fixed space-x-1 top-5 z-50 right-8">
          <Avatar
              name="A D M I N"
              size="40"
              round={true}
              style={{ fontSize: '50px' }}
            />
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
                {Object.keys(doc.people).map((key) => (
                  <Card
                    key={doc.people[key].uId}
                    Name={doc.people[key].Name}
                    role={doc.people[key].Role}                   
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