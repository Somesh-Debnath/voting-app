import React from 'react'
import Web3Modal  from 'web3modal'
import { providers, Contract } from "ethers";
import { useEffect, useRef, useState } from "react"; 
import {VOTE_CONTRACT_ADDRESS,abi} from '../../constants'

function Card({walletConnected}) {
  
 const [voted, setVoted] = useState(false);
 const [loading, setLoading] = useState(false);
// const [walletConnected, setWalletConnected] = useState(false);
 const web3modalRef = useRef();

 const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3modalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

     // If user is not connected to the Goerli network, let them know and throw an error
     const { chainId } = await web3Provider.getNetwork();
     if (chainId !== 5) {
       window.alert("Change the network to Goerli");
       throw new Error("Change network to Goerli");
     }
 
     if (needSigner) {
       const signer = web3Provider.getSigner();
       return signer;
     }
     return web3Provider;
   };

   const giveVote = async () => {
    try{
      setLoading(true);
      const signer = await getProviderOrSigner(true);
      const VoteContract = new Contract(VOTE_CONTRACT_ADDRESS, abi, signer);
      const tx = await VoteContract.giveVote();
      await tx.wait();
      setVoted(true);
      setLoading(false);
    }
    catch(err){
      console.log(err);
    }
  };
console.log(walletConnected);
  const renderButton = () => {
    if(walletConnected){
      
        return <button className='bg-[#93278F] text-white px-8 py-2
        text-sm rounded-2xl'>Vote</button>
      
     
    }
  }

  return (
    <div className='flex flex-col shadow-lg max-h-[420px]'>
       <div className='flex mt-5 mx-[11px]'>

          <div className="w-[10px] h-[10px] ml-3 mt-[6.7px] bg-[#93278F] rounded-full"></div>
          <span className="font-semibold px-2">President for Student Council</span>
      </div>

              <div className='flex justify-around mt-4'>
            <div className='flex flex-col items-center '>
              <div className='h-[58px] w-[58px] rounded-full'>
                  <img className="object-contain" 
                  src='/w-removebg-preview.png' alt='w' />
              </div>
              <h3>Debanshiii Das</h3>
              <h2 className='font-bold text-md mb-2'>Software Developer</h2>

              <div className='flex mx-1 mb-4'>
                 {renderButton()}
                  <button className='bg-white border-[1px] border-[#93278F] ml-2
                  text-sm rounded-2xl text-[#93278F] px-4 py-2'>View Profile</button>
              </div>
            </div>

            <div className='flex flex-col items-center '>
              <div className='h-[58px] w-[58px] rounded-full'>
                  <img className="object-contain" 
                  src='/w-removebg-preview.png' alt='w' />
              </div>
              <h3>Debanshiii Das</h3>
              <h2 className='font-bold text-md mb-2'>Software Developer</h2>

              <div className='flex mx-1 mb-2'>
                  {renderButton()}
                  <button className='bg-white border-[1px] border-[#93278F] ml-2
                  text-sm rounded-2xl text-[#93278F] px-4 py-2'>View Profile</button>
              </div>
            </div>

            <div className='flex flex-col items-center '>
              <div className='h-[58px] w-[58px] rounded-full'>
                  <img className="object-contain" 
                  src='/w-removebg-preview.png' alt='w' />
              </div>
              <h3>Debanshiii Das</h3>
              <h2 className='font-bold text-md mb-2'>Software Developer</h2>

              <div className='flex mx-1 mb-2'>
                  {renderButton()}
                  <button className='bg-white border-[1px] border-[#93278F] ml-2
                  text-sm rounded-2xl text-[#93278F] px-4 py-2'>View Profile</button>
              </div>
            </div>
            <div className='flex flex-col items-center '>
              <div className='h-[58px] w-[58px] rounded-full'>
                  <img className="object-contain" 
                  src='/w-removebg-preview.png' alt='w' />
              </div>
              <h3>Debanshiii Das</h3>
              <h2 className='font-bold text-md mb-2'>Software Developer</h2>

              <div className='flex mx-1 mb-2'>
                  {renderButton()}
                  <button className='bg-white border-[1px] border-[#93278F] ml-2
                  text-sm rounded-2xl text-[#93278F] px-4 py-2'>View Profile</button>
              </div>
            </div>
              </div>
    </div>
  )
}


export default Card