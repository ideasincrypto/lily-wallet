import React, { useState, useContext, useCallback } from 'react';
import { Psbt } from 'bitcoinjs-lib';
import styled from 'styled-components';
import { satoshisToBitcoins } from 'unchained-bitcoin';
import { EditAlt } from '@styled-icons/boxicons-regular';
import { Buffer } from 'buffer';

import { ErrorModal, Modal, LightningImage } from 'src/components';

import { gray500 } from 'src/utils/colors';
import { createTransaction } from 'src/utils/send';

import { FeeRates, LilyOnchainAccount, ShoppingItem, DecoratedOpenStatusUpdate } from '@lily/types';
import { SetStatePsbt, SetStateBoolean } from 'src/types';

import OpenChannelForm from './OpenChannelForm';
import ConfirmTxPage from 'src/pages/Send/Onchain/ConfirmTxPage';
import OpenChannelSuccess from './OpenChannelSuccess';

import { ConfigContext, PlatformContext, UnitContext } from 'src/context';

interface Props {
  setViewOpenChannelForm: SetStateBoolean;
}

const OpenChannel = ({ setViewOpenChannelForm }: Props) => {
  const { currentBitcoinPrice, currentBitcoinNetwork } = useContext(ConfigContext);
  const { getValue } = useContext(UnitContext);
  const [step, setStep] = useState(0);
  const [finalPsbt, setFinalPsbt] = useState<Psbt | undefined>(undefined);
  const [feeRates, setFeeRates] = useState<FeeRates>({
    fastestFee: 0,
    halfHourFee: 0,
    hourFee: 0
  });
  const [pendingChannelId, setPendingChannelId] = useState<Buffer>(Buffer.alloc(1));
  const [fundingAccount, setFundingAccount] = useState({} as LilyOnchainAccount);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
  const { platform } = useContext(PlatformContext);

  const openInModal = useCallback((component: JSX.Element) => {
    setModalIsOpen(true);
    setModalContent(component);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
    setModalContent(null);
  }, []);

  const openChannelAction = async (lightningAddress: string, channelAmount: string) => {
    setIsLoading(true);
    try {
      platform.openChannelInitiate(
        {
          lightningAddress: lightningAddress,
          channelAmount
        },
        async (err: Error | null, openChannelResponse?: DecoratedOpenStatusUpdate) => {
          try {
            if (err) {
              setError(err.message);
            } else if (openChannelResponse && openChannelResponse.psbtFund) {
              const { psbtFund, pendingChanId } = openChannelResponse;

              const { psbt, feeRates } = await createTransaction(
                fundingAccount,
                [
                  {
                    value: Number(psbtFund.fundingAmount),
                    address: psbtFund.fundingAddress
                  }
                ],
                0,
                () => platform.estimateFee(),
                currentBitcoinNetwork
              );

              await platform.openChannelVerify({
                fundedPsbt: psbt.toBase64(),
                pendingChanId: pendingChanId!,
                skipFinalize: false
              });

              setPendingChannelId(pendingChanId as Buffer);
              setFinalPsbt(psbt);
              setFeeRates(feeRates);
              setShoppingItems([
                {
                  image: <LightningImage />,
                  header: `Lightning channel with ${openChannelResponse.alias}`,
                  subtext: getValue(Number(psbtFund.fundingAmount)),
                  extraInfo: [
                    {
                      label: 'Outgoing capacity',
                      value: getValue(Number(psbtFund.fundingAmount))
                    },
                    { label: 'Incoming capacity', value: getValue(0) }
                  ]
                }
              ]);
              setStep(1);
            }
            setIsLoading(false);
          } catch (e) {
            if (e instanceof Error) {
              setError(e.message);
              setIsLoading(false);
            }
          }
        }
      );
    } catch (e: any) {
      if (e instanceof Error) {
        setError(e.message);
        setIsLoading(false);
      }
    }
  };

  const confirmTxWithLilyThenSend = async () => {
    try {
      const finalizedPsbt = finalPsbt!.finalizeAllInputs();
      await platform.openChannelFinalize({
        signedPsbt: finalizedPsbt.toBase64(),
        pendingChanId: pendingChannelId
      });
      setStep(2);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log('e: ', e);
        openInModal(<ErrorModal message={e.message} closeModal={closeModal} />);
      }
    }
  };

  return (
    <>
      {step === 0 && (
        <div className='flex flex-col lg:flex-row mt-4 items-start px-2 py-6'>
          <DangerIconContainer>
            <StyledIconCircle className='bg-green-100 dark:bg-green-800'>
              <EditAlt className='text-green-600 dark:text-green-200' size={36} />
            </StyledIconCircle>
          </DangerIconContainer>
          <div className='w-full flex ml-0 mt-4 lg:mt-0 lg:ml-6 flex-col items-start'>
            <HeadingText className='text-gray-900 dark:text-gray-200'>
              Open a new channel
            </HeadingText>
            <Subtext>
              Channels allow you to send payments to other nodes on the lightning network with low
              fees.
            </Subtext>
            <OpenChannelForm
              openChannel={openChannelAction}
              setFundingAccount={setFundingAccount}
              isLoading={isLoading}
              error={error}
              setViewOpenChannelForm={setViewOpenChannelForm}
            />
          </div>
        </div>
      )}
      {step === 1 && (
        <div className='flex flex-col'>
          <FormHeaderWrapper>
            <DangerIconContainer>
              <StyledIconCircle className='bg-green-100 dark:bg-green-800'>
                <EditAlt className='text-green-600 dark:text-green-200' size={36} />
              </StyledIconCircle>
            </DangerIconContainer>
            <div className='w-full flex ml-0 mt-4 lg:mt-0 lg:ml-6 flex-col items-start'>
              <HeadingText className='text-gray-900 dark:text-gray-200'>
                Open a new channel
              </HeadingText>
              <Subtext>Confirm your funding transaction on your hardware wallet(s).</Subtext>
            </div>
          </FormHeaderWrapper>
          {finalPsbt && (
            <div className='bg-gray-100 dark:bg-gray-700 py-4 px-4 rounded-lg mt-4 shadow-inner'>
              <ConfirmTxPage
                currentAccount={fundingAccount}
                finalPsbt={finalPsbt!}
                sendTransaction={confirmTxWithLilyThenSend}
                setFinalPsbt={setFinalPsbt as SetStatePsbt}
                feeRates={feeRates}
                setStep={setStep}
                currentBitcoinPrice={currentBitcoinPrice}
                currentBitcoinNetwork={currentBitcoinNetwork}
                shoppingItems={shoppingItems}
              />
            </div>
          )}
        </div>
      )}
      {step === 2 && <OpenChannelSuccess />}
      <Modal isOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)}>
        {modalContent}
      </Modal>
    </>
  );
};

const FormHeaderWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  padding: 1.5em;
  padding-bottom: 0;
`;

const DangerIconContainer = styled.div``;

const StyledIconCircle = styled.div`
  border-radius: 9999px;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeadingText = styled.div`
  font-size: 1.125rem;
  text-align: center;
  font-weight: 500;
`;

const Subtext = styled.div`
  padding-bottom: 1em;
  margin-top: 0.5rem;
  color: ${gray500};
`;

export default OpenChannel;
