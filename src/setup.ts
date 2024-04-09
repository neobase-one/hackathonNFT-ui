import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { configureChains, createConfig } from 'wagmi';
import { canto } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

// #region Wagmi
export const { chains, publicClient } = configureChains(
  [canto],
  [
    jsonRpcProvider({
      rpc: () => {
        return {
          http: process.env.NEXT_PUBLIC_CANTO_JSON_RPC_PROVIDER_URL,
        };
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Petals Pixels',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

// #region Axios
axios.defaults.baseURL = '/api';
// #endregion

// #region React Query
export const reactQueryClient = new QueryClient();
// #endregion
