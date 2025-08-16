import React, { useEffect, useState } from 'react';

// --- Configuration ---
const DROP_TOKEN_ADDRESS = 0xcc4cd134a11dae5f2d89be3ede86a6675ccb9db6f03476de769260652646341f; 
const SERVER_URL = "http://localhost:3001"; 

function App() {
  const [supraProvider, setSupraProvider] = useState<any>(null);
  const [isStarkeyInstalled, setIsStarkeyInstalled] = useState<boolean>(false);
  const [userWalletAddress, setUserWalletAddress] = useState<string | null>(null);
  
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any)?.starkey) {
        setSupraProvider((window as any).starkey.supra);
        setIsStarkeyInstalled(true);
    }
  }, []);

  const connectWallet = async () => {
    if (!supraProvider) return;
    try {
      const response = await supraProvider.connect();
      if (response && response.length > 0) {
        setUserWalletAddress(response[0]);
      }
    } catch (e) { console.error("Wallet connection failed:", e); }
  };
  
  const disconnectWallet = async () => {
      if (!supraProvider) return;
      try {
        await supraProvider.disconnect();
        setUserWalletAddress(null);
      } catch(e) { console.error("Disconnect failed:", e); }
  };

  const handleReceiptUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !userWalletAddress) {
      alert("Please connect your wallet and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append('receipt', file);
    formData.append('userAddress', userWalletAddress);

    try {
      alert("Uploading receipt...");
      const response = await fetch(`${SERVER_URL}/upload-receipt`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      alert("Error: " + (error as Error).message);
    }
  };

  return (
    <div>
      <h1>Dropify Rewards</h1>
      {!isStarkeyInstalled ? (
        <p>Please install the StarKey wallet to use this application.</p>
      ) : (
        <div>
          {userWalletAddress ? (
            <div>
              <p>Connected: {userWalletAddress.substring(0, 6)}...{userWalletAddress.substring(userWalletAddress.length - 4)}</p>
              <button onClick={disconnectWallet}>Disconnect Wallet</button>
              <hr />
              <h3>Upload Your Receipt to Earn $DROP Tokens</h3>
              <input type="file" accept="image/*" onChange={handleReceiptUpload} />
            </div>
          ) : (
            <button onClick={connectWallet}>Connect StarKey Wallet</button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;