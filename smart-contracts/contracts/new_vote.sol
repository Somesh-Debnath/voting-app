// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract new_vote {
    struct Vote {
        string voterName;
        string candidateId;
        uint256 timestamp;
        address voterWalletAddress;
    }

    Vote[] votes;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function giveVote(string memory voterName, string memory candidateId) public payable {
        require(msg.sender.balance > 0, "You do not have enough balance to vote");
        votes.push(Vote(voterName, candidateId, block.timestamp, msg.sender));
    }

    function getVotes() public view returns (Vote[] memory) {
        return votes;
    }

    //get vote count by candidate id function
    function getCountOfVotes(string memory candidateId) public view returns (uint256) {
        uint count = 0;
        for(uint i = 0; i < votes.length; i++){
            if(keccak256(abi.encodePacked(votes[i].candidateId)) == keccak256(abi.encodePacked(candidateId))){
                count++;
            }
        }
        return count;
    }
}
