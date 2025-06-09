const crypto = require('crypto');
const powValidators = Array.from({ length: 5 }, (_, i) => ({
    id: `Miner${i}`,
    power: Math.floor(Math.random() * 100) + 1
}));
const powWinner = powValidators.reduce((max, curr) => max.power > curr.power ? max : curr, powValidators[0]);
console.log("\nProof of Work Winner:");
console.log(powWinner);
console.log(`Selected based on highest computational power: ${powWinner.power}`);
console.log(`Description: Miner ${powWinner.id} will validate the next block with power ${powWinner.power}.`);

const posValidators = Array.from({ length: 5 }, (_, i) => ({
    id: `Staker${i}`,
    stake: Math.floor(Math.random() * 1000) + 1 
}));
const posWinner = posValidators.reduce((max, curr) => max.stake > curr.stake ? max : curr, posValidators[0]);
console.log("\nProof of Stake Winner:");
console.log(posWinner);
console.log(`Selected based on highest stake: ${posWinner.stake}`);
console.log(`Description: Staker ${posWinner.id} will validate with a stake of ${posWinner.stake} coins.`);

const dposCandidates = ['Tarun', 'Mahesh', 'Majid', 'Rampandu', 'Bhanu']; 
const votes = Array.from({ length: 15 }, () => dposCandidates[Math.floor(Math.random() * dposCandidates.length)]); // Increased votes to 15
const voteCounts = dposCandidates.reduce((counts, candidate) => ({
    ...counts,
    [candidate]: votes.filter(v => v === candidate).length
}), {});
const dposWinner = Object.keys(voteCounts).reduce((a, b) => voteCounts[a] > voteCounts[b] ? a : b);
console.log("\nDelegated Proof of Stake Winner:");
console.log(dposWinner);
console.log(`Selected based on most community votes: ${voteCounts[dposWinner]}`);
console.log(`Description: ${dposWinner} will serve as a delegate with ${voteCounts[dposWinner]} votes.`);
