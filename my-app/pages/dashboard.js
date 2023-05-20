import { providers } from "ethers";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Web3Modal from "web3modal";
import Card from "../components/Card/Card.jsx";
import useAuth from "../hooks/useAuth";
import Sidebar from "../components/Sidebar/Sidebar";
import { db } from "../utils/Firebase";
import { ethers } from "ethers";
import abi from "../contract/new_vote.json";
import Memos from "../components/Card/Memos.js";

function dashboard() {
  const { logout } = useAuth();
  const [walletConnected, setWalletConnected] = useState(0);

  const electionQuery = collection(db, "Elections");
  const [docs, loading, error] = useCollectionData(electionQuery);
  const [voted, setVoted] = useState(0);
  const web3ModalRef = useRef();
  const [currentAccount, setCurrentAccount] = useState("");
  const [cardDetails, setCardDetails] = useState([]);
  const [elections, setElections] = useState([]);

  const [state, setState] = useState({
    provide: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None"); //for smart contract

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
        const candidates = getCandidates.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCardDetails(candidates);
      });
    };
    getElections();

    renderButton();
  }, []);

  console.log(elections);
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
      const contractAddress = "0x08a55BA39df32321d5771C6a772796E4F02Db133";
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
      console.log("Transaction is done");
    } catch (err) {
      console.error(err);
    }
  };

  const disconnectWallet = async () => {
    try {
      await web3ModalRef.current.clearCachedProvider();
      setWalletConnected(0);
      console.log("Transaction is done");
    }
    catch (err) {
      console.error(err);
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
        {elections &&
          elections.map((doc) => (
            <div>
              <div className="flex mt-5 mx-[11px]">
                <div className="w-[10px] h-[10px] ml-3 mt-[6.7px] bg-[#93278F] rounded-full"></div>
                <span className="font-semibold px-2">{doc.title}</span>
              </div>

              <div className="flex flex-row justify-around mt-4">
                {cardDetails.map((can) => (
                  <Card
                    state={state}
                    key={can.uId}
                    Name={can.Name}
                    role={can.Role}
                    id={can.uId}
                    Email={can.Email}
                    Image={can.Image}
                    parentCallback={handleCallback}
                    voted={voted}
                    eid={doc.id}
                    indx={can.id}
                    walletConnected={walletConnected}
                  />
                ))}
                <Memos state={state} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default dashboard;
