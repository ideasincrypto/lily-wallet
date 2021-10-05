import React from "react";
import styled from "styled-components";

import { GrayLoadingAnimation } from "../../../components";

import { white, gray50 } from "../../../utils/colors";

interface Props {
  flat: boolean;
}

const PaymentRow = ({ flat }: Props) => {
  return (
    <TransactionsWrapper>
      <PaymentRowWrapper flat={flat}>
        <PaymentRowContainer flat={flat}>
          <GrayLoadingAnimation />
        </PaymentRowContainer>
      </PaymentRowWrapper>
      <PaymentRowWrapper flat={flat}>
        <PaymentRowContainer flat={flat}>
          <GrayLoadingAnimation />
        </PaymentRowContainer>
      </PaymentRowWrapper>
      <PaymentRowWrapper flat={flat}>
        <PaymentRowContainer flat={flat}>
          <GrayLoadingAnimation />
        </PaymentRowContainer>
      </PaymentRowWrapper>
      <PaymentRowWrapper flat={flat}>
        <PaymentRowContainer flat={flat}>
          <GrayLoadingAnimation />
        </PaymentRowContainer>
      </PaymentRowWrapper>
      <PaymentRowWrapper flat={flat}>
        <PaymentRowContainer flat={flat}>
          <GrayLoadingAnimation />
        </PaymentRowContainer>
      </PaymentRowWrapper>
    </TransactionsWrapper>
  );
};

const TransactionsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 1em;
`;

const PaymentRowWrapper = styled.div<{ flat: boolean }>`
  border-bottom: 1px solid ${gray50};
  background: ${(p) => (p.flat ? "transparent" : white)};
  box-shadow: ${(p) =>
    p.flat ? "none" : "rgba(43, 48, 64, 0.2) 0px 0.1rem 0.5rem 0px;"};
  align-items: center;
  flex-direction: column;
  margin-top: 1em;
`;

const PaymentRowContainer = styled.div<{ flat: boolean }>`
  display: flex;
  align-items: center;
  // padding: ${(p) => (p.flat ? ".75em" : "1.5em")};

  &:hover {
    background: ${(p) => !p.flat && gray50};
    cursor: ${(p) => !p.flat && "pointer"};
  }
`;

export default PaymentRow;
