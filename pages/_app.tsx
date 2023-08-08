import "../styles/globals.css";
import { Chain, EthosConnectProvider } from "ethos-connect";
import type { AppProps } from "next/app";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <EthosConnectProvider
      ethosConfiguration={{
        chain: Chain.SUI_DEVNET,
        hideEmailSignIn: true,
      }}
      dappName="SuiPay"
      connectMessage="Sign in to SuiPay"
    >
      <Component {...pageProps} />
    </EthosConnectProvider>
  );
};

export default MyApp;
