import React, { useEffect } from 'react'
import dog from '../assets/dog.jpeg'
import cat from '../assets/cat.jpeg'
import monkey from '../assets/monkey.jpeg'
import panda from '../assets/panda.jpeg'
import hamster from '../assets/hamster.jpeg'
import mouse from '../assets/mouse.jpeg'
import penguin from '../assets/penguin.jpeg'
import dog2 from '../assets/dog2.jpeg'
import frog from '../assets/frog.jpeg'

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
        const memes=[ 
            dog,cat,monkey,panda,hamster,mouse,penguin,dog2,frog
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
                setTimeout(()=>{
                    setWon(true);
                },300)
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
  <div className="min-h-screen bg-[#f28b8b] flex flex-col items-center justify-center px-4 py-8 overflow-hidden">

    {/* TITLE */}
    <h1 className="text-4xl sm:text-6xl font-black text-black mb-6 tracking-tight text-center">
      MEMORA
    </h1>

    {won && (
  <div className="
    fixed
    inset-0
    bg-black/40
    backdrop-blur-sm
    flex
    items-center
    justify-center
    z-50
    px-4
  ">

    <div className="
      relative
      w-full
      max-w-[600px]
      bg-[#7b3ff2]
      rounded-3xl
      border-[6px]
      border-[#c084fc]
      shadow-2xl
      p-6
      text-center
    ">

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setWon(false)}
        className="
          absolute
          top-3
          right-3
          w-10
          h-10
          rounded-full
          bg-red-500
          text-white
          text-xl
          font-bold
          shadow-lg
        "
      >
        ✕
      </button>

      {/* TOP RIBBON */}
      <div className="
        absolute
        -top-6
        left-1/2
        -translate-x-1/2
        bg-[#f7d547]
        text-black
        font-black
        text-xl
        px-8
        py-2
        rounded-full
        shadow-lg
        whitespace-nowrap
      ">
        CONGRATULATIONS!
      </div>


      {/* ICON */}
      <div className="
        w-32
        h-32
        mx-auto
        mt-10
        mb-6
        rounded-full
        bg-[#9f67ff]
        flex
        items-center
        justify-center
        text-6xl
        shadow-inner
      ">
        🏆
      </div>


      {/* TEXT */}
      <h2 className="
        text-3xl
        font-black
        text-yellow-300
        mb-3
      ">
        YOU WON!
      </h2>

      <p className="
        text-white
        text-lg
        mb-2
      ">
        Completed in
      </p>

      <p className="
        text-4xl
        font-black
        text-white
        mb-6
      ">
        {moves} Moves
      </p>


      {/* BUTTON */}
      <button
        onClick={initializeGame}
        className="
          bg-[#f7d547]
          hover:scale-105
          transition-all
          text-black
          font-black
          px-8
          py-3
          rounded-2xl
          shadow-lg mb-4
        "
      >
        PLAY AGAIN
      </button>

    </div>

  </div>
)}

    {/* GAME AREA */}
    <div
      className="flex flex-col items-center"
      style={{
        width: `min(92vw, ${Math.max(gridSize * 6, 18)}rem)`
      }}
    >

      {/* TOP BAR */}
      <div className="w-full flex items-center justify-between mb-4">

        {/* MOVES */}
        <div className="flex items-center gap-2 text-black font-bold text-sm sm:text-xl">

          <div className="flex">
            ⭐⭐⭐
          </div>

          <span>
            {moves} Moves
          </span>

        </div>


        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* GRID SIZE */}
          <select
            value={gridSize}
            onChange={HandleGridSizeChanged}
            className="bg-[#efc676] px-2 sm:px-3 py-2 rounded-xl font-bold outline-none cursor-pointer text-sm sm:text-base"
          >
            <option value={2}>2x2</option>
            <option value={4}>4x4</option>
            <option value={6}>6x6</option>
            <option value={8}>8x8</option>
          </select>


          {/* RESTART */}
          <button
            onClick={initializeGame}
            className="text-2xl sm:text-3xl font-bold"
          >
            ↻
          </button>

        </div>

      </div>


      {/* BOARD SHADOW */}
      <div className="bg-black rounded-[28px] translate-x-2 translate-y-2">

        {/* BOARD */}
        <div className="bg-[#f8f15a] p-3 sm:p-4 rounded-[28px]">

          <div
            className="grid gap-2 sm:gap-4"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, minmax(0,1fr))`,
              width: `min(92vw, ${Math.max(gridSize * 6, 18)}rem)`
            }}
          >

            {cards.map((card) => {
              return (

                <div
                  key={card.id}
                  onClick={() => handleClick(card.id)}
                  className="aspect-square cursor-pointer"
                >

                  <div
                    className={`
                      relative
                      w-full
                      h-full
                      transition-transform
                      duration-500
                      transform-style-preserve-3d
                      ${isFlipped(card.id) ? "rotate-y-180" : ""}
                    `}
                  >

                    {/* FRONT */}
                    <div className="absolute w-full h-full backface-hidden bg-[#efc676] rounded-2xl shadow-[0_6px_12px_rgba(0,0,0,0.15)]">
                    </div>


                    {/* BACK */}
                    <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden bg-white">

                      <img
                        src={card.number}
                        alt=""
                        className="w-full h-full object-cover"
                      />

                    </div>

                  </div>

                </div>

              )
            })}

          </div>

        </div>

      </div>

    </div>

  </div>
)
}

export default Game