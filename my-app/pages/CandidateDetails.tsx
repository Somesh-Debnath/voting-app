import React from 'react'

function CandidateDetails(){
    return(
        <div className='flex flex-col text-2xl font-bold font-["Exo 2"]'>
            <img className="sticky w-screen m-0"
                src='/bgForCandidateCard.png' />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="absolute ml-[105px] mt-[105px] w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            <div className="absolute font-extrabold text-4xl text-center text-white ml-[390px] mt-[100px]">


                <h1 className='text-5xl p-1'>Vote Debangsuii Das </h1>
                <h2 >For<br/>President Student Council</h2> 
                </div>
                <div className='text-2xl absolute w-full  mt-80 ml-40 '>
                    <img className="rounded-full absolute h-60 w-60 m-auto" 
                        src='/w-removebg-preview.png'  alt='w'  />
                    <p className='text-xl mt-20 ml-[280px] font-normal text-white'>Debangsuii Das<br/>
                        Web Development<br/>
                        21 Years old</p>
                    <p className='text-xl ml-[270px] p-1.5 font-italic text-white'>
                        “ Getting me elected means leadership and growth “<br/></p>
                </div>
                <h2 className='text-3xl ml-24'>Campaign Promise</h2>
                <p className='text-2xl w-[1000px] ml-24 mt-10'>Fellow FIEMIANS,</p>
                <p className='text-2xl w-[1000px] ml-24 mt-20'>
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