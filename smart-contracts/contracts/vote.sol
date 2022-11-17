// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Vote {
    
    struct Voter {
        uint weight; // weight is accumulated by delegation
        bool voted;  
        uint vote;   // index of the voted proposal
    }


    struct Candidate {
        string name; 
        string email;
        string role;
        uint256 id;
        uint256 voteCount;
        //uint voteCount; // number of accumulated votes
    }

  struct Election{
     Candidate [] candidatesDetails;
     string title;
     string description;
     string org;
  }

  Election[] public elections;

    address public admin;
    uint public test;
    
    mapping(address => Voter) public voters;
    voters [] public votersDetails;

    Candidate[] public candidates;
    mapping(uint256 => Candidate) public candidatesDetail;

    /// Create a new ballot to choose one of `proposalNames`.
    constructor() {
        admin = msg.sender;
        voters[admin].weight = 1;
    }
        
    //     for (uint i = 0; i < proposalNames.length; i++) {
          
    //         candidates.push(Proposal({
    //             name: proposalNames[i],
    //             voteCount: 0
    //         }));
    //     }
    // }

   function addCandidate(string memory _name,string memory _email,string memory _role,uint256 _id)  public {
       Candidate memory newCandidate=Candidate({
           name:_name,
           email:_email,
           role:_role,
           id:_id,
           voteCount:0
       });
       candidates.push(newCandidate);
        candidatesDetail[_id]=newCandidate;
  }

//     function getCandidates() public view returns(Candidate[] memory){
//        return candidates;
//    }
         
   
   function createVote(string memory _title, string memory _description,string memory _org) public {
    for(uint i=0;i<candidates.length;i++){
              Election.candidatesDetails.push(candidates[i]);
         }
          Election memory newElection=Election({
                 //add candidate details
              candidatesDetails: candidatesDetail,
               title:_title,
               description:_description,
               org:_org
           });
           elections.push(newElection);
          
      }
   
   
    function giveRightToVote(address[] memory Voters) external {
        for(uint i=0;i<Voters.length;i++){
             require(
            msg.sender == admin,
            "Only admin can give right to vote."
        );
        require(
            !Voters[i].voted,
            "The voter already voted."
        );
            voters[Voters[i]].weight = 1;
        }
       
       
    }

 


    function vote(uint id) external {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = id;

       
        candidates[id].voteCount += sender.weight;
    }

    
    function winningCandidate() public view
    returns (string memory winnerName_)
    {
        uint winningVoteCount = 0;
        uint256 winningId=0;
        for (uint p = 0; p < candidates.length; p++) {
            if (candidates[p].voteCount > winningVoteCount) {
                winningVoteCount = candidates[p].voteCount;
                winningId = p;
            }
        }
         winnerName_ = candidates[winningId].name;
    }

    
}
