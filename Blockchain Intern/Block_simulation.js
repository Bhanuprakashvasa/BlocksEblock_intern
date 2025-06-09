const crypto = require('crypto');
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        const content = `${this.index}${this.timestamp}${this.data}${this.previousHash}${this.nonce}`;
        return crypto.createHash('sha256').update(content).digest('hex');
    }

    toString() {
        return `Block ${this.index}:\nData: ${this.data}\nHash: ${this.hash}\nPreviousHash: ${this.previousHash}\n`;
    }
}

const blockchain = [];
function createGenesisBlock() {
    return new Block(0, new Date().toUTCString(), 'Genesis Block', '0');
}
function createNextBlock(previousBlock, data) {
    return new Block(previousBlock.index + 1, new Date().toUTCString(), data, previousBlock.hash);
}
blockchain.push(createGenesisBlock());
blockchain.push(createNextBlock(blockchain[blockchain.length - 1], 'Block 1 Data'));
blockchain.push(createNextBlock(blockchain[blockchain.length - 1], 'Block 2 Data'));
// Display blocks
console.log("Initial Blockchain:");
for (const block of blockchain) {
    console.log(block.toString());
}
// Tamper Block 1
console.log("\n--- Tampering Block 1 ---\n");
blockchain[1].data = "Tampered Data";
blockchain[1].hash = blockchain[1].calculateHash();
// Re-check the chain
console.log("Tampered Blockchain:");
for (const block of blockchain) {
    console.log(block.toString());
}