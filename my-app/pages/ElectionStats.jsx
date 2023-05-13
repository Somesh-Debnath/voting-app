import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';

function ElectionStats() {

const candidates = [
    { name: 'Candidate 1', votes: 1000, color: '#0088FE' },
    { name: 'Candidate 2', votes: 750, color: '#00C49F' },
    { name: 'Candidate 3', votes: 500, color: '#FFBB28' },
    { name: 'Candidate 4', votes: 250, color: '#FF8042' }
  ];

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
          
          <div className="flex fixed space-x-1 top-5 z-50 right-8">
            <h3>avatar</h3>
            <h3>--name</h3>
          </div>
        </div>

    <Card variant="outlined">
      <CardContent className='mt-[7%]'>
        <Typography variant="h5" component="h2" gutterBottom>
          Election Stats
        </Typography>
        <Grid container spacing={3}>
          {candidates.map((candidate) => (
            <Grid item xs={12} key={candidate.name}>
              <Typography variant="h6" component="p">
                {candidate.name}
              </Typography>
              <Typography variant="subtitle1" component="p">
                {candidate.votes} votes ({((candidate.votes / totalVotes) * 100).toFixed(2)}%)
              </Typography>
              <LinearProgress variant="determinate" value={(candidate.votes / totalVotes) * 100} style={{ backgroundColor: '#e0e0e0' }}>
                <span style={{ color: candidate.color }}>{((candidate.votes / totalVotes) * 100).toFixed(2)}%</span>
              </LinearProgress>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>

        
        
          
        </div>
      </div>
  )
}

export default ElectionStats