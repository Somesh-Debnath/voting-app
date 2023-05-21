import Card from "../components/Card/Card";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../utils/Firebase";
import router, { useRouter } from "next/router";
import AdminSidebar from "../components/Sidebar/AdminSidebar";
import Avatar from "react-avatar";
import Countdown from "../components/Card/Countdown"

function adminDashboard() {
  const electionQuery = collection(db, "Elections");
  const [docs, loading, error] = useCollectionData(electionQuery);
  const [cardDetails, setCardDetails] = useState([[]]);
  const [elections, setElections] = useState([]);
  const router = useRouter();

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
        setCardDetails((prev) => [...prev, ...candidates]);
      });
    };
    getElections();
  }, []);

  return (
    <div className="flex w-screen m-0  h-screen">
      <AdminSidebar />
      <div className="flex flex-col w-screen ml-[183px]">
        {/* put in a single component topbar */}
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

          <div className="flex fixed space-x-1 top-4 z-50 right-10">
            <Avatar
              name="A D M I N"
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
            Admin can create candidates
          </p>
        </div>
        <div className="flex mt-5 mx-[11px]"></div>

        {/*display create election button* if there are no elections*/}
        {elections.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20">
            <h1 className="font-bold text-2xl">No Elections</h1>
            <p className="px-1 text-sm font-normal mt-2 text-gray-500">
              Create an election to get started
            </p>
            <button
              className="bg-[#93278F] text-white px-8 py-2
              hover:bg-[#5c0f59] text-sm rounded-2xl mt-5"
              onClick={() => router.push("/CreateElection")}
            >
              Create Election
            </button>
          </div>
        )}

        {elections &&
          elections.map((doc) => (
            <div>
              <div className="flex mt-5 mx-[11px]">
                <div className="w-[10px] h-[10px] ml-3 mt-[6.7px] bg-[#93278F] rounded-full"></div>
                <span className="font-semibold px-2">{doc.title}</span>
                <div className="font-semibold px-10 right-8"><Countdown targetDate={doc.duration} /></div>
              </div>
              <div className="flex flex-row justify-around mt-4">
                {cardDetails &&
                  cardDetails.map(
                    (can) =>
                      can.electionId === doc.id && (
                        <Card
                          key={can.uId}
                          Name={can.Name}
                          role={can.Role}
                          id={can.uId}
                          Email={can.Email}
                          Image={can.Image}
                          eid={doc.id}
                          indx={can.id}
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

export default adminDashboard;