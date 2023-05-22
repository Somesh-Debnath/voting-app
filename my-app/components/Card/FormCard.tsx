import { getStorage, ref, uploadBytes } from "firebase/storage";
import { produce } from "immer";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { db } from "../../utils/Firebase";
import { AppContext, AppContextType } from "../../pages/_app";
import { toast, Toaster } from "react-hot-toast";

export interface Person {
  id: number;
  Name: string;
  Email: string;
  Role: string;
  Image: string;
}

const FormCard = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [count, setCount] = useState<number>(0);
  const { cardDetails, setCardDetails } = useContext(
    AppContext
  ) as AppContextType;
  // const {formContext, setFormContext} = useContext(AppContext);
  //console.log(cardDetails);
  let ct: number = 0;
  const router = useRouter();

  function addCount() {
    ct = count + 1;
    setCount(ct);
    return ct;
  }

  async function handleClick() {
    setCardDetails(people);
    toast.success("Candidates Added Successfully");
  }

  return (
    <div className=" w-full flex flex-col items-center justify-center overflow-auto">
      <div><Toaster/></div>
      <h1 className="font-bold text-2xl">Add Candidates</h1>
      {people.map((p, index) => {
        return (
          <div key={p.id}>
            <input
              className="bg-white rounded-lg py-2 px-5
            border-[1px] border-[#93278F] my-5 mx-2
            w-[150px] outline-none"
              onChange={(e) => {
                const Name = e.target.value;
                setPeople((currentPeople) =>
                  produce(currentPeople, (v) => {
                    v[index].Name = Name;
                  })
                );
              }}
              value={p.Name}
              placeholder="name"
            />
            <input
              className="bg-white rounded-lg py-2 px-5
            border-[1px] border-[#93278F] my-5 mx-2
            w-[150px] outline-none"
              onChange={(e) => {
                const email = e.target.value;
                setPeople((currentPeople) =>
                  produce(currentPeople, (v) => {
                    v[index].Email = email;
                  })
                );
              }}
              type="email"
              value={p.Email}
              placeholder="email"
            />
            <input
              className="bg-white rounded-lg py-2 px-5
            border-[1px] border-[#93278F] my-5 mx-2
            w-[150px] outline-none"
              onChange={(e) => {
                const role = e.target.value;
                setPeople((currentPeople) =>
                  produce(currentPeople, (v) => {
                    v[index].Role = role;
                  })
                );
              }}
              value={p.Role}
              placeholder="role"
            />
            <input
              className=""
              type="file"
              accept="image/*"
              name="Image"
              onChange={(e) => {
                //use firebase storage to store the image
                // const storage=getStorage();
                // const file=e.target.files[0];
                // console.log(file);
                // const storageRef=ref(storage,file.name);
                // uploadBytes(storageRef,file);
                 const image = e.target.value;

                setPeople((currentPeople) =>
                  produce(currentPeople, (v) => {
                    v[index].Image = image;
                  })
                );
              }}
              value={p.Image}
              placeholder="image"
            />
            <button
              onClick={() => {
                setPeople((currentPeople) =>
                  currentPeople.filter((x) => x.id !== p.id)
                );
              }}
            >
              x
            </button>
          </div>
        );
      })}

      <div className="flex space-x-7">
        <button
          className="bg-[#93278F]
        rounded-xl px-9 py-3 text-white font-semibold mt-4"
          onClick={() => {
            setPeople((currentPeople) => [
              ...currentPeople,
              {
                id: addCount(),
                Name: "",
                Email: "",
                Role: "",
                Image: "",
              },
            ]);
          }}
        >
          add new Candidate
        </button>

        <button
          onClick={() => {
            handleClick();
            toast.success("Candidates Added Successfully");
          }}
          className="bg-[#93278F]
    rounded-xl px-9 py-3 text-white font-semibold mt-4"

        >
          Submit Details
          {/* add toast  - https://react-hot-toast.com/*/}
         
        </button>
      </div>

      {/* //{console.log(people)} */}
    </div>
  );
};

// async function uploadToIpfs({people}:any) {
//   await Moralis.start({
//     apiKey:"T1N5ArJ8yIttp9qeTgB5RiQYgL6H2QeijOIu14cY7QooTKoyRCcTb39dRWdnAnrR"
//   });

//   const uploadArray = people.map((person: any,id:number) => {
//   path:string:"person.id";
//   content:string: JSON.stringify(person)
//   });

//   const response=await Moralis.EvmApi.ipfs.uploadFolder({
//     abi:uploadArray,
//   })
// }

export default FormCard;
