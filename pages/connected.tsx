import React, { useState, useEffect } from "react";
import { ethos } from "ethos-connect";

const Connected: React.FC = () => {
  const { wallet } = ethos.useWallet();
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
    <div className="min-h-screen flex flex-col justify-center">
      <button onClick={wallet.disconnect}>Sign Out</button>
      <div>Balance: {balance}</div>
      <div>My address: {wallet?.address}</div>
      <h1 className="p-2 ">Enter address to send money</h1>
      <input
        className="p-2"
        placeholder="Enter receiver's address"
        value={receiver}
        onChange={handleReceiverChange}
      />
      <h1 className="p-2 ">Enter amount</h1>
      <input
        className="p-2"
        placeholder="Enter amount"
        type="number"
        value={amount}
        onChange={handleAmountChange}
      />
      <button onClick={handleSendMoney}>Send</button>
      <h1 className="p-2 ">Your balance: {balance}</h1>
    </div>
  );
};

export default Connected;
