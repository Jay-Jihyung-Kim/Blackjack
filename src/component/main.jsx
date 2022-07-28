import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Chips from "./chips.jsx";
import Navbar from "./navbar.jsx";
import { tablet } from "./util/responsive";
import { cards } from "./util/cards";

const Background = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: radial-gradient(#005212, #000);
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: 1024px;
  max-width: 1400px;
  flex: 0 0 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Messageboard = styled.div`
  flex: 0 0 20%;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  ${tablet({
    margin: "20px 0",
  })};
`;

const Message = styled.span`
  font-size: 3rem;
  color: white;
  font-weight: bold;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(180deg);
  }
`;

//Images
const DealerCards = styled.div`
  flex: 0 0 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  gap: 15px;
  ${tablet({
    marginTop: "10px",
  })};
`;
const PlayerCards = styled.div`
  flex: 0 0 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;
const Cards = styled.div`
  display: ${(props) => (props.status === true ? "inline-block" : "none")};
`;
const CoverCards = styled.div`
  transform: translate(0, -130px);
  display: ${(props) => (props.status === true ? "block" : "none")};
  ${tablet({
    transform: " translate(0, -100px)",
  })};
`;
const CoverCard = styled.img`
  position: absolute;
  width: 130px;
  height: 130px;
  z-index: 999;
  animation: ${rotate} 0.5s linear;
  &:last-child {
    display: none;
  }
  ${tablet({
    width: "100px",
    height: "100px",
  })};
`;
const ValueText = styled.span`
  font-size: 2rem;
  color: white;
`;

const DealerCardImage = styled.img`
  width: 130px;
  height: 130px;
  animation: ${rotate} 0.5s linear;
  z-index: 1000;
  &:not(:first-child) {
    margin-left: -70px;
    position: relative;
  }
  &:last-child {
    animation-delay: 0.5s;
  }
  ${tablet({
    width: "100px",
    height: "100px",
  })};
`;

const CardImage = styled.img`
  width: 130px;
  height: 130px;
  animation: ${rotate} 0.5s linear;
  backface-visibility: hidden;
  &:not(:last-child) {
    margin-right: -70px;
  }
  &:nth-child(2) {
    animation-delay: 0.5s;
  }
  ${tablet({
    width: "100px",
    height: "100px",
  })};
`;

//Buttons
const DrawContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 700px;
  position: relative;
  ${tablet({
    width: "350px",
    gap: "20px;",
    margin: "0 20px",
  })}
`;

const NextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
`;

const Bets = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 80px;
  margin-top: -30px;
  display: ${(props) => (props.status === true ? "flex" : "none")};
`;

const ResetButton = styled.button`
  font-size: 2rem;
  color: white;
  border: none;
  background-color: transparent;
`;

const HitContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 700px;
  position: relative;
  display: ${(props) => (props.status === true ? "none" : "flex")};
  gap: 50px;
  ${tablet({
    width: "350px",
    gap: "50px;",
  })};
`;

const Button = styled.button`
  font-size: 2rem;
  border: none;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(63, 63, 63, 0.8);
  color: white;
  font-weight: bold;
  box-shadow: 0 3px 8px #5c5c5c, inset 0 2px 3px #a3a3a3;
  cursor: pointer;
  display: ${(props) => (props.status === true ? "none" : "block")};
  ${tablet({
    width: "80px",
    height: "80px",
    fontSize: "1.5rem",
  })};
`;

const DealButton = styled.button`
  font-size: 2rem;
  border: none;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(63, 63, 63, 0.8);
  color: white;
  font-weight: bold;
  box-shadow: 0 3px 8px #5c5c5c, inset 0 2px 3px #a3a3a3;
  cursor: pointer;
  display: ${(props) => (props.status === true ? "none" : "block")};
  ${tablet({
    width: "80px",
    height: "80px",
    fontSize: "1.5rem",
  })};
`;
const Top = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const Money = styled.span`
  font-size: 2rem;
  color: white;
  position: fixed;
  z-index: 999;
  display: flex;
  max-width: 600px;
  width: 80%;
  justify-content: end;
  margin: -10px auto;
`;

const Main = () => {
  const [deck, setDeck] = useState([...cards]);
  const [shuffle, setShuffle] = useState(false);
  const [showBet, setShowBet] = useState(true);
  const [bettingPrice, setBettingPrice] = useState(0);
  const [bank, setBank] = useState(1000);
  const [winLose, setWinLose] = useState();
  const [playerDeck, setPlayerDeck] = useState([]);
  const [playerValue, setPlayerValue] = useState();
  const [showPlayerCards, setShowPlayerCards] = useState(true);
  const [dealerDeck, setDealerDeck] = useState([]);
  const [dealerValue, setDealerValue] = useState();
  const [dealerTurn, setDealerTurn] = useState(false);
  const [dealerAce, setDealerAce] = useState(0);
  const [cardClosed, setCardClosed] = useState(false);
  const [showValue, setShowValue] = useState(false);
  const [draw, setDraw] = useState(false);
  const [double, setDouble] = useState(false);
  const [hit, setHit] = useState(true);
  const [nextGame, setNextGame] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(bank + bettingPrice);
    setShowPlayerCards(true);
    if (bank < 0) {
      setBettingPrice(bettingPrice + bank);
      setBank(0);
    }
    if (bank + bettingPrice < 1) {
      setMessage("No more Fund!");
      setDraw(true);
      setShowBet(false);
    }
    if (shuffle === true) {
      setMessage("We have to shuffle!");
      setPlayerDeck([]);
      setDealerDeck([]);
      setPlayerValue();
      setDealerValue();
      setNextGame(true);
      setHit(true);
      setDraw(false);
      setShowValue(false);
      setCardClosed(false);
      setDeck([...cards]);
      setShuffle(false);
      setShowBet(true);
    } else {
      const sum = [];
      playerDeck.map((card) => {
        sum.push(card.value);
        if (sum.includes("ACE")) {
          const subTotal = sum.filter((int) => int !== "ACE");
          const reduced = subTotal.reduce((a, b) => a + b, 0);
          if (reduced > 10) {
            const AceCount = sum.filter((card) => card === "ACE").length;
            setPlayerValue(reduced + AceCount);
          }
          if (reduced <= 10) {
            setPlayerValue(reduced + 11);
          }
        } else {
          setPlayerValue(sum.reduce((previous, a) => previous + a, 0));
        }
        console.log(playerValue);
        console.log(dealerValue);
      });

      const dealerSum = [];
      dealerDeck.map((card) => {
        dealerSum.push(card.value);
        if (dealerSum.includes("ACE")) {
          const subTotal = dealerSum.filter((int) => int !== "ACE");
          const reduced = subTotal.reduce((a, b) => a + b, 0);
          if (reduced > 10) {
            const AceCount = dealerSum.filter((card) => card === "ACE").length;
            setDealerValue(reduced + AceCount);
          }
          if (reduced <= 10) {
            setDealerValue(reduced + 11);
          }
        } else {
          setDealerValue(dealerSum.reduce((previous, a) => previous + a, 0));
        }
      });

      if (double === true) {
        if (playerValue > 21) {
          setMessage("Bust! You Lost!");
          setCardClosed(false);
          setShowValue(true);
          setNextGame(false);
          setHit(true);
          setWinLose(false);
          setDouble(false);
        } else {
          setDealerTurn(true);
          setDouble(false);
          console.log("draw");
        }
      }

      if (playerValue > 21) {
        setMessage("Bust! You Lost!");
        setCardClosed(false);
        setShowValue(true);
        setNextGame(false);
        setHit(true);
        setWinLose(false);
      }

      if (playerDeck.length <= 2 && playerValue === 21) {
        setMessage("Black Jack! You Won!");
        setCardClosed(false);
        setShowValue(true);
        setNextGame(false);
        setHit(true);
        setWinLose(true);
      }
    }
  }, [handleDrawDeck, playerDeck, dealerDeck, bettingPrice]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (dealerTurn === true) {
        setCardClosed(false);
        setShowValue(true);
        setHit(true);
        if (dealerValue > 16) {
          if (dealerValue < 22 && dealerValue > playerValue) {
            setMessage("Sorry you lost!");
            setNextGame(false);
            setWinLose(false);
          }
          if (playerValue < 22 && dealerValue < playerValue) {
            setMessage("You Won!");
            setNextGame(false);
            setWinLose(true);
          }
          if (playerValue === dealerValue) {
            setMessage("Push!");
            setNextGame(false);
          }
          setDealerTurn(false);
        }
        if (dealerValue > 21) {
          setMessage("You Won!");
          setNextGame(false);
          setDealerTurn(false);
          setWinLose(true);
        }
        if (dealerValue < 17) {
          if (dealerValue < 22 && dealerValue > playerValue) {
            setMessage("Sorry you lost!");
            setNextGame(false);
            setWinLose(false);
            setDealerTurn(false);
          } else {
            function DealerDraw() {
              const random = deck[Math.floor(Math.random() * deck.length)];
              setDealerDeck((dealerDeck) => dealerDeck.concat(random));
              const index = deck.indexOf(random);
              deck.splice(index, 1);
              setDeck(deck);
            }
            DealerDraw();
          }
        }
      }
    }, 200);
    return () => clearInterval(intervalId);
  }, [dealerTurn, dealerValue]);

  function handleDrawDeck() {
    if (bettingPrice < 1) {
      setMessage("Please place your bet!");
    } else {
      setCardClosed(true);
      setShowValue(false);
      setShowBet(false);
      setMessage("");
      for (let i = 0; i < 2; i++) {
        const random = deck[Math.floor(Math.random() * deck.length)];
        setPlayerDeck((playerDeck) => playerDeck.concat(random));
        const index = deck.indexOf(random);
        deck.splice(index, 1);
        setDeck(deck);
      }
      for (let i = 0; i < 2; i++) {
        const random = deck[Math.floor(Math.random() * deck.length)];
        setDealerDeck((dealerDeck) => dealerDeck.concat(random));
        const index = deck.indexOf(random);
        deck.splice(index, 1);
        setDeck(deck);
      }
      setDraw(true);
      setHit(false);
    }
  }

  function handleHit() {
    const random = deck[Math.floor(Math.random() * deck.length)];
    setPlayerDeck((playerDeck) => playerDeck.concat(random));
    const index = deck.indexOf(random);
    deck.splice(index, 1);
    setDeck(deck);
  }

  function handleDouble() {
    if (bettingPrice > bank) {
      setMessage("Not Enough Fund!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } else {
      setBank(bank - bettingPrice);
      setBettingPrice(bettingPrice * 2);
      handleHit();
      setTimeout(setDouble(true), 500);
    }
  }

  function handleStay() {
    setTimeout(setDealerTurn(true), 500);
  }

  function hanldeNextGame() {
    if (bettingPrice < 1) {
      setMessage("Please place your bet!");
    } else {
      if (winLose === false) {
        setBank(bank - bettingPrice);
        setWinLose();
      }
      if (winLose === true) {
        setBank(bank + bettingPrice);
        setWinLose();
      }
      if (deck.length < 16) {
        setShuffle(true);
      } else {
        setMessage("");
        setPlayerDeck([]);
        setDealerDeck([]);
        setPlayerValue();
        setDealerValue();
        setShowPlayerCards(false);
        setHit(true);
        setShowBet(true);
        setNextGame(true);
        setShowValue(false);
        setDraw(false);
      }
    }
  }

  function handleBettingPrice(e) {
    if (bank > 0) {
      setBettingPrice(bettingPrice + e);
      setBank(bank - e);
    }
  }

  function handleResetBetting() {
    setBank(bank + bettingPrice);
    setBettingPrice(0);
  }

  function handleChangeBetting() {
    if (winLose === false) {
      setBank(bank - bettingPrice);
      setWinLose();
    }
    if (winLose === true) {
      setBank(bank + bettingPrice);
      setWinLose();
    }
    setShowBet(true);
    setMessage("");
    setPlayerDeck([]);
    setDealerDeck([]);
    setPlayerValue();
    setDealerValue();
    setShowValue(false);
  }

  return (
    <React.Fragment>
      <Navbar bettingPrice={bettingPrice} bank={bank} />
      <Top>
        {winLose === true ? <Money>+{bettingPrice}</Money> : null}
        {winLose === false && hit === true ? (
          <Money>-{bettingPrice}</Money>
        ) : null}
      </Top>
      <Background>
        <Container>
          <DealerCards>
            <Cards status={showPlayerCards}>
              {dealerDeck.length > 0
                ? dealerDeck.map((card) => {
                    return <DealerCardImage src={card.image} />;
                  })
                : null}
              <CoverCards status={cardClosed}>
                <CoverCard
                  src={
                    "https://opengameart.org/sites/default/files/card%20back%20red.png"
                  }
                />
                <CoverCard
                  src={
                    "https://opengameart.org/sites/default/files/card%20back%20red.png"
                  }
                />
              </CoverCards>
            </Cards>
            {showValue === true ? (
              <ValueText>Total value: {dealerValue}</ValueText>
            ) : null}
            {showValue === false && dealerValue > 1 ? (
              <ValueText>Total value: ?</ValueText>
            ) : null}
          </DealerCards>
          <Messageboard>
            <Message>{message}</Message>
            <DrawContainer style={{ justifyContent: "center" }}>
              <NextContainer>
                <Button
                  status={nextGame}
                  disabled={nextGame}
                  onClick={handleChangeBetting}
                >
                  Bet
                </Button>
                <Button
                  status={nextGame}
                  disabled={nextGame}
                  onClick={hanldeNextGame}
                >
                  Next Game
                </Button>
              </NextContainer>
              <DealButton status={draw} onClick={handleDrawDeck}>
                Deal
              </DealButton>
              <Bets status={showBet}>
                <Chips handleBettingPrice={handleBettingPrice} />
                <ResetButton onClick={handleResetBetting}>Reset</ResetButton>
              </Bets>
            </DrawContainer>
          </Messageboard>
          <PlayerCards>
            <Cards status={showPlayerCards}>
              {playerDeck.length > 0
                ? playerDeck.map((card) => {
                    return <CardImage src={card.image} />;
                  })
                : null}
            </Cards>
            {playerValue && <ValueText>Total value: {playerValue}</ValueText>}
            <HitContainer status={hit}>
              <Button onClick={handleHit}>Hit</Button>
              {playerDeck.length < 3 ? (
                <Button onClick={handleDouble}>Double</Button>
              ) : null}
              <Button onClick={handleStay}>Stay</Button>
            </HitContainer>
          </PlayerCards>
        </Container>
      </Background>
    </React.Fragment>
  );
};

export default Main;
