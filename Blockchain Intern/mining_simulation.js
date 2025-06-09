const crypto = require('crypto');
class Block {
    constructor(index, data, previousHash = '') {
        this.index = index;
        this.timestamp = new Date().toISOString(); 
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        const content = `${this.index}${this.timestamp}${this.data}${this.previousHash}${this.nonce}`;
        return crypto.createHash('sha256').update(content).digest('hex');
    }

    mineBlock(difficulty) {
        console.log(`🌱 Starting to mine block with difficulty ${difficulty}...`);
        const target = '0'.repeat(difficulty);
        const startTime = Date.now();

        let attempts = 0;
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce += 1;
            attempts += 1;
            this.hash = this.calculateHash();
        }

        const endTime = Date.now();
        const timeTaken = (endTime - startTime) / 1000;
        const reward = attempts * 0.01; 
        console.log(`Block mined successfully: ${this.hash}`);
        console.log(`⏳ Time taken: ${timeTaken.toFixed(4)} seconds | Attempts: ${attempts} | Reward: ${reward.toFixed(2)} units`);
        this.displayBlock();
    }

    displayBlock() {
        console.log(`Block Details:
  Index: ${this.index}
  Timestamp: ${this.timestamp}
  Data: ${this.data}
  Previous Hash: ${this.previousHash}
  Hash: ${this.hash}
  Nonce: ${this.nonce}`);
    }
}
const difficulty = 5; 
const block = new Block(1, "Transaction: X -> Y (₹150)", "0000abcdef");
console.log(`Mining started at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
block.mineBlock(difficulty);