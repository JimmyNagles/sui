import { createFactory, useCallback, useEffect, useState } from "react";
import { ethos, TransactionBlock } from "ethos-connect";

import { ETHOS_EXAMPLE_CONTRACT } from "../../lib/constants";
import SuccessMessage from "./SuccesMessage";

const Mint = () => {
  const contractAddress =
    "0xfc61bdba79fbde6aa2b8344f9226525b4d90bbd2ed6998e2db41f3a0986c1374";
  const { wallet } = ethos.useWallet();
  const [nftObjectId, setNftObjectId] = useState(null);

  const [state, setState] = useState({
    nftName: "",
    nftDescription: "",
    nftImgUrl: "https://ethoswallet.xyz/assets/images/ethos-email-logo.png",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const mint = useCallback(async () => {
    if (!wallet) return;

    try {
      const transactionBlock = new TransactionBlock();

      const nft = transactionBlock.moveCall({
        target: `${contractAddress}::boatheads::mint`,
        arguments: [
          transactionBlock.pure(state.nftName),
          transactionBlock.pure(state.nftDescription),
          transactionBlock.pure(state.nftImgUrl),
        ],
      });

      const response = await wallet.signAndExecuteTransactionBlock({
        transactionBlock,
        options: {
          showInput: true,
          showEffects: true,
          showEvents: true,
          showBalanceChanges: true,
          showObjectChanges: true,
        },
      });

      console.log(response);
      setNftObjectId(response);
    } catch (error) {
      console.log(error);
    }
  }, [wallet, state]);

  const reset = useCallback(() => {
    setNftObjectId(null);
  }, []);

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="flex flex-col gap-6">
      {nftObjectId && (
        <SuccessMessage reset={reset}>
          <a
            href={`https://explorer.sui.io/txblock/${nftObjectId.digest}?network=devnet`}
            target="_blank"
            rel="noreferrer"
            className="underline font-blue-600"
          >
            View Your NFT on the TestNet Explorer
          </a>
        </SuccessMessage>
      )}

      <div>
        <input
          className=" w-full p-4  text-gray-900 border  sm:text-xs focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
          name="nftName"
          placeholder="Enter Name"
          value={state.nftName}
          onChange={handleInputChange}
        />
        <input
          placeholder="description"
          className=" w-full p-4 text-gray-900 border  sm:text-xs focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
          name="nftDescription"
          value={state.nftDescription}
          onChange={handleInputChange}
        />
        <input
          className=" w-full p-4 text-gray-900 border  sm:text-xs focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
          name="nftImgUrl"
          placeholder="URL"
          value={state.nftImgUrl}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="p-2 mb-2 bg-gray-900 hover:text-white border-gray-200 border-2  shadow-inner bg-opacity-0  hover:bg-opacity-80 hover:shadow-2xl transition-all duration-1000 ease-in w-[200px] text-black  rounded-md"
        onClick={mint}
      >
        Mint an NFT
      </button>
    </div>
  );
};

export default Mint;
