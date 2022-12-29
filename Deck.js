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
        const newValue = cardCount + 1
        setCardCount(newValue)
    }

    useEffect(function drawCardWhenClicked() {
        async function getCard() {
            const res = await axios.get(
                `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`
            )
            setCards([...cards, res.data.cards[0].image])
        }
        if (cardCount > 0) { getCard() }
    }, [cardCount])

    return (
        <div>
            <button onClick={drawCard}>Draw A Card</button>
            <div>You have drawn {cardCount} cards from the deck id: </div>
        </div>
    )
}

export default Deck