import { produce } from "immer";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface Person {
  id: number;
  Name: string;
  email: string;
  role: string;
}

const FormCard = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [count, setCount] = useState<number>(0);
  const [cardDetails, setCardDetails] = useState<Person[]>([]);
  let ct: number = 0;
  const router=useRouter()
 
 
  //console.log(people[0].id)

   const addCount:number=()=>{
    ct=count+1
    setCount(ct)
    return ct
  }
  return (
    <div className=" max-w-[500px] flex flex-col items-center justify-center overflow-auto">
      <h1 className='font-bold text-2xl'>Add Candidates</h1>
      {people.map((p, index) => {
        return (
          <div key={p.id}>
            <input
            className="bg-white rounded-lg py-2 px-5
            border-[1px] border-[#93278F] my-5 mx-10
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
            border-[1px] border-[#93278F] my-5 mx-10
            w-[150px] outline-none"
              onChange={e => {
                const email= e.target.value;
                setPeople(currentPeople =>
                  produce(currentPeople, v => {
                    v[index].email= email;
                  })
                );
              }}
              value={p.email}
              placeholder="email"
            />
              <input
            className="bg-white rounded-lg py-2 px-5
            border-[1px] border-[#93278F] my-5 mx-10
            w-[150px] outline-none"
              onChange={e => {
                const role= e.target.value;
                setPeople(currentPeople =>
                  produce(currentPeople, v => {
                    v[index].role= role;
                  })
                );
              }}
              value={p.role}
              placeholder="role"
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
                  email: "",
                  role: ""
                }
              ]);
            }}
          >
            add new Candidate
    </button>

    <button 
    onClick={()=>{router.push('/CreateElection')
  localStorage.setItem('people',JSON.stringify(people))}}
    className="bg-[#93278F]
    rounded-xl px-9 py-3 text-white font-semibold mt-4">
      Submit Details
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