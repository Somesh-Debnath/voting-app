import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, getFirestore, onSnapshot, query, setDoc } from 'firebase/firestore'

import Sidebar from '../components/Sidebar/Sidebar';
import AdminSidebar from '../components/Sidebar/AdminSidebar';
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
import Avatar from 'react-avatar';


import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

import {Doughnut} from 'react-chartjs-2'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

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

  //Modal styles
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid #2F0745',
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  //fetch candidate details

  const [cardDetails, setCardDetails] = useState([]);
  const [elections,setElections]=useState([]);

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
  const candidateArray = candidates.map((candidate) => candidate.name);
  const maxVotes = Math.max(...votesArray);
  console.log(maxVotes)

  // Calculate total votes
  const totalVotes = candidates.reduce((acc, curr) => acc + curr.votes, 0);

  //chartjs

  const getRandomVioletColor = () => {
    const minHue = 260; // Minimum hue for violet
    const maxHue = 300; // Maximum hue for violet
    const saturation = Math.floor(Math.random() * 51) + 50; // Random saturation value between 50 and 100
    const lightness = Math.floor(Math.random() * 21) + 40; // Random lightness value between 40 and 60
    const hue = Math.floor(Math.random() * (maxHue - minHue + 1)) + minHue; // Random hue value within the violet range
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };
  
  const data = {
    labels: candidateArray,
    datasets: [{
      label: 'Votes',
      data: votesArray,
      backgroundColor: candidateArray.map(() => getRandomVioletColor()),
      borderColor: ['#93278F']
    }]
    
  }

  const options = {
    responsive: true
  }

  return (
    <div className="flex w-screen m-0  h-screen">
      <AdminSidebar />
      <div className="flex flex-col w-screen ml-[183px] z-50">
        <div
          className="px-8 py-4 shadow-lg max-h-[80px] fixed 
          top-0 z-40  w-full flex  bg-opacity-100"
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
        <div className="flex fixed space-x-1 top-5 z-50 right-8">
          <Avatar
              name="A D M I N"
              size="40"
              round={true}
              style={{ fontSize: '50px' }}
            />
          </div>

    <Card variant="outlined" sx={{overflow: "auto"}}>
      <CardContent className='mt-[7%]' sx={{ml: "20px"}}>
        <Typography variant="h4" component="h2" align = "center" sx={{ color:"#93278F", fontWeight: "bold"}} gutterBottom>
          Election Stats
        </Typography>
        <Divider />
        <Typography variant="h6" component="h2" align = "center" sx={{ color:"#2F0745", fontWeight: "bold", mt:"10px", mb: "20px"}} gutterBottom>
          {elections[0]?.title}
        </Typography>
        {/* <Grid container spacing={3}>
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
        </Grid> */}
      <div style={{width: "30%", height: "30%", margin: "0 auto", paddingLeft: "40px"}}>
        <Doughnut
          data={data}
          options={options}
        >

        </Doughnut>
      </div>

      </CardContent>
      
      <Box textAlign="center">
      <Button onClick={handleOpen} class="bg-[#93278F] text-white px-8 py-3
        hover:bg-[#5c0f59] text-sm rounded-xl ml-16 m-6">View Results</Button>
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
            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ color:"#93278F", fontWeight: "bold", mb:"20px"}} gutterBottom>
              Winner!!
            </Typography>
            <Typography id="transition-modal-description" variant="subtitle-1" component="p" sx={{color: "#2F0745", fontWeight: "bold"}}>
              Candidate {winner.toUpperCase()} with {maxVotes} votes
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