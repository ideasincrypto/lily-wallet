import { useContext } from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { VerticalAlignBottom, AddCircleOutline, Settings } from '@styled-icons/material';
import { Home } from '@styled-icons/fa-solid';
import { SendPlane } from '@styled-icons/remix-fill';
import { networks, Network } from 'bitcoinjs-lib';
import FlowerLogo from 'src/assets/flower.svg';

import { StyledIcon } from '.';

import { AccountMapContext, ConfigContext, SidebarContext } from 'src/context';

import { white, gray50, gray700, gray100, gray900, green100, green700 } from 'src/utils/colors';
import { bitcoinNetworkEqual } from 'src/utils/files';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  currentBitcoinNetwork: Network;
}

export const NavLinks = ({ currentBitcoinNetwork }: Props) => {
  const { pathname } = useLocation();
  const { setCurrentAccountId } = useContext(AccountMapContext);
  const { config } = useContext(ConfigContext);
  const { setSidebarOpen } = useContext(SidebarContext);

  return (
    <>
      <WalletTitle>
        {bitcoinNetworkEqual(currentBitcoinNetwork, networks.testnet) ? (
          <LilyImageGray src={FlowerLogo} />
        ) : (
          <LilyImage src={FlowerLogo} />
        )}
        <WalletTitleText className='dark:text-gray-200'>
          Lily Wallet
          {bitcoinNetworkEqual(currentBitcoinNetwork, networks.testnet) && ' (testnet)'}
        </WalletTitleText>
      </WalletTitle>
      <Link
        className={classNames(pathname === '/' ? 'sidebar-item__active' : '', 'sidebar-item')}
        data-cy='nav-item'
        onClick={() => setSidebarOpen(false)}
        to='/'
      >
        <StyledIcon as={Home} size={24} style={{ marginRight: '.65rem', color: gray700 }} />
        Home
      </Link>
      <Link
        className={classNames(pathname === '/send' ? 'sidebar-item__active' : '', 'sidebar-item')}
        data-cy='nav-item'
        onClick={() => setSidebarOpen(false)}
        to='/send'
      >
        <StyledIcon as={SendPlane} size={24} style={{ marginRight: '.65rem', color: gray700 }} />
        Send
      </Link>
      <Link
        className={classNames(
          pathname === '/receive' ? 'sidebar-item__active' : '',
          'sidebar-item'
        )}
        data-cy='nav-item'
        onClick={() => setSidebarOpen(false)}
        to='/receive'
      >
        <StyledIcon
          as={VerticalAlignBottom}
          size={24}
          style={{ marginRight: '.65rem', color: gray700 }}
        />
        Receive
      </Link>
      <Link
        className={classNames(
          pathname === '/settings' ? 'sidebar-item__active' : '',
          'sidebar-item'
        )}
        data-cy='nav-item'
        onClick={() => setSidebarOpen(false)}
        to='/settings'
      >
        <StyledIcon as={Settings} size={24} style={{ marginRight: '.65rem', color: gray700 }} />
        Settings
      </Link>

      <h3 className='font-semibold text-lg mx-4 mt-7 mb-2 dark:text-gray-300'>Accounts</h3>
      <AccountsContainer>
        {config.lightning.map((wallet) => (
          <Link
            className={classNames(
              pathname.includes(`/lightning/${wallet.id}`) ? 'sidebar-item__active' : '',
              'sidebar-item'
            )}
            data-cy='nav-item'
            key={wallet.id}
            onClick={() => {
              setCurrentAccountId(wallet.id);
              setSidebarOpen(false);
            }}
            to={`/lightning/${wallet.id}`}
          >
            <IconSvg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 10V3L4 14h7v7l9-11h-7z'
              />
            </IconSvg>
            {wallet.name}
          </Link>
        ))}

        {config.wallets.map((wallet) => (
          <Link
            className={classNames(
              pathname.includes(`/vault/${wallet.id}`) ? 'sidebar-item__active' : '',
              'sidebar-item'
            )}
            data-cy='nav-item'
            key={wallet.id}
            onClick={() => {
              setCurrentAccountId(wallet.id);
              setSidebarOpen(false);
            }}
            to={`/vault/${wallet.id}`}
          >
            {wallet.mnemonic ? (
              <IconSvg fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z'
                  clipRule='evenodd'
                ></path>
              </IconSvg>
            ) : (
              <IconSvg viewBox='0 0 20 20' fill='currentColor' className='calculator w-6 h-6'>
                <path
                  fillRule='evenodd'
                  d='M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z'
                  clipRule='evenodd'
                ></path>
              </IconSvg>
            )}
            {wallet.name}
          </Link>
        ))}

        {config.vaults.map((vault) => (
          <Link
            className={classNames(
              pathname.includes(`/vault/${vault.id}`) ? 'sidebar-item__active' : '',
              'sidebar-item'
            )}
            data-cy='nav-item'
            key={vault.id}
            onClick={() => {
              setCurrentAccountId(vault.id);
              setSidebarOpen(false);
            }}
            to={`/vault/${vault.id}`}
          >
            <IconSvg fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z'
                clipRule='evenodd'
              ></path>
            </IconSvg>
            {vault.name}
          </Link>
        ))}
      </AccountsContainer>

      <Link
        className={classNames(pathname === '/setup' ? 'sidebar-item__active' : '', 'sidebar-item')}
        data-cy='nav-item'
        onClick={() => setSidebarOpen(false)}
        to={`/setup`}
      >
        <StyledIcon
          as={AddCircleOutline}
          size={24}
          style={{ marginRight: '.65rem', color: gray700 }}
        />
        New Account
      </Link>
    </>
  );
};

const WalletTitleText = styled.span`
  margin-left: 0.15em;
  margin-top: 0.25em;
`;

const LilyImage = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 0.25em;
`;

const LilyImageGray = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 0.25em;
  filter: grayscale(100%);
`;

const WalletsHeader = styled.h3`
  color: ${gray900};
  margin: 1.125em 1.125em 0.925em 0.75em;
  font-size: 1.125em;
  font-weight: 500;
`;

const WalletTitle = styled(WalletsHeader)`
  display: flex;
  align-items: center;
  padding: 1em 0.75em;
  font-weight: 700;
  margin: 0;
`;

const IconSvg = styled.svg`
  color: ${gray700};
  width: 1.25rem;
  margin-right: 0.65rem;
  height: 1.25rem;
  flex-shrink: 0;
`;

const AccountsContainer = styled.div`
  overflow: auto;
  height: auto;
`;

const SidebarItemStyle = css<{ active: boolean }>`
  background: ${(p) => (p.active ? green100 : white)};
  border: ${(p) => (p.active ? `solid 0.0625em ${gray100}` : 'none')};
  border-left: ${(p) => (p.active ? `solid 0.6875em ${green700}` : 'none')};
  margin-left: ${(p) => (p.active ? `solid 0.6875em ${green700}` : 'none')};
  border-right: none;
  color: ${(p) => (p.active ? 'inherit' : gray700)};
  padding: ${(p) => (p.active ? `1em 1.2em 1.125em .5em` : '1em 1.2em')};
  text-decoration: none;
  font-size: 0.9em;
  display: flex;
  align-items: center;

  &:hover {
    background: ${(p) => (p.active ? green100 : gray50)};
  }
`;

const SidebarItemLink = styled(({ active, ...p }) => <Link {...p} />)`
  ${SidebarItemStyle};
  text-decoration: none;
`;