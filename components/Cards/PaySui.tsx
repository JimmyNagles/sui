import React from "react";

const PaySui = ({
  address,
  walletname,
  balance,
  handleSendMoney,
  handleReceiverChange,
  receiver,
  handleAmountChange,
  amount,
}) => {
  return (
    <div>
      {" "}
      <div className="text-white mt-2">My address: {address}</div>
      <div className="text-white mt-2">Wallet Name {walletname}</div>
      <h1 className=" text-white text-3xl ">
        My balance:
        {balance}
      </h1>
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
        className="p-2 mt-4 bg-blue-900 shadow-inner bg-opacity-0  hover:bg-opacity-80 hover:shadow-2xl transition-all duration-1000 ease-in w-[200px] text-white border rounded-md"
        onClick={handleSendMoney}
      >
        Send
      </button>
    </div>
  );
};

export default PaySui;
