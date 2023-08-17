import Image from "next/image";
import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import { ethos, SignInButton, EthosConnectStatus } from "ethos-connect";
import Tabs from "../components/Tabs/Tabs";
import FadeIn from "../components/animations/FadeIn";
import SlideIn from "../components/animations/SlideIn";

const Home: React.FC = () => {
  const router = useRouter();
  const contractAddress =
    "0x1cbfdf7de5004f887705fa53bb345d4372e5004bd8b04a6f8868f5e1ca1af9c7";

  const { status, wallet } = ethos.useWallet();

  console.log(wallet);

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

  const tabs = [
    {
      title: "Home",
      content: (
        <div>
          <SlideIn direction="right">
            <div className="w-full h-[500px] flex flex-col justify-center">
              <div className="text-white mt-2">
                My address: {wallet?.address}
              </div>
              <div className="text-white mt-2">Wallet Name {wallet?.name}</div>

              <h1 className=" text-white text-3xl ">
                My balance:
                {wallet?.contents && wallet.contents.suiBalance.toString()}
              </h1>
              <h1 className=" text-white mt-2 mb-2">
                Enter address to send money
              </h1>
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
                className="p-2 mt-4 bg-blue-900 shadow-inner bg-opacity-0  hover:bg-opacity-80 hover:shadow-2xl transition-all duration-1000 ease-in w-[200px] text-white border rounded-md"
                onClick={handleSendMoney}
              >
                Send
              </button>
            </div>
          </SlideIn>
        </div>
      ),
    },
    {
      title: "Cards",
      content: (
        <FadeIn>
          <h1>TEXT B</h1>
        </FadeIn>
      ),
    },
    {
      title: "Profile",
      content: (
        <FadeIn>
          <SlideIn direction="left">
            <h1>TEXT C</h1>
          </SlideIn>
        </FadeIn>
      ),
    },
  ];

  const renderButton = () => {
    // If wallet is not connected, return a button which allows them to connect their wallet
    if (!wallet) {
      return (
        <div className="text-white flex flex-col justify-center items-center">
          <div className="h-[150px]">
            <h1 className="tex-2xl">Welcome To</h1>
            <h1 className="text-6xl text-white ">SuiPay</h1>
          </div>

          <div className="text-white flex flex-col justify-center items-center">
            <h1 className=" mb-4">No wallet connected</h1>
            <SignInButton className="p-2 mb-2 bg-blue-900 border-white  shadow-inner bg-opacity-0  hover:bg-opacity-80 hover:shadow-2xl transition-all duration-1000 ease-in w-[200px] text-white  rounded-md" />
          </div>
        </div>
      );
    }

    // If we are currently waiting for something, return a loading button
    if (status === EthosConnectStatus.Loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="flex flex-col justify-center min-h-screen mb-60">
        {/* <div className="flex flex-row-reverse">
          <button
            className="p-2 mb-2 bg-blue-900 shadow-inner bg-opacity-0  hover:bg-opacity-80 hover:shadow-2xl transition-all duration-1000 ease-in w-[200px] text-white border rounded-md"
            onClick={wallet && wallet.disconnect}
          >
            Sign Out
          </button>
        </div> */}

        <div className="mt-40"></div>

        <div className="w-full h-full  p-2">
          <Tabs tabs={tabs} />
        </div>
      </div>
    );
  };

  return (
    <div
      className={
        "min-h-screen bg-blue-950 flex flex-col justify-center items-center "
      }
    >
      <div className="navbar bg-opacity-20 backdrop-blur-md fixed top-0  left-0 w-full p-6 flex justify-between items-center z-50">
        <div></div>
        <div>
          <ethos.components.AddressWidget />
        </div>
      </div>
      <FadeIn>{renderButton()}</FadeIn>
    </div>
  );
};

export default Home;
