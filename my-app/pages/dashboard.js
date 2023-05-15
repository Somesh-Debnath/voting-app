import { providers } from "ethers";
import { collection, doc, getDocs, getFirestore, onSnapshot, query, setDoc } from 'firebase/firestore'
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Web3Modal from "web3modal";
import Card from "../components/Card/Card.jsx";
import useAuth from "../hooks/useAuth";
import Sidebar from '../components/Sidebar/Sidebar';
import { db } from "../utils/Firebase";

function dashboard() {
  const userQuery=collection(db,'users');
  const {user}=useAuth();
  const [users,setUsers]=useState([]);
  const [walletConnected, setWalletConnected] = useState(0);
  const electionQuery=collection(db,'Elections');
  const [docs,loading,error]=useCollectionData(electionQuery);
  const [Voted, setVoted] = useState(0);
  const web3ModalRef = useRef();
  const [currentAccount, setCurrentAccount] = useState("");
  const [cardDetails, setCardDetails] = useState([]);
  const [elections,setElections]=useState([]);

  const getEthereumObject = () =>
    window.ethereum || window.web3?.currentProvider;
  
    
  useEffect(()=>{
   
    const getElections=async()=>{
      const getElections=await getDocs(electionQuery);
      const elections = getElections.docs.map((doc)=>({
        ...doc.data(), id:doc.id
    }))
      setElections(elections);
      elections.map(async (election)=>{
        const getCandidates=await getDocs(collection(db,'Elections',election.id,'Candidates'));
        const candidates = getCandidates.docs.map((doc)=>({
          ...doc.data(), id:doc.id
      }))
      setCardDetails(candidates);
    })
    const getUsers=async()=>{
      const getUsers=await getDocs(userQuery);
      const users = getUsers.docs.map((doc)=>({
        ...doc.data(), id:doc.id
    }))
      setUsers(users);        
    }
    getUsers();
    }
    getElections();

    
    renderButton();
  },[])

  users.map((user1)=>{
    if(user1?.uid === user?.uid){
      console.log(user1.username + " " + user1.uid);
    }
    elections.map((election)=>{
      if(user1?.voted?.includes(election.id)){
        alert("You have already voted for this election");
        setVoted(1);
      }
    })
  })
  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    //console.log("web3Provider", web3Provider);

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

  web3ModalRef.current = new Web3Modal({
    network: "sepolia",
    providerOptions: {},
    disableInjectedProvider: false,
  });

  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(1);
    } catch (err) {
      //console.error(err);
    }
  };

  const disconnectWallet = async () => {
    try {
      // Disconnect the wallet
      await web3ModalRef.current.clearCachedProvider();
      setWalletConnected(0);
    } catch (err) {
      //console.error(err);
    }
  };

  const renderButton = () => {
    if (!walletConnected) {
      return (
        <button
          className="bg-[#bd3fb8] mt-[1px] fixed px-6 py-2 rounded-xl
      text-white font-semibold text-sm top-4 z-50 right-[10rem]"
          onClick={connectWallet}
        >
          Connect Wallet to vote
        </button>
      );
    } else {
      return (
        <button
          className="bg-[#bd3fb8] mt-[1px] fixed px-6 py-2 rounded-xl
      text-white font-semibold text-sm top-4 z-50 right-[10rem]"
          onClick={disconnectWallet}
        >
          Disconnect Wallet
        </button>
      );
    }
  };

  const handleCallback = (childData) => {
    setVoted(childData);
    //setVoted(1);
  };

  return (
    <div className="flex w-screen m-0  h-screen">
      <Sidebar />
      <div className="flex flex-col w-screen ml-[183px]">
        <div
          className="px-8 py-4 shadow-lg max-h-[80px] fixed 
          top-0 z-50  w-full flex  bg-opacity-100"
        >
          <input
            className="w-[40rem] px-6
            h-10 border-[1.7px] border-gray-400 outline-none rounded-xl"
            type="search"
            name="search"
            id="search"
            placeholder="Search"
          />
          {renderButton()}
          <div className="flex fixed space-x-1 top-5 z-50 right-8">
            <h3>avatar</h3>
            <h3>name</h3>
          </div>
        </div>
        <div className="flex flex-col mt-20 px-4">
          <h1 className="font-bold text-2xl">
            Your Vote is Secure, Your Vote Counts
          </h1>
          <p className="px-1 text-sm font-normal mt-2 text-gray-500">
          You can vote for only one candidate
          </p>
        </div>

        
        
          {loading && "Loading..."}
          {elections && elections.map((doc) => (
            <div>
              <div className="flex mt-5 mx-[11px]">
              <div className="w-[10px] h-[10px] ml-3 mt-[6.7px] bg-[#93278F] rounded-full"></div>
              <span className="font-semibold px-2">{doc.title}</span>
              </div>
              
              <div className="flex flex-row justify-around mt-4">
                {/* Object.keys(people).map((key) => people[key].name) */}
                {cardDetails.map((can) => (
                  <Card
                    // key={doc.people[key].uId}
                    // id={doc.people[key].uId}
                    // people={doc.people[key]}
                    // indx={key}
                    // walletConnected={walletConnected}
                    // Name={doc.people[key].Name}
                    // role={doc.people[key].Role}
                    // Email={doc.people[key].Email}
                    // Image={doc.people[key].Image}
                    // parentCallback={handleCallback}
                    // voted={voted}
                    // eid={doc.id}
                    key={can.uId}
                    Name={can.Name}
                    role={can.Role}
                    id={can.uId}
                    Email={can.Email}
                    Image={can.Image}
                    parentCallback={handleCallback}
                    voted={Voted}
                    eid={doc.id}
                    indx={can.id}
                    walletConnected={walletConnected}
                  />
                  
                ))}
            </div>
            </div>
          ))}
        </div>
      </div>
  
  );
}

export default dashboard;
