import { doc, setDoc } from "@firebase/firestore";
import { Dialog, TextField } from "@mui/material";
import MuiModal from "@mui/material/Modal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import FormCard from "../components/Card/FormCard";
import { db } from "../utils/Firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { AppContext, AppContextType } from "./_app";
import { toast, Toaster } from "react-hot-toast";
import AdminSidebar from "../components/Sidebar/AdminSidebar";

function create_vote() {
  const [showModalOne, setShowModalOne] = useState(false);
  const [showModalTwo, setShowModalTwo] = useState(false);
  const { cardDetails, setCardDetails } = useContext(
    AppContext
  ) as AppContextType;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    orgName: "",
    people: {
      name: "",
      email: "",
      role: "",
      image: "",
    },
    dateValue: "",
  });

  const [dateValue, setDateValue] = useState<any>(dayjs());
  const router = useRouter();

  function handleChange(event: any) {
    setFormData((prevFormData: any) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

    //date change creates two elections
    //one with current date
    //another correctly with the duration

    const handleDateChange = (newValue: any) => {
        setDateValue(newValue);
        console.log(newValue, "ehere")
        // handleChange(newValue);
    }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const q = query(collection(db, "Elections"));
    const querySnapshot = await getDocs(q);
    const qdata = querySnapshot.docs.map((doc: { data: () => any }) =>
      doc.data()
    );
    console.log(qdata);
    const eId = uuid();
    setDoc(doc(db, `Elections`, eId), {
      title: formData.title,
      description: formData.description,
      orgName: formData.orgName,
      id: eId,
      duration: dateValue.format()
    });
    cardDetails.map((p) => {
      setDoc(doc(db, `Elections/${eId}/Candidates`, uuid()), {
        Name: p.Name,
        Email: p.Email,
        Role: p.Role,
        Image: p.Image,
        uId: uuid(),
        count: [],
        electionId: eId
      });
    });
  };

  const customStyle = {
    maxWidth: "none",
    width: "900px",
    padding: "20px",
  };

  const handleModalTwoSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
    setShowModalTwo(false);
  };
  return (
    <div className="flex w-screen m-0 relative md:flex h-screen overflow-hidden">
      <AdminSidebar />\
      <div><Toaster/></div>

      <div className="flex-1 font-bold h-screen absolute ml-[183px] flex flex-col">
        <div className="flex flex-col">
          <div
            className="px-8 py-4 shadow-lg max-h-[80px] w-screen flex 
                            border-b-2 "
          >
            <h1 className="font-bold text-2xl font-sans text-fuchsia-900">
              Create Election
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-[800px] p-8">
          <div className=" flex flex-col ">
            <h2 className="font-bold mb-2">TITLE OF THE VOTE</h2>
            <input
              className="bg-white rounded-lg p-2
                    border-[1px] border-[#93278F] 
                    w-full outline-none"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="TITLE"
              required
            />
            <h2 className="font-bold mb-2">DESCRIPTION</h2>
            <input
              className="bg-white rounded-lg p-4  my-3
                    border-[1px] border-[#93278F] 
                    w-full outline-none"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="DESCRIPTION"
              required
            />
            <h2 className="font-bold mb-2">Name of the Organization</h2>
            <input
              className="bg-white rounded-lg p-2
                    border-[1px] border-[#93278F] 
                    w-full outline-none"
              type="text"
              name="orgName"
              value={formData.orgName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex my-10 ">
            <button
              type="button"
              className="
                        rounded-xl px-8 py-3 mr-1 text-[#93278F] 
                        font-semibold border-[1px] border-[#93278F]
                        hover:bg-[#93278F] hover:text-white"
              onClick={() => setShowModalOne(true)}
            >
              Add Candidate
            </button>

            <button type="button"
              className="
                        rounded-xl px-8 py-3 text-[#93278F] 
                        font-semibold border-[1px] border-[#93278F]
                        hover:bg-[#93278F] hover:text-white"
              onClick={() => setShowModalTwo(true)}
            >
              Voting Duration
            </button>
          </div>

          <button
            className="bg-[#93278F]
                    rounded-xl px-9 py-3 text-white font-semibold"
            onClick={() => router.push("/adminDashboard")}
          >
            Create Vote
          </button>
        </form>
        <Dialog
          open={showModalOne}
          PaperProps={{ style: customStyle }}
          onClose={() => setShowModalOne(false)}
        >
          <FormCard />
        </Dialog>

        <MuiModal open={showModalTwo} onClose={() => setShowModalTwo(false)}>
          <form onSubmit={handleModalTwoSubmit}>
            <div className="flex justify-center items-center h-screen">
              <div className="bg-white rounded-lg w-[500px] p-8">
                <svg
                  className="absolute top-[15rem] w-6 h-6 right-[32rem] mt-4 mr-4 cursor-pointer"
                  onClick={() => setShowModalTwo(false)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 
                        0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3
                         265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
                  />
                </svg>
                <h1 className="font-bold text-2xl">Voting Duration</h1>
                <div className="flex flex-col mt-5">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      className="
                                rounded-xl px-8 py-3 mr-1 text-[#93278F] 
                                font-semibold border-[1px] border-[#93278F]"
                      label="Set Time"
                      value={dateValue}
                      onChange={handleDateChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>

                  <button type="button"
                    className="bg-[#93278F]
                            rounded-xl px-9 py-3 text-white font-semibold mt-4"
                            onClick={() => {setShowModalTwo(false) 
                              toast.success("Duration Set Successfully")}}
                  >
                    Set Duration
                  </button>
                </div>
              </div>
            </div>
          </form>
        </MuiModal>
      </div>
    </div>
  );
}

export default create_vote;