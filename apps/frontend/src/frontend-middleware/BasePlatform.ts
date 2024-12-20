import type {
  Payment,
  CloseStatusUpdate,
  AddInvoiceResponse,
  FundingPsbtVerify,
  FundingPsbtFinalize,
  LookupInvoiceMsg,
  Invoice,
  QueryRoutesRequest,
  QueryRoutesResponse,
  GetInfoResponse,
  ChannelBalanceResponse,
  SendPaymentRequest
} from '@lily-technologies/lnrpc';

import { WalletInfo } from 'bitcoin-simple-rpc';

import {
  ICallback,
  File,
  VaultConfig,
  OnChainConfig,
  LightningConfig,
  LilyAccount,
  LilyLightningAccount,
  LilyOnchainAccount,
  PriceForChart,
  HwiXpubRequest,
  HwiXpubResponse,
  HwiSignTransactionRequest,
  HwiSignTransactionResponse,
  HwiEnumerateResponse,
  HwiPromptPinRequest,
  HwiPromptPinResponse,
  HwiSendPinRequest,
  HwiSendPinResponse,
  FeeRates,
  ChangeNodeConfigParams,
  NodeConfigWithBlockchainInfo,
  OpenChannelRequestArgs,
  DecoratedOpenStatusUpdate,
  GenerateLightningInvoiceRequest,
  LilyCloseChannelRequest,
  AddressTag,
  TransactionDescription
} from '@lily/types';

export type Platform = 'Electron' | 'Web';

export interface PlatformInterface {
  quit(): void;
  getConfig: () => Promise<File>;
  saveConfig(encryptedConfigObject: string): void;
  downloadFile(file: string, filename: string): void;

  getOnchainData(
    config: VaultConfig | OnChainConfig,
    callback?: (accountInfo: LilyAccount) => void
  ): void;
  getLightningData(
    config: LightningConfig,
    callback?: (accountInfo: LilyLightningAccount) => void
  ): void;

  getNodeConfig(): Promise<NodeConfigWithBlockchainInfo>;
  isTestnet(): Promise<boolean>;
  getHistoricalBitcoinPrice(): Promise<PriceForChart[]>;

  getCurrentBitcoinPrice(): Promise<string>;
  isConfirmedTransaction(txId: string): Promise<boolean>;

  getXpub({ deviceType, devicePath, path }: HwiXpubRequest): Promise<HwiXpubResponse>;
  enumerate(): Promise<HwiEnumerateResponse[]>;

  promptPin({ deviceType, devicePath }: HwiPromptPinRequest): Promise<HwiPromptPinResponse>;
  sendPin({ deviceType, devicePath, pin }: HwiSendPinRequest): Promise<HwiSendPinResponse>;
  estimateFee(): Promise<FeeRates>;
  changeNodeConfig({
    provider,
    host,
    port
  }: ChangeNodeConfigParams): Promise<NodeConfigWithBlockchainInfo>;
  broadcastTransaction(txHex: string): Promise<string>;

  sendLightningPayment(
    options: SendPaymentRequest,
    config: LightningConfig,
    callback: (payment: Payment) => void
  ): void;

  closeChannel(
    { channelPoint, deliveryAddress }: LilyCloseChannelRequest,
    callback: (response: CloseStatusUpdate) => void
  ): void;

  openChannelInitiate(
    { lightningAddress, channelAmount }: OpenChannelRequestArgs,
    callback: ICallback<DecoratedOpenStatusUpdate>
  ): void;

  openChannelVerify({ fundedPsbt, pendingChanId }: FundingPsbtVerify): void;
  openChannelFinalize({ signedPsbt, pendingChanId }: FundingPsbtFinalize): void;
  generateLightningInvoice({
    memo,
    value,
    lndConnectUri
  }: GenerateLightningInvoiceRequest): Promise<AddInvoiceResponse>;

  lightningConnect(lndConnectUri: string): void;

  rescanBlockchain(
    startHeight: string,
    currentAccount: LilyOnchainAccount
  ): Promise<{ success: boolean }>;

  getWalletInfo(currentAccount: LilyAccount): Promise<WalletInfo>;

  addAddressTag(address: string, label: string): Promise<number>;
  deleteAddressTag(id: number): Promise<boolean>;
  getAddressTags(address: string): Promise<AddressTag[]>;

  addTransactionDescription(txid: string, description: string): Promise<number>;
  getTransactionDescription(txid: string): Promise<TransactionDescription>;
}

export abstract class BasePlatform implements PlatformInterface {
  platform: Platform;

  constructor(platform: Platform) {
    this.platform = platform;
  }

  abstract quit(): void;

  setPlatform(name: Platform) {
    this.platform = name;
  }

  abstract getConfig(): Promise<File>;

  abstract saveConfig(encryptedConfigObject: string): void;

  abstract downloadFile(file: string, filename: string): void;

  abstract getOnchainData(
    config: VaultConfig | OnChainConfig,
    callback?: (accountInfo: LilyOnchainAccount) => void
  ): void;

  abstract getLightningData(
    config: LightningConfig,
    callback?: (accountInfo: LilyLightningAccount) => void
  ): void;

  abstract getNodeConfig(): Promise<NodeConfigWithBlockchainInfo>;

  abstract isTestnet(): Promise<boolean>;

  abstract getHistoricalBitcoinPrice(): Promise<PriceForChart[]>;

  abstract getCurrentBitcoinPrice(): Promise<string>;

  abstract isConfirmedTransaction(txId: string): Promise<boolean>;

  abstract doesAddressHaveTransaction(address: string): Promise<boolean>;

  abstract getXpub({ deviceType, devicePath, path }: HwiXpubRequest): Promise<HwiXpubResponse>;

  abstract signTransaction({
    deviceType,
    devicePath,
    psbt,
    bitgo
  }: HwiSignTransactionRequest): Promise<HwiSignTransactionResponse>;

  abstract enumerate(): Promise<HwiEnumerateResponse[]>;

  abstract promptPin({
    deviceType,
    devicePath
  }: HwiPromptPinRequest): Promise<HwiPromptPinResponse>;

  abstract sendPin({ deviceType, devicePath, pin }: HwiSendPinRequest): Promise<HwiSendPinResponse>;

  abstract estimateFee(): Promise<FeeRates>;

  abstract changeNodeConfig({
    provider,
    host,
    port,
    ssl
  }: ChangeNodeConfigParams): Promise<NodeConfigWithBlockchainInfo>;

  abstract broadcastTransaction(txHex: string): Promise<string>;

  abstract sendLightningPayment(
    options: SendPaymentRequest,
    config: LightningConfig,
    callback: (payment: Payment) => void
  ): void;

  abstract closeChannel(
    { channelPoint, deliveryAddress, lndConnectUri }: LilyCloseChannelRequest,
    callback: (response: CloseStatusUpdate) => void
  ): void;

  abstract openChannelInitiate(
    { lightningAddress, channelAmount }: OpenChannelRequestArgs,
    callback: ICallback<DecoratedOpenStatusUpdate>
  ): void;

  abstract openChannelVerify({ fundedPsbt, pendingChanId }: FundingPsbtVerify): Promise<void>;

  abstract openChannelFinalize({ signedPsbt, pendingChanId }: FundingPsbtFinalize): Promise<void>;

  abstract generateLightningInvoice({
    memo,
    value,
    lndConnectUri
  }: GenerateLightningInvoiceRequest): Promise<AddInvoiceResponse>;

  abstract getLightningInvoice({ paymentHash }: LookupInvoiceMsg): Promise<Invoice>;

  abstract getRoutes({ pubKey, amt }: QueryRoutesRequest): Promise<QueryRoutesResponse>;

  abstract lightningConnect(
    lndConnectUri: string
  ): Promise<GetInfoResponse & ChannelBalanceResponse>;

  abstract rescanBlockchain(
    startHeight: string,
    currentAccount: LilyAccount
  ): Promise<{ success: boolean }>;

  abstract getWalletInfo(currentAccount: LilyAccount): Promise<WalletInfo>;

  abstract addAddressTag(address: string, label: string): Promise<number>;
  abstract deleteAddressTag(id: number): Promise<boolean>;
  abstract getAddressTags(address: string): Promise<AddressTag[]>;

  abstract addTransactionDescription(txid: string, description: string): Promise<number>;
  abstract getTransactionDescription(txid: string): Promise<TransactionDescription>;
}
