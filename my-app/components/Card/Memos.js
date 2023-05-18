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
      <p >Messages</p>
      {memos.map((memo) => {
        return (
          <div>
              <p>
                {memo.name}
                {memo.indx}
              </p><br/>
          </div>
        );
      })}
    </>
  );
};
export default Memos;
