import { useEffect, useRef, useState } from "react";
import { doc, setDoc, updateDoc, arrayRemove,arrayUnion,getDocs,collection,query } from "@firebase/firestore";
import { db} from "../../utils/Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Web3Modal  from 'web3modal'
import { useRouter } from 'next/router';

function Card({walletConnected,people,Name,role,voted,parentCallback,indx,id,eid,Email,Image}) {

 const [user, setUsers] = useState(null);
 const [owner, setOwner] = useState('');
 const userQuery=collection(db,'users');
  const [docs,loading,error]=useCollectionData(userQuery);
 console.log(indx, Name)
 const web3ModalRef = useRef();

console.log(owner);
 const router = useRouter();

web3ModalRef.current = new Web3Modal({
  network: "goerli",
  providerOptions: {},
  disableInjectedProvider: false,
});

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
 const vot= async()=>{
  alert("Voting for "+Name);
  try{
    const { contract } = state;
    console.log(Name, role, contract);
    // const amount = { value: ethers.utils.parseEther("0.000001") };
    const transaction = await contract.giveVote(Name, indx);
    await transaction.wait();
    console.log("Successfully voted");
    const noOfVotes = await contract.getCountOfVotes(indx);
    console.log("no of votes",noOfVotes.toString());
  }catch(err){
    console.log(err);
  }
  
  const docRef = doc(db, "Elections", eid, "Candidates", indx); 
         updateDoc(docRef, {            
            count: voted ? arrayRemove(user?.uid) : arrayUnion(user?.uid)     
        });
    alert("Successfully Voted for "+Name);
    parentCallback(1);

    console.log(docRef);
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