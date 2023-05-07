import { providers } from "ethers";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Web3Modal from "web3modal";
import Card from "../components/Card/Card.jsx";
import useAuth from "../hooks/useAuth";
import Sidebar from '../components/Sidebar/Sidebar';
import { db } from "../utils/Firebase";

/*
 * This function returns the first linked account found.
 * If there is no account linked, it will return null.
 */

function dashboard() {
  const router = useRouter();
  const { logout } = useAuth();
  const [walletConnected, setWalletConnected] = useState(0);
  
  //const query=collection(db,'Elections','Elections');
  const electionQuery=collection(db,'Elections');
  const [docs,loading,error]=useCollectionData(electionQuery);

  const [voted, setVoted] = useState(0);
  const web3ModalRef = useRef();
  const [currentAccount, setCurrentAccount] = useState("");
  const [cardDetails, setCardDetails] = useState([]);
  const [elections,setElections]=useState([]);

  const getEthereumObject = () =>
    window.ethereum || window.web3?.currentProvider;
  
    
  useEffect(()=>{
   
    const getElections=async()=>{
      const getElections=await getDocs(electionQuery);
      const elections=getElections.docs.map((doc)=>doc.data());
      setElections(elections);
    }
    getElections();
    //getElections();
    
    renderButton();
  },[])
  
  console.log(docs);
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
    setVoted(1);
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
                {doc.people.map((person,indx) => (
                  <Card
                    key={person.uId}
                    id={person.uId}
                    people={doc.people}
                    indx={indx}
                    walletConnected={walletConnected}
                    Name={person.Name}
                    role={person.Role}
                    Email={person.Email}
                    Image={person.Image}
                    parentCallback={handleCallback}
                    voted={voted}
                    eid={doc.id}
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
