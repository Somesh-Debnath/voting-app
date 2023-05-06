import { addDoc, collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { produce } from "immer";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { db } from "../../utils/Firebase";
import { AppContext, AppContextType } from "../../pages/_app";



//import constants from '../../constants';

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
  const {cardDetails, setCardDetails} = useContext(AppContext) as AppContextType;
  // const {formContext, setFormContext} = useContext(AppContext);
  //console.log(cardDetails);
  let ct: number = 0;
  const router=useRouter()
  
// const web3ModalRef=useRef<Web3Modal>(new Web3Modal())
//   const getProviderOrSigner = async (needSigner = false) => {
//     const provider = await web3ModalRef.current.connect();
//     const web3Provider = new providers.Web3Provider(provider);

//      // If user is not connected to the Goerli network, let them know and throw an error
//      const { chainId } = await web3Provider.getNetwork();
//      if (chainId !== 5) {
//        window.alert("Change the network to Goerli");
//        throw new Error("Change network to Goerli");
//      }
 
//      if (needSigner) {
//        const signer = web3Provider.getSigner();
//        return signer;
//      }
//      return web3Provider;
//    };

//   const addCandidate = async (e: any) => {
//     e.preventDefault();
//     try {
//       const signer = await getProviderOrSigner(true);
//       const contract = new Contract(
//         constants.contractAddress,
//         constants.contractABI,
//         signer
//       );
//       const tx = await contract.addCandidate({
//         name: cardDetails[0].Name,
//         email: cardDetails[0].email,
//         role: cardDetails[0].role,
//       });
//       await tx.wait();
//       alert("Candidate added successfully");
//     } catch (err) {
//       console.log(err);
//     }
//   };
  
 
  //console.log(people[0].id)
function addCount(){
    ct=count+1
    setCount(ct)
    return ct
  }

  async function handleClick(){
    setCardDetails(people)
  }


  return (
    <div className=" w-full flex flex-col items-center justify-center overflow-auto">
      <h1 className='font-bold text-2xl'>Add Candidates</h1>
      {people.map((p, index) => {
        return (
          <div key={p.id}>
            <input
            className="bg-white rounded-lg py-2 px-5
            border-[1px] border-[#93278F] my-5 mx-2
            w-[150px] outline-none"
              onChange={e => {
                const Name = e.target.value;
                setPeople(currentPeople =>
                  produce(currentPeople, v => {
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
              onChange={e => {
                const email= e.target.value;
                setPeople(currentPeople =>
                  produce(currentPeople, v => {
                    v[index].Email= email;
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
              onChange={e => {
                const role= e.target.value;
                setPeople(currentPeople =>
                  produce(currentPeople, v => {
                    v[index].Role= role;
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
              onChange={e => {
                const image= e.target.value;
                setPeople(currentPeople =>
                  produce(currentPeople, v => {
                    v[index].Image=image;
                  })
                );
              }}
              value={p.Image}
              placeholder="image"
            />
            <button
              onClick={() => {
                setPeople(currentPeople =>
                  currentPeople.filter(x => x.id !== p.id)
                );
              }}
            >
              x
            </button>
          </div>
        );
      })}
   
    
   <div className="flex space-x-7">
    <button className="bg-[#93278F]
        rounded-xl px-9 py-3 text-white font-semibold mt-4"
            onClick={() => {
              setPeople(currentPeople => [
                ...currentPeople,
                {
                  id:addCount(),
                  Name: "",
                  Email: "",
                  Role: "",
                  Image: "",
                }
              ]);
            }}
          >
            add new Candidate
    </button>

    <button 
    onClick={()=>{handleClick()}}
    className="bg-[#93278F]
    rounded-xl px-9 py-3 text-white font-semibold mt-4">
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