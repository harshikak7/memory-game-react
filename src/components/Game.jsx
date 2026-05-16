import React, { useEffect } from 'react'
import {useState} from 'react'
const Game = () => {
    const [gridSize, setGridSize] = React.useState(4);
    const [cards, setCards] = React.useState([]);
    
    const [flippedCards, setFlippedCards] = React.useState([]);
    const [solvedCards, setSolvedCards] = React.useState([]);
    const [disable,setDisabled]=React.useState(false);

    const [won, setWon]=React.useState(false);
    const [moves, setMoves]=React.useState(0);

    const HandleGridSizeChanged = (e) => {
        const size=parseInt(e.target.value);
        if(size>=2 && size<=10 && size%2===0){
            setGridSize(size);
        }
    }
    
    //Initializing the cards
    const initializeGame = () => {
        const totalCards=gridSize*gridSize;
        const pairCount=Math.floor(totalCards/2);
        const memes=[ "😂",
                        "💀",
                        "🤡",
                        "🗿",
                        "🐸",
                        "🔥",
                        "😎",
                        "👀",
                        "🤖",
                        "👻",
                        "🍕",
                        "🚀",
                        "🐱",
                        "🎮",
                        "🦄",
                        "🍔",
                        "🥶",
                        "😈",
                        "🐼",
                        "⚡"
                    ]
        const numbers = memes.slice(0, pairCount);
        // const numbers=[...Array(pairCount).keys()].map((n)=>n+1);
        const shuffledCards=[...numbers,...numbers].sort(()=>Math.random()-0.5).slice(0,totalCards).map((number,index)=>({id:index,number}));

        setCards(shuffledCards);
        setFlippedCards([]);
        setSolvedCards([]);
        setWon(false);
        setMoves(0)
    }
    //Handle the first card flip
    const handleClick=(id)=>{
        console.log('clicked')
        if(disable || won) return;
        if(flippedCards.length===0){
            setFlippedCards([id]);
            return;
        } 
        setMoves((prev)=>prev+1)

        //Handle the second card flip and check for match
        const firstId=flippedCards[0]
        const firstCard=cards.find((card)=>card.id===firstId)
        const secondCard=cards.find((card)=>card.id===id)
        setFlippedCards([firstId,id])

        if(firstCard.number===secondCard.number){
            setSolvedCards((prev)=>[...prev,firstId,id])
            if(solvedCards.length +2 ===cards.length){
                setWon(true)
            }
            setFlippedCards([])
        }else{
            setTimeout(()=>{
                setFlippedCards([])
            },500)
        }
    }

    const isFlipped=(id)=>{
        return flippedCards.includes(id) || solvedCards.includes(id);
    }

    useEffect(()=>{
        initializeGame();
    }, [gridSize]);
    

    return (
    <div className='height-h-screen p-2.5 flex flex-col items-center justify-center mt-3.5'>
        <h1 className='text-3xl font-bold mb-4'>MEMORY GAME</h1>
        <h2 className='text-lg font-semibold mt-2'>Moves: {moves}</h2>

        <div className='mb-4'>
            <label htmlFor='gridSize' className='mr-1.5'>Grid Size: (Max 10)</label>
            <input type='number'  id='gridSize'  min='2' max='10' step='2' className='border border-gray-300 rounded-md p-1 ml-2 w-14 h-8 text-center' value={gridSize} onChange={HandleGridSizeChanged} /> 
        </div>

        {won &&(
            <h2 className='text-3xl font-bold text-green-400 mb-3'>You Won!!!</h2>
        )}
        {/* Game Board */}
        <div className={`grid gap-2 mb-2`} 
            style={{ gridTemplateColumns: `repeat(${gridSize},
            minmax(0, 1fr))`,
            width:`min(100%,${gridSize * 5.5}rem)`,
        }}>{/* 1fr is used for giving equal space to each card and minmax is used for making the cards responsive */}

            {cards.map((card)=>{
                return (
                    <div key={card.id} onClick={() => handleClick(card.id)} className="aspect-square cursor-pointer">
                        <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d
                                ${isFlipped(card.id) ? "rotate-y-180" : ""}`}>

                            {/* Front Side */}
                            <div className="
                                absolute w-full h-full
                                backface-hidden
                                bg-purple-500
                                rounded-xl
                                flex items-center justify-center
                                text-white text-2xl font-bold
                                hover:shadow-lg
                            ">
                                ?
                            </div>

                            {/* Back Side */}
                            <div className="
                                absolute w-full h-full
                                backface-hidden
                                rotate-y-180
                                bg-white
                                rounded-xl
                                flex items-center justify-center
                                text-4xl
                                shadow-lg
                            ">
                                {card.number}
                            </div>

                        </div>
                    </div>
                )
            })}
        </div>
    </div>
    
  )
}

export default Game
