import React from 'react'
import { useRouter } from 'next/router';
function CandidateDetails(){
    const router=useRouter()
    return(
        <div className='flex flex-col'>
            <img className="sticky w-full -mt-35"
                src='/bgForCandidateCard.png' />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" 
            className="absolute m-16 w-6 h-6 hover:cursor-pointer" onClick={()=>router.push("/dashboard")}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            <div className="absolute text-center text-white 
            ml-[420px] mt-16">

                <h1 className='text-6xl p-1 mb-2'>Vote Debangsuii Das </h1>
                <h2 className='text-2xl'>For<br/>President Student Council</h2> 
                </div>
                <div className='text-2xl absolute w-10/12  mt-56 ml-40 '>
                    <img className="rounded-full absolute h-40 w-40 ml-[70px] mt-10" 
                        src='/w-removebg-preview.png'  alt='w'  />
                    <p className='text-2xl mt-20 ml-[280px] font-semibold 
                     text-white'>Debangsuii Das</p>
                        <p className='text-xl mt-5 ml-[280px]
                     text-white'>Web Development<br/>
                        21 Years old</p>
                    <p className='text-xl ml-[265px] p-1.5 font-italic text-white'>
                        “ Getting me elected means leadership and growth “<br/></p>
                </div>
                <h2 className='text-4xl font-bold ml-24'>Campaign Promise</h2>
                <p className='text-2xl ml-24 mt-10'>Fellow FIEMIANS,</p>
                <p className='text-xl ml-24 my-20'>
                    Lorem Ipsum is simply dummy 
                    text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's 
                    standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type 
                    and scrambled it to make a type specimen 
                    book. It has survived not only five centuries, 
                    but also the leap into electronic.<br/><br/> Thank You
                </p>
                
        </div>
    )
}

export default CandidateDetails