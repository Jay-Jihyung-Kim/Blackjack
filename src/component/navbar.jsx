import React from "react";
import styled from "styled-components";

const Background = styled.div`
  width: 100%;
  background-color: #3c3c3c;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  padding: 7px 0;
  max-width: 600px;
`;
const Betting = styled.span`
  font-size: 2rem;
  color: white;
`;
const Total = styled.span`
  font-size: 2rem;
  color: white;
`;

const Navbar = (props) => {
  return (
    <Background>
      <Container>
        <Betting>Bet: ${props.bettingPrice}</Betting>
        <Total>Bank: ${props.bank}</Total>
      </Container>
    </Background>
  );
};

export default Navbar;
