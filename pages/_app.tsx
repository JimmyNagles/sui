import "../styles/globals.css";
import { EthosConnectProvider } from "ethos-connect";
import type { AppProps } from "next/app";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <EthosConnectProvider
      ethosConfiguration={{
        hideEmailSignIn: true,
      }}
      dappName="Ethos Squad"
      connectMessage="Sign in to join the Squad!"
    >
      <Component {...pageProps} />
    </EthosConnectProvider>
  );
};

export default MyApp;
