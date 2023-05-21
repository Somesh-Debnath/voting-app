import { useEffect, useState } from "react";
import {
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDoc,
} from "@firebase/firestore";
import { db } from "../../utils/Firebase";
import useAuth from "../../hooks/useAuth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";

function Card({ state, walletConnected, Name, role, indx, eid, title }) {
  const [voted, setVoted] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  

  useEffect(() => {
    const storage = getStorage();
    const storageRef = ref(storage, `${Name}.jpg`);
    console.log(storageRef);
      try {
        let url = getDownloadURL(storageRef);
        url.then((result) => {
          setImageUrl(result);
          console.log(imageUrl);
        }
        
        );
  
      } catch (err) {
        console.log(err);
      }

    //check if user has voted
    const checkVoted = async () => {
      const docRef = doc(db, "users", user?.uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (data?.voted?.includes(eid)) {
        setVoted(1);
        setIsButtonDisabled(true);
      }
    };
    checkVoted();
  }, []);

  const renderButton = () => {
    if (walletConnected) {
      return (
        <button
          className={`bg-[#93278F] text-white px-8 py-2
        hover:bg-[#5c0f59] ${voted ? "opacity-50 cursor-not-allowed" : ""}
        text-sm rounded-2xl`}
          onClick={vot}
          disabled={isButtonDisabled}
        >
          Vote
        </button>
      );
    }
  };
  const vot = async () => {
    alert("Voting for " + Name);
    try {
      const { contract } = state;

      //console.log(Name, role, contract);
      // const amount = { value: ethers.utils.parseEther("0.000001") };
      const transaction = await contract.giveVote(Name, indx);
      await transaction.wait();
      console.log("Successfully voted");
      const noOfVotes = await contract.getCountOfVotes(indx);
      console.log("no of votes", noOfVotes.toString());
    } catch (err) {
      console.log(err);
    }

    const docRef = doc(db, "Elections", eid, "Candidates", indx);
    updateDoc(docRef, {
      count: voted ? arrayRemove(user?.uid) : arrayUnion(user?.uid),
    });
    alert("Successfully Voted for " + Name);
    const docRef2 = doc(db, "users", user?.uid);
    updateDoc(docRef2, {
      voted: arrayUnion(eid),
    });
    setIsButtonDisabled(true);
  };

  return (
    <div className="flex flex-col shadow-lg max-h-[420px]">
      <div className="flex flex-col items-center ">
        <div className="h-[58px] w-[58px] rounded-full">
        <img src={imageUrl} alt="Firebase Image" onError={(e) => console.log(e)}  referrerPolicy="no-referrer"/>
        </div>
        <h3>{Name}</h3>
        <h2 className="font-bold text-md mb-2">{role}</h2>

        <div className="flex mx-1 mb-4">
          {renderButton()}
          <button
            className="bg-white border-[1px] border-[#93278F] ml-2
                  text-sm rounded-2xl text-[#93278F] px-4 py-2"
            onClick={() =>
              router.push({
                pathname: "/CandidateDetails",
                query: {
                  name: Name,
                  role: role,
                  title: title,
                  image: Image,
                },
              })
            }
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
