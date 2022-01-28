import React, { useContext } from 'react';
import { Network } from 'bitcoinjs-lib';

import { PageWrapper, PageTitle, Header, HeaderRight, HeaderLeft, Loading } from 'src/components';
import { SelectAccountMenu, NoAccountsEmptyState } from 'src/components';

import { AccountMapContext } from 'src/context/AccountMapContext';

import SendOnchain from './Onchain';
import SendLightning from './Lightning';

import {
  LilyConfig,
  NodeConfigWithBlockchainInfo,
  LilyLightningAccount,
  LilyOnchainAccount
} from '@lily/types';

interface Props {
  config: LilyConfig;
  currentBitcoinNetwork: Network;
  nodeConfig: NodeConfigWithBlockchainInfo;
  currentBitcoinPrice: any; // KBC-TODO: more specific type
}

const Send = ({ config, currentBitcoinNetwork, nodeConfig, currentBitcoinPrice }: Props) => {
  const { accountMap, currentAccount } = useContext(AccountMapContext);
  console.log('currentAccount: ', currentAccount);

  return (
    <PageWrapper>
      <>
        <Header>
          <HeaderLeft>
            <PageTitle>Send bitcoin</PageTitle>
          </HeaderLeft>
          <HeaderRight></HeaderRight>
        </Header>
        {/* {Object.keys(accountMap).length > 0 && (
          <SelectAccountMenu config={config} excludeNonSegwitAccounts={false} />
        )} */}
        {Object.keys(accountMap).length === 0 && <NoAccountsEmptyState />}
        {Object.keys(accountMap).length > 0 && currentAccount.loading && (
          <div className='flex align-center h-96 bg-white rounded-md shadow'>
            <Loading itemText={'Send Information'} />
          </div>
        )}

        {currentAccount.config.type === 'onchain' && (
          <SendOnchain
            config={config}
            currentBitcoinNetwork={currentBitcoinNetwork}
            nodeConfig={nodeConfig}
            currentBitcoinPrice={currentBitcoinPrice}
            currentAccount={currentAccount as LilyOnchainAccount}
          />
        )}
        {currentAccount.config.type === 'lightning' && (
          <SendLightning currentAccount={currentAccount as LilyLightningAccount} />
        )}
      </>
    </PageWrapper>
  );
};

export default Send;
