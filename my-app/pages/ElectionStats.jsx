import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, getFirestore, onSnapshot, query, setDoc } from 'firebase/firestore'

import Sidebar from '../components/Sidebar/Sidebar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import { db } from '../utils/Firebase';
import { Divider } from '@mui/material';

function ElectionStats() {

  const [open, setOpen] = useState(false);
  const [winner, setWinner] = useState("");
  const handleOpen = () => {
    setOpen(true)
    candidates.forEach((candidate) => {
      if(candidate.votes == maxVotes) {
        console.log("working")
        setWinner(candidate.name)
      }
    })
  };
  const handleClose = () => setOpen(false);
  const [cardDetails, setCardDetails] = useState([]);
  const [elections,setElections]=useState([]);

  //Modal styles
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  //fetch candidate details
  const electionQuery=collection(db,'Elections');
  useEffect(()=>{
   
    const getElections=async()=>{
      const getElections=await getDocs(electionQuery);
      const elections = getElections.docs.map((doc)=>({
        ...doc.data(), id:doc.id
    }))
      setElections(elections);
      elections.map(async (election)=>{
        const getCandidates=await getDocs(collection(db,'Elections',election.id,'Candidates'));
        const candidates = getCandidates.docs.map((doc)=>({
          ...doc.data(), id:doc.id
      }))
      setCardDetails(candidates);
    })
    }
    getElections();
  },[])

  const candidates = cardDetails.map((can) => ({
    name: can.Name,
    votes: can.count.length
  }));

  const votesArray = candidates.map((candidate) => candidate.votes);
  const maxVotes = Math.max(...votesArray);
  console.log(maxVotes)

  // Calculate total votes
  const totalVotes = candidates.reduce((acc, curr) => acc + curr.votes, 0);

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
        </div>

    <Card variant="outlined" sx={{overflow: "auto"}}>
      <CardContent className='mt-[7%]' sx={{ml: "20px"}}>
        <Typography variant="h3" component="h2" sx={{ color:"#93278F", fontWeight: "bold", mb:"20px", mt:"20px"}} gutterBottom>
          Election Stats
        </Typography>
        <Divider />
        <Typography variant="h4" component="h2" sx={{ color:"#93278F", fontWeight: "bold", mb:"40px", mt:"20px"}} gutterBottom>
          {elections[0]?.title}
        </Typography>
        <Grid container spacing={3}>
          {candidates.map((candidate) => (
            <Grid item xs={12} key={candidate.name}>
              <Typography variant="h6" component="p" sx={{color: "#2F0745", fontWeight: "bold"}}>
                {candidate.name}
              </Typography>
              <Typography variant="subtitle1" component="p">
                {candidate.votes} votes ({((candidate.votes / totalVotes) * 100).toFixed(2)}%)
              </Typography>
              <LinearProgress variant="determinate" color="secondary" value={(candidate.votes / totalVotes) * 100} style={{ backgroundColor: '#e0e0e0', height:"15px" }}>
                <span style={{ color: candidate.color }}>{((candidate.votes / totalVotes) * 100).toFixed(2)}%</span>
              </LinearProgress>
            </Grid>
          ))}
        </Grid>
      </CardContent>
      
      <Box textAlign="center">
      <Button onClick={handleOpen} class="bg-[#93278F] text-white px-10 py-4
        hover:bg-[#5c0f59] text-lg rounded-2xl m-[25px]">View Results</Button>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h4" component="h2" sx={{ color:"#93278F", fontWeight: "bold", mb:"40px"}} gutterBottom>
              Winner!!
            </Typography>
            <Typography id="transition-modal-description" variant="h6" component="p" sx={{color: "#2F0745", fontWeight: "bold"}}>
              {winner.toUpperCase()} candidate with {maxVotes} votes
            </Typography>
          </Box>
        </Fade>
      </Modal>

    </Card>

        
        
          
        </div>
      </div>
  )
}

export default ElectionStats