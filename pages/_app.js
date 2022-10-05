import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
// require("dotenv").config({ path: ".env" });

import {
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';

import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import "react-multi-carousel/lib/styles.css";
import { store } from '../frontend/utils/reduxToolkit/store'
import { Provider } from 'react-redux'
import DisplayModals from '../frontend/components/commons/displayModal';


const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygonMumbai, chain.arbitrumGoerli, chain.optimismGoerli],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_APIKEY }), // export REACT_APP_APIKEY = "", from cli
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'nftick.io',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Provider store={store}>
          <Component {...pageProps} />
          <DisplayModals />
        </Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
