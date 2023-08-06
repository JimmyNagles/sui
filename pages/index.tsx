import Image from "next/image";
import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import { ethos, SignInButton, EthosConnectStatus } from "ethos-connect";

const Home: React.FC = () => {
  const router = useRouter();
  const { status, wallet } = ethos.useWallet();

  const [amount, setAmount] = useState<number>(0);
  const [receiver, setReceiver] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleReceiverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReceiver(event.target.value);
  };

  const handleSendMoney = () => {
    if (balance >= amount) {
      setBalance(balance - amount);
      alert(`Sent ${amount} to ${receiver}`);
    } else {
      alert("Insufficient balance");
    }
  };

  return (
    <div
      className={
        "min-h-screen bg-blue-900 flex flex-col justify-center items-center "
      }
    >
      <div className="h-[200px] flex flex-col justify-center items-center ">
        <h1 className="text-6xl text-white ">SuiPay</h1>
      </div>

      {status === EthosConnectStatus.Loading ? (
        <div>Loading...</div>
      ) : status === EthosConnectStatus.NoConnection ? (
        <div className="text-white flex flex-col justify-center items-center">
          <SignInButton className="p-2 mb-2 bg-blue-700 shadow-inner bg-opacity-0  hover:bg-opacity-80 hover:shadow-2xl transition-all duration-1000 ease-in w-[200px] text-white border rounded-md" />
          No wallet connected
        </div>
      ) : (
        // status is EthosConnectStatus.Connected
        <div className="flex flex-col justify-center">
          <div className="flex flex-row-reverse">
            <button
              className="p-2 mb-2 bg-blue-700 shadow-inner bg-opacity-0  hover:bg-opacity-80 hover:shadow-2xl transition-all duration-1000 ease-in w-[200px] text-white border rounded-md"
              onClick={wallet && wallet.disconnect}
            >
              Sign Out
            </button>
          </div>
          <div className="text-white mt-2">My address: {wallet?.address}</div>
          <h1 className=" text-white text-3xl ">My balance:</h1>
          <h1 className=" text-white mt-2 mb-2">Enter address to send money</h1>
          <input
            className="p-2"
            placeholder="Enter receiver's address"
            value={receiver}
            onChange={handleReceiverChange}
          />
          <h1 className="p-2 text-white">Enter amount</h1>
          <input
            className="p-2"
            placeholder="Enter amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
          />
          <button
            className="p-2 mt-4 bg-blue-700 shadow-inner bg-opacity-0  hover:bg-opacity-80 hover:shadow-2xl transition-all duration-1000 ease-in w-[200px] text-white border rounded-md"
            onClick={handleSendMoney}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
