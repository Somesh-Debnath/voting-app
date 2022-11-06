import React from 'react'

function CandidateDetails(){
    return(
        <div className='flex flex-col'>
            <img className="sticky top-0 left-0"
                src='/bgForCandidateCard.png' />
            <div className='text-2xl absolute w-full  mt-96 ml-40  text-white font-bold'>
                fgsgsgfsgsg
                <img className="rounded-full absolute h-60 w-60 m-auto" 
                    src='/w-removebg-preview.png'  alt='w'  />
                <div className="ml-80">
                    <h1>Vote Debangsuii Das <br/> For</h1>
                    <h2>President Student Council</h2> 
                </div>
            </div>
            

        </div>
    )
}

export default CandidateDetails