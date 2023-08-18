import { createFactory, useCallback, useEffect, useState } from "react";
import { ethos, TransactionBlock } from "ethos-connect";

import { ETHOS_EXAMPLE_CONTRACT } from "../../lib/constants";
import SuccessMessage from "./SuccesMessage";

const Mint = () => {
  const contractAddress =
    "0xddba96419d5272af78072c88a4dbc451d0ae8a21eb84a69fb5098cda35b5f7c7";
  const { wallet } = ethos.useWallet();
  const [nftObjectId, setNftObjectId] = useState(null);
  const [nftName, setNftName] = useState("My NFT TEST");
  const [nftDescription, setNftDescription] = useState(
    "My NFT Description TEST"
  );
  const [nftImgUrl, setNftImgUrl] = useState(
    "https://ethoswallet.xyz/assets/images/ethos-email-logo.png"
  );
  const [state, setState] = useState({
    nftObjectId: null,
    nftName: "My NFT ",
    nftDescription: "My NFT Description TEST",
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

      console.log("nftName", state.nftName);
      console.log("nftName", state.nftDescription);
      console.log("nftName", state.nftImgUrl);

      const nft = transactionBlock.moveCall({
        target: `${contractAddress}::nft_example::mint_to_sender`,
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
      console.log("Transaction Response", response);
      setNftObjectId(response);
    } catch (error) {
      console.log(error);
    }
  }, [wallet]);

  const reset = useCallback(() => {
    setNftObjectId(undefined);
  }, []);

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="flex flex-col gap-6">
      {nftObjectId && (
        <SuccessMessage reset={reset}>
          <a
            href={`https://explorer.sui.io/objects/${nftObjectId}?network=testnet`}
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
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="nftName"
          value={state.nftName}
          onChange={handleInputChange}
        />
        <input
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="nftDescription"
          value={state.nftDescription}
          onChange={handleInputChange}
        />
        <input
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="nftImgUrl"
          value={state.nftImgUrl}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="mx-auto px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        onClick={mint}
      >
        Mint an NFT
      </button>
    </div>
  );
};

export default Mint;
