import React from "react";
import styled from "styled-components";
import black from "./image/black.png";
import white from "./image/white.png";
import blue from "./image/blue.png";
import red from "./image/red.png";

const Background = styled.div`
  width: 100%;
  max-width: 350px;
  margin-top: 50px;
`;
const Container = styled.div`
  display: flex;
  position: relative;
`;

const ChipStack = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
`;

const Chip = styled.img`
  width: 70px;
  height: 70px;
  position: absolute;
  &:nth-child(2) {
    transform: translate(-1.5px, -1.5px);
    box-shadow: 0 1px 2px #fff;
    border-radius: 50%;
  }
  &:nth-child(3) {
    transform: translate(-3px, -3px);
    box-shadow: 0 1px 2px #fff;
    border-radius: 50%;
  }
`;

const Price = styled.span`
  font-size: 1.5rem;
  position: relative;
  z-index: 999;
  transform: translate(-4px, 24px);
  color: #fff;
  font-weight: bold;
`;
const Chips = (props) => {
  return (
    <Background>
      <Container>
        <ChipStack onClick={() => props.handleBettingPrice(1)}>
          <Chip src={white} />
          <Chip src={white} />
          <Chip src={white} />
          <Price style={{ color: "#000" }}>1</Price>
        </ChipStack>
        <ChipStack onClick={() => props.handleBettingPrice(5)}>
          <Chip src={red} />
          <Chip src={red} />
          <Chip src={red} />
          <Price>5</Price>
        </ChipStack>
        <ChipStack onClick={() => props.handleBettingPrice(25)}>
          <Chip src={blue} />
          <Chip src={blue} />
          <Chip src={blue} />
          <Price>25</Price>
        </ChipStack>
        <ChipStack onClick={() => props.handleBettingPrice(100)}>
          <Chip src={black} />
          <Chip src={black} />
          <Chip src={black} />
          <Price>100</Price>
        </ChipStack>
      </Container>
    </Background>
  );
};

export default Chips;
