import { useState, useEffect } from "react";
const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

    useEffect(() => {
      const memosMessage = async () => {
        const memos = await contract.getVotes();
        setMemos(memos);
        console.log(memos);
      };
      contract && memosMessage();
    }, [contract]);

  return (
    <>
     
    </>
  );
};
export default Memos;
