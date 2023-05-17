import { useEffect, useRef, useState } from "react";
import { doc, setDoc, updateDoc, arrayRemove,arrayUnion,getDocs,collection,query } from "@firebase/firestore";
import { db} from "../../utils/Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Web3Modal  from 'web3modal'
//import web3 from '../../constants/web3';
import { providers, Contract, ethers } from "ethers";
import useToggleVote from '../../hooks/useToggleVote'
import useAuth from "../../hooks/useAuth";
 
import {VOTE_CONTRACT_ADDRESS,abi} from '../../constants'
import constants from '../../constants';
import { useRouter } from 'next/router';



function Card({walletConnected,people,Name,role,voted,parentCallback,indx,id,eid,Email,Image}) {
  
//const [voted, setVoted] = useState(0);
 
 //const {user,loading:userloading}=useAuth();
 const [user, setUsers] = useState(null);
 const [owner, setOwner] = useState('');
 const userQuery=collection(db,'users');
  const [docs,loading,error]=useCollectionData(userQuery);
 console.log(indx, Name)
 const web3ModalRef = useRef();

console.log(owner);
 const router = useRouter();
//console.log(FormData.name)

const getProviderOrSigner = async (needSigner = false) => {

  // Connect to Metamask
  // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
  const provider = await web3ModalRef.current.connect();
  const web3Provider = new providers.Web3Provider(provider);
  console.log("web3Provider", web3Provider);

  // If user is not connected to the Goerli network, let them know and throw an error
  const { chainId } = await web3Provider.getNetwork();
  if (chainId !== 5) {
    window.alert("Change the network to Goerli");
    throw new Error("Change network to Goerli");
  }
    const signer = web3Provider.getSigner();
    return signer;
  
  return web3Provider;
};

web3ModalRef.current = new Web3Modal({
  network: "goerli",
  providerOptions: {},
  disableInjectedProvider: false,
});


    const giveVote = async () => {
      setLoading(true);
      try {
        const signer = await getProviderOrSigner();
        const contract = new Contract(VOTE_CONTRACT_ADDRESS, abi, signer);
        const tx = await contract.vote(0);
        const tx2=await contract.candidatesDetail;
        console.log(tx2);
        await tx.wait();
        setVoted(true);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    useEffect(()=>{
   
      const getUsers=async()=>{
        const getUsers=await getDocs(userQuery);
        const users = getUsers.docs.map((doc)=>({
          ...doc.data(), id:doc.id
      }))
        setUsers(users);        
      }
      getUsers();
    },[])

    console.log(user)

  const renderButton = () => {
    if(walletConnected){
        return <button className={`bg-[#93278F] text-white px-8 py-2
        hover:bg-[#5c0f59] ${voted ? "opacity-50 cursor-not-allowed" : ""}
        text-sm rounded-2xl`}
        onClick={vot} disabled={voted ? true : false}>
          Vote
        </button>   
    }
  }
 const vot=()=>{
  const docRef = doc(db, "Elections", eid, "Candidates", indx); 
         updateDoc(docRef, {            
            count: voted ? arrayRemove(user?.uid) : arrayUnion(user?.uid),     
        });

    const docRef2 = doc(db, "users", user?.uid);
    updateDoc(docRef2, {
      voted: voted ? arrayRemove(eid) : arrayUnion(eid),
    });

    console.log(user?.voted?.includes(eid));

    const candidateToWatch = user?.uid
    docRef2.where('votes', 'array-contains', candidateToWatch).onSnapshot((snapshot) => {
      const candidates = snapshot.docs.map((doc) => console.log(doc.data(),"-->"));
    })
    
    if(user?.voted?.includes(eid)){
      alert("You have already voted for this election");
      console.log(user?.voted?.includes(eid));
    }
    else{
      parentCallback(1);
      console.log(user?.voted?.includes(eid));
      alert("Your vote has been recorded");
    }
}
 
  return (
    <div className='flex flex-col shadow-lg max-h-[420px]'>
            <div className='flex flex-col items-center '>
              <div className='h-[58px] w-[58px] rounded-full'>
                  <img className="object-contain" 
                  src='/w-removebg-preview.png' alt='w' />
              </div>
              <h3>{Name}</h3>
              <h2 className='font-bold text-md mb-2'>{role}</h2>

              <div className='flex mx-1 mb-4'>
                 {renderButton()}
                  <button className='bg-white border-[1px] border-[#93278F] ml-2
                  text-sm rounded-2xl text-[#93278F] px-4 py-2'
                  onClick={()=>router.push("/CandidateDetails")}>View Profile</button>
              </div>
            </div>
        </div>            
    
  )
}


export default Card