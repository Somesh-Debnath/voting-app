import { useEffect, useRef, useState } from "react";
import { doc, setDoc, updateDoc, arrayRemove,arrayUnion,getDocs } from "@firebase/firestore";
import { db} from "../../utils/Firebase";
import Web3Modal  from 'web3modal'
import useAuth from "../../hooks/useAuth";
import { useRouter } from 'next/router';

function Card({state,walletConnected,people,Name,role,parentCallback,voted,indx,id,eid,Email,Image}) {
  
//const [voted, setVoted] = useState(0);
 const [loading, setLoading] = useState(false);
 const {user,loading:userloading}=useAuth();
 const [owner, setOwner] = useState('');
 console.log(indx, Name)
 console.log(user?.email , user?.uid)
 const web3ModalRef = useRef();

 //const isVoted=votes.includes(user?.id)
 //const {toggleVote,isLoading}=useToggleVote({id,isVoted,uid:user?.id});
// const [walletConnected, setWalletConnected] = useState(false);

// useEffect(() => {
//   const owner=constants.methods.admin().call();
//   web3.eth.requestAccounts().then(console.log);
//   setOwner(owner);
// }, []);
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


    // const giveVote = async () => {
    //   setLoading(true);
    //   try {
    //     const signer = await getProviderOrSigner();
    //     const contract = new Contract(VOTE_CONTRACT_ADDRESS, abi, signer);
    //     const tx = await contract.vote(0);
    //     const tx2=await contract.candidatesDetail;
    //     console.log(tx2);
    //     await tx.wait();
    //     setVoted(true);
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   setLoading(false);
    // };

console.log(walletConnected);
  const renderButton = () => {
    if(walletConnected && !voted){
        return <button className={`bg-[#93278F] text-white px-8 py-2
        hover:bg-[#5c0f59] ${voted ? "opacity-50 cursor-not-allowed" : ""}
        text-sm rounded-2xl`}
        onClick={vot}>Vote</button>   
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
            count: voted ? arrayRemove(user?.uid) : arrayUnion(user?.uid),     
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