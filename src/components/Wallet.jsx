import React, { useState } from "react";
import Web3 from "web3";

const Wallet = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [showBalance, setShowBalance] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        const balance = await web3.eth.getBalance(accounts[0]);
        setBalance(web3.utils.fromWei(balance, "ether"));
        setShowBalance(true);
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Wallet Connector
        </h1>
        {/* Render Connect Wallet button only if account is not set */}
        {!account && (
          <button
            onClick={connectWallet}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            Connect Wallet
          </button>
        )}

        {showBalance && account && (
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold text-gray-800">Account:</p>
            <p className="text-gray-600 break-all">{account}</p>
            <p className="mt-4 text-lg font-semibold text-gray-800">Balance:</p>
            <p className="text-gray-600">{balance} ETH</p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <p className="text-center text-slate-200 text-base px-4">
          Connect your MetaMask wallet to fetch your Ethereum balance. The
          balance is retrieved directly from your wallet via MetaMask.
        </p>
      </div>
    </div>
  );
};

export default Wallet;
