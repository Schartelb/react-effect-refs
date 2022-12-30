import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import axios from 'axios';

const Deck = () => {
    const [deck, setDeck] = useState(null)
    const [cards, setCards] = useState([])
    const [cardCount, setCardCount] = useState(0)

    useEffect(function fetchDeckWhenMounted() {
        async function getDeck() {
            const res = await axios.get(
                "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
            )
            setDeck(res.data.deck_id)
        }
        getDeck()
    }, [])

    const drawCard = () => {
        setCardCount(cardCount + 1)
    }

    useEffect(function drawCardWhenClicked() {
        async function getCard() {
            const res = await axios.get(
                `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`
            )
            setCards([...cards, res.data.cards[0].image])
        }
        if(cardCount==52){alert("Deck is Empty!")}
        if(cardCount>0){getCard()}
    }, [cardCount])

    const resetDeck = () => {
        setCards([])
        async function shuffleUp() {
            const res = await axios.get(
                `https://deckofcardsapi.com/api/deck/${deck}/shuffle/`
            )
            setCardCount(1)
        }
        shuffleUp()
    }
    return (
        <div>
            <button name="draw" onClick={drawCard}>Draw A Card</button><br />
            <button name="shuffle" onClick={resetDeck}>Shuffle Up & Draw</button>
            <div>You have {52 - cardCount} cards remaining. </div>
            <div id="cardpile">
                {cards.map(cardURL => {
                    return (<Card cardURL={cardURL} />)
                })}
            </div>
        </div>
    )
}

export default Deck