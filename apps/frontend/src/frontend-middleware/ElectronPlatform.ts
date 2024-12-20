import type {
  Payment,
  CloseStatusUpdate,
  AddInvoiceResponse,
  CloseChannelRequest,
  FundingPsbtVerify,
  FundingPsbtFinalize,
  LookupInvoiceMsg,
  Invoice,
  QueryRoutesRequest,
  QueryRoutesResponse,
  SendPaymentRequest
} from '@lily-technologies/lnrpc';

import { WalletInfo } from 'bitcoin-simple-rpc';

import { BasePlatform } from './BasePlatform';

import {
  File,
  OnChainConfig,
  VaultConfig,
  LightningConfig,
  LilyLightningAccount,
  LilyOnchainAccount,
  PriceForChart,
  HwiXpubRequest,
  HwiSignTransactionRequest,
  HwiEnumerateResponse,
  HwiPromptPinRequest,
  HwiPromptPinResponse,
  HwiSendPinRequest,
  HwiSendPinResponse,
  FeeRates,
  ChangeNodeConfigParams,
  NodeConfigWithBlockchainInfo,
  DecoratedOpenStatusUpdate,
  OpenChannelRequestArgs,
  GenerateLightningInvoiceRequest,
  LilyAccount,
  ICallback,
  AddressTag
} from '@lily/types';

export class ElectronPlatform extends BasePlatform {
  constructor() {
    super('Electron');
  }

  async quit() {
    window.ipcRenderer.invoke('/quit');
  }

  async getConfig(): Promise<File> {
    try {
      const result: File = await window.ipcRenderer.invoke('/get-config');
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject('Error getting config');
    }
  }

  async saveConfig(encryptedConfigObject: string) {
    await window.ipcRenderer.invoke('/save-config', {
      encryptedConfigFile: encryptedConfigObject
    });
  }

  async downloadFile(file: string, filename: string) {
    await window.ipcRenderer.invoke('/download-item', {
      data: file,
      filename: filename
    });
  }

  getOnchainData(
    config: VaultConfig | OnChainConfig,
    callback: (accountInfo: LilyOnchainAccount) => void
  ) {
    window.ipcRenderer.send('/account-data', config);

    window.ipcRenderer.on('/account-data', (_event, ...args) => {
      const accountInfo = args[0];
      callback(accountInfo);
    });
  }

  getLightningData(config: LightningConfig, callback: (accountInfo: LilyLightningAccount) => void) {
    window.ipcRenderer.send('/lightning-account-data', config);

    window.ipcRenderer.on('/lightning-account-data', (_event, ...args) => {
      const accountInfo: LilyLightningAccount = args[0];
      callback(accountInfo);
    });
  }

  async getNodeConfig() {
    const config = await window.ipcRenderer.invoke('/get-node-config');
    return Promise.resolve(config);
  }

  async doesAddressHaveTransaction(address: string): Promise<boolean> {
    const hasTransaction = await window.ipcRenderer.invoke('/does-address-have-transaction', {
      address
    });
    return Promise.resolve(hasTransaction);
  }

  async isTestnet() {
    const isTestnet = await window.ipcRenderer.invoke('/bitcoin-network');
    return Promise.resolve(isTestnet);
  }

  async getHistoricalBitcoinPrice() {
    const response: PriceForChart[] = await window.ipcRenderer.invoke('/historical-btc-price');
    return Promise.resolve(response);
  }

  async getCurrentBitcoinPrice() {
    const response: string = await window.ipcRenderer.invoke('/current-btc-price');
    return Promise.resolve(response);
  }

  async isConfirmedTransaction(txId: string) {
    const isConfirmed = await window.ipcRenderer.invoke('/isConfirmedTransaction', { txId });
    return Promise.resolve(isConfirmed);
  }

  async getXpub({ deviceType, devicePath, path }: HwiXpubRequest) {
    const xpub = await window.ipcRenderer.invoke('/xpub', { deviceType, devicePath, path });
    return Promise.resolve(xpub);
  }

  async signTransaction({ deviceType, devicePath, psbt, bitgo }: HwiSignTransactionRequest) {
    try {
      const response = await window.ipcRenderer.invoke('/sign', {
        deviceType,
        devicePath,
        psbt,
        bitgo
      });
      return Promise.resolve(response);
    } catch (e) {
      console.log('e: ', e);
      // @ts-ignore
      console.log('e.message: ', e.message);
      return Promise.reject(e);
    }
  }

  async enumerate(): Promise<HwiEnumerateResponse[]> {
    const response = await await window.ipcRenderer.invoke('/enumerate');
    return Promise.resolve(response);
  }

  async promptPin({ deviceType, devicePath }: HwiPromptPinRequest): Promise<HwiPromptPinResponse> {
    try {
      const response: HwiPromptPinResponse = await window.ipcRenderer.invoke('/promptpin', {
        deviceType,
        devicePath
      });
      return Promise.resolve(response);
    } catch (e) {
      console.log('e: ', e);
      // @ts-ignore
      console.log('e.message: ', e.message);
      return Promise.reject(e);
    }
  }

  async sendPin({ deviceType, devicePath, pin }: HwiSendPinRequest): Promise<HwiSendPinResponse> {
    try {
      const response: HwiSendPinResponse = await window.ipcRenderer.invoke('/sendpin', {
        deviceType,
        devicePath,
        pin
      });
      return Promise.resolve(response);
    } catch (e) {
      console.log('e: ', e);
      // @ts-ignore
      console.log('e.message: ', e.message);
      return Promise.reject(e);
    }
  }

  async estimateFee(): Promise<FeeRates> {
    const response = await window.ipcRenderer.invoke('/estimate-fee');
    return Promise.resolve(response);
  }

  async changeNodeConfig({
    provider,
    host,
    port,
    ssl
  }: ChangeNodeConfigParams): Promise<NodeConfigWithBlockchainInfo> {
    const response = await window.ipcRenderer.invoke('/changeNodeConfig', {
      nodeConfig: {
        provider,
        baseURL: host,
        port,
        ssl
      }
    });

    return Promise.resolve(response);
  }

  async broadcastTransaction(txHex: string) {
    const response = await window.ipcRenderer.invoke('/broadcastTx', {
      txHex
    });
    return Promise.resolve(response);
  }

  // Lightning

  async sendLightningPayment(
    options: SendPaymentRequest,
    config: LightningConfig,
    callback: (payment: Payment) => void
  ) {
    window.ipcRenderer.send('/lightning-send-payment', {
      options,
      config
    });

    window.ipcRenderer.on('/lightning-send-payment', async (_event: any, ...args: any) => {
      const response: Payment = args[0];
      callback(response);
    });
  }

  async closeChannel(
    { channelPoint, deliveryAddress }: CloseChannelRequest,
    callback: (response: CloseStatusUpdate) => void
  ) {
    window.ipcRenderer.send('/close-channel', {
      channelPoint,
      deliveryAddress
    });

    window.ipcRenderer.on('/close-channel', async (_event: any, ...args: any) => {
      const response: CloseStatusUpdate = args[0];
      callback(response);
      // TODO: check for errors
    });
  }

  async openChannelInitiate(
    { lightningAddress, channelAmount }: OpenChannelRequestArgs,
    callback: ICallback<DecoratedOpenStatusUpdate>
  ) {
    window.ipcRenderer.send('/open-channel', {
      lightningAddress,
      channelAmount
    });

    window.ipcRenderer.on('/open-channel', async (_event: any, ...args: any) => {
      const err: Error = args[0];
      const openChannelResponse: DecoratedOpenStatusUpdate = args[1];
      callback(err, openChannelResponse);
    });
  }

  async openChannelVerify({ fundedPsbt, pendingChanId }: FundingPsbtVerify) {
    try {
      await window.ipcRenderer.invoke('/open-channel-verify', {
        fundedPsbt,
        pendingChanId
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async openChannelFinalize({ signedPsbt, pendingChanId }: FundingPsbtFinalize) {
    try {
      await window.ipcRenderer.invoke('/open-channel-finalize', {
        signedPsbt,
        pendingChanId
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async generateLightningInvoice({ memo, value, lndConnectUri }: GenerateLightningInvoiceRequest) {
    const response: AddInvoiceResponse = await window.ipcRenderer.invoke('/generate-invoice', {
      memo,
      value,
      lndConnectUri
    });

    return Promise.resolve(response);
  }

  async getLightningInvoice({ paymentHash }: LookupInvoiceMsg) {
    const response: Invoice = await window.ipcRenderer.invoke('/get-invoice', {
      paymentHash
    });
    return Promise.resolve(response);
  }

  async getRoutes({ pubKey, amt }: QueryRoutesRequest) {
    const response: QueryRoutesResponse = await window.ipcRenderer.invoke('/get-routes', {
      pubKey,
      amt
    });
    return Promise.resolve(response);
  }

  async lightningConnect(lndConnectUri: string) {
    const response = await window.ipcRenderer.invoke('/lightning-connect', {
      lndConnectUri
    });
    return Promise.resolve(response);
  }

  async rescanBlockchain(startHeight: string, currentAccount: LilyOnchainAccount) {
    const response = await window.ipcRenderer.invoke('/rescanBlockchain', {
      startHeight,
      currentAccount
    });

    return Promise.resolve(response);
  }

  async getWalletInfo(currentAccount: LilyAccount) {
    const response: WalletInfo = await window.ipcRenderer.invoke('/getWalletInfo', {
      currentAccount
    });

    return Promise.resolve(response);
  }

  async addAddressTag(address: string, label: string) {
    const response = await window.ipcRenderer.invoke('/add-address-label', {
      address,
      label
    });
    return Promise.resolve(response);
  }

  async deleteAddressTag(id: number) {
    const response = await window.ipcRenderer.invoke('/delete-address-label', {
      id
    });
    return Promise.resolve(response);
  }

  async getAddressTags(address: string) {
    const response: AddressTag[] = await window.ipcRenderer.invoke('/get-address-labels', {
      address
    });
    return Promise.resolve(response);
  }

  async addTransactionDescription(txid: string, description: string) {
    const response = await window.ipcRenderer.invoke('/add-transaction-description', {
      txid,
      description
    });
    return Promise.resolve(response);
  }

  async getTransactionDescription(txid: string) {
    const response = await window.ipcRenderer.invoke('/get-transaction-description', {
      txid
    });
    return Promise.resolve(response);
  }
}
