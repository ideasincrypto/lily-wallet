import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { white, gray400, gray600 } from 'src/utils/colors';
import { mobile } from 'src/utils/media';

import { requireLightning } from 'src/hocs';
import { LilyLightningAccount } from '@lily/types';

import LightningReceiveQr from './LightningReceiveQr';
import LightningReceiveForm from './LightningReceiveForm';
import LightningReceiveSuccess from './LightningReceiveSuccess';
interface Props {
  currentAccount: LilyLightningAccount;
}

export const LightningReceive = ({ currentAccount }: Props) => {
  const { currentBalance } = currentAccount;
  const [step, setStep] = useState(0);
  const [invoice, setInvoice] = useState('');

  let view: JSX.Element;
  if (step === 0) {
    view = <LightningReceiveForm setInvoice={setInvoice} setStep={setStep} />;
  } else if (step === 1) {
    view = <LightningReceiveQr paymentRequest={invoice} setStep={setStep} />;
  } else {
    view = <LightningReceiveSuccess paymentRequest={invoice} />;
  }

  return view;
};

const AccountReceiveContentRight = styled.div`
  min-height: 400px;
  padding: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  width: 100%;

  ${mobile(css`
    order: -1;
    min-height: auto;
  `)};
`;

const CurrentBalanceWrapper = styled.div`
  padding: 1.5em;
  display: 'flex';
  flex-direction: column;
  border-radius: 0.385em;
  background: ${white};
  text-align: right;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid ${gray400};
`;

const CurrentBalanceText = styled.div`
  font-size: 1.5em;
  color: ${gray600};
`;

const CurrentBalanceValue = styled.div`
  font-size: 2em;
`;

export default requireLightning(LightningReceive);