/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />
interface Window {
  ethereum: any;
  $message: any;
  Web3: any;
  "web3-token": any;
}

interface ImportMetaEnv {
  readonly VITE_API_BASEURL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
