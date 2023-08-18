export const NETWORK: "devnet" | "testnet" | undefined = (process.env.NETWORK ||
  process.env.NEXT_PUBLIC_NETWORK) as "devnet" | "testnet" | undefined;
export const FAUCET = process.env.FAUCET || process.env.NEXT_PUBLIC_FAUCET;
export const ETHOS_EXAMPLE_CONTRACT =
  "0xddba96419d5272af78072c88a4dbc451d0ae8a21eb84a69fb5098cda35b5f7c7";
export const ETHOS_EXAMPLE_COIN_TREASURY_CAP =
  "0xc4038ad78c21d473c946ca4c1b50eced5f11804dd70954d47d8b3332ef278b55";
export const ETHOS_COIN_TYPE = `${ETHOS_EXAMPLE_CONTRACT}::ethos_example_coin::ETHOS_EXAMPLE_COIN`;
