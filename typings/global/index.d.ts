import { DataLayerObject } from '../gtm';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test';
      readonly NEXT_PUBLIC_APP_ENV: 'production' | 'staging' | 'development';
      readonly NEXT_PUBLIC_REST_URL: string;
      readonly NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string;
      readonly NEXT_PUBLIC_CANTO_JSON_RPC_PROVIDER_URL: string;
    }
  }

  interface Window {
    /** It might be undefined on some pages or specific environments */
    dataLayer: DataLayerObject[] | undefined;
  }
}

export {};
