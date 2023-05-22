import { providers } from "ethers";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Web3Modal from "web3modal";
import Card from "../components/Card/Card.jsx";
import useAuth from "../hooks/useAuth";
import Sidebar from "../components/Sidebar/Sidebar";
import { db, auth } from "../utils/Firebase";
import { ethers } from "ethers";
import abi from "../contract/new_vote.json";
import Avatar from "react-avatar";
import Countdown from "../components/Card/Countdown"

function dashboard() {
  const { logout } = useAuth();
  const [walletConnected, setWalletConnected] = useState(0);

  const electionQuery = collection(db, "Elections");
  const [docs, loading, error] = useCollectionData(electionQuery);
  const [voted, setVoted] = useState(0);
  const web3ModalRef = useRef();
  const [currentAccount, setCurrentAccount] = useState("");
  const [cardDetails, setCardDetails] = useState([[]]);
  const [elections, setElections] = useState([]);

  const [state, setState] = useState({
    provide: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None"); //for smart contract

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentAccount(user.email.charAt(0));
      } else {
        setCurrentAccount(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const getElections = async () => {
      const getElections = await getDocs(electionQuery);
      const elections = getElections.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setElections(elections);
      elections.map(async (election) => {
        const getCandidates = await getDocs(
          collection(db, "Elections", election.id, "Candidates")
        );
        console.log("election", election.id);
        const candidates = getCandidates.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCardDetails((prev) => [...prev, ...candidates]);
        console.log("candidates", candidates);
      });
    };
    getElections();
    renderButton();
  }, []);

  console.log("CardDetails", cardDetails);

  //console.log(elections);
  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId != 11155111) {
      alert("Please switch to Sepolia network");
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
      const contractAddress = "0x544624eF5A590E802817CFfe1dDA655260c4E914";
      const contractABI = abi.abi;
      const provide = new ethers.providers.Web3Provider(ethereum);
      const signer = provide.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setAccount(account);
      setState({ provide, signer, contract });

      await getProviderOrSigner();
      setWalletConnected(1);
      localStorage.setItem("walletConnected", 1);
    } catch (err) {
      console.error(err);
    }
  };

  const disconnectWallet = () => {
    setWalletConnected(0);
    localStorage.setItem("walletConnected", 0);
    
  };

  const renderButton = () => {
    const connected = Number(localStorage.getItem("walletConnected"));
    return (
      <button
        className="bg-[#bd3fb8] mt-[1px] fixed px-6 py-2 rounded-xl
      text-white font-semibold text-sm top-4 z-50 right-[10rem]"
        onClick={connected ? disconnectWallet : connectWallet}
      >
        {connected ? "Disconnect Wallet" : "Connect Wallet"}
      </button>
    );
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
          <div className="flex fixed space-x-1 top-4 z-50 right-10">
            <Avatar
              name={currentAccount}
              size="40"
              round={true}
              style={{ fontSize: "50px" }}
            />
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
        {elections &&
          elections.map((doc) => (
            <div>
              <div className="flex mt-5  mx-[13px]">
                <div className="w-[10px] h-[10px] ml-5 mt-[6.7px] bg-[#93278F] rounded-full"></div>
                <span className="font-semibold px-2">{doc.title}</span>
                <div className="font-semibold px-10 right-0"><Countdown targetDate={doc.duration}/></div>

              </div>

              <div className="flex flex-row justify-around mt-4">
                {cardDetails &&
                  cardDetails.map(
                    (can) =>
                      can.electionId === doc.id && (
                        <Card
                          state={state}
                          key={can.uId}
                          Name={can.Name}
                          role={can.Role}
                          id={can.uId}
                          Email={can.Email}
                          Image={can.Image}
                          title={doc.title}
                          eid={doc.id}
                          indx={can.id}
                          walletConnected={walletConnected}
                        />
                      )
                  )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default dashboard;
