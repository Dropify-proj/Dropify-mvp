import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import { ethers } from 'ethers';

dotenv.config();
const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(cors());
app.use(express.json());

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const serverWallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractABI = ["function mint(address to, uint256 amount)"];

app.post('/upload-receipt', upload.single('receipt'), async (req, res) => {
    const { userAddress } = req.body;
    const contractAddress = process.env.DROP_TOKEN_ADDRESS;
    if (!req.file || !userAddress || !contractAddress) return res.status(400).json({ message: "Missing data." });
    try {
        const dropTokenContract = new ethers.Contract(contractAddress, contractABI, serverWallet);
        const rewardAmount = ethers.utils.parseUnits("100", 18);
        const tx = await dropTokenContract.mint(userAddress, rewardAmount);
        await tx.wait(); 
        res.status(200).json({ message: `Success! You've been awarded 100 $DROP.` });
    } catch (error) {
        console.error("Transaction failed:", error);
        res.status(500).json({ message: "An error occurred." });
    }
});
const port = 3001;
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));