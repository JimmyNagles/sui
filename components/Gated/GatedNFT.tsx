import React, { useState, useEffect } from "react";
import { ethos } from "ethos-connect";

const GatedNFT = () => {
  const { wallet } = ethos.useWallet();
  const [hasNFT, setHasNFT] = useState(false); // Declare state variable

  useEffect(() => {
    // const fetchNFTStatus = async () => {
    //   const result = await ethos.checkForAssetType({
    //     wallet,
    //     type: "0xfc61bdba79fbde6aa2b8344f9226525b4d90bbd2ed6998e2db41f3a0986c1374::boatheads::Boatheads",
    //   });
    //   console.log(result);
    // };
  }, [wallet]);

  const renderButton = () => {
    if (!hasNFT) {
      // Redirect to a different page or show a warning
      return <div>No NFT detected</div>;
    } else {
      return (
        <div>
          <h1>HAS NFT</h1>
        </div>
      );
    }
  };

  return <div>{renderButton()}</div>; // Return JSX directly
};

export default GatedNFT;
