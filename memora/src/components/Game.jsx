import React, { useEffect } from 'react'


const Game = () => {
    const [gridSize, setGridSize] = React.useState(4);
    const [cards, setCards] = React.useState([]);
    
    const [flippedCards, setFlippedCards] = React.useState([]);
    const [solvedCards, setSolvedCards] = React.useState([]);
    const [disable,setDisabled]=React.useState(false);

    const [won, setWon]=React.useState(false);

    const HandleGridSizeChanged = (e) => {
        const size=parseInt(e.target.value);
        if(size>=2 && size<=10){
            setGridSize(size);
        }
    }
    
    //Initializing the cards
    const initializeGame = () => {
        const totalCards=gridSize*gridSize;
        const pairCount=Math.floor(totalCards/2);
        const numbers=[...Array(pairCount).keys()].map((n)=>n+1);
        const shuffledCards=[...numbers,...numbers].sort(()=>Math.random()-0.5).slice(0,totalCards).map((number,index)=>({id:index,number}));

        setCards(shuffledCards);
        setFlippedCards([]);
        setSolvedCards([]);
        setWon(false);
    }

    const handleClick=()=>{
        if(disable || won) return;
        if(flippedCards.length===0){
            setFlippedCards([id]);
            return;
        } 
        
    const isFlipped=()=>{
        flippedCards.includes(id) || solvedCards.includes(id);
    }

    }
    useEffect(()=>{
        initializeGame();
    }, [gridSize]);
    

    return (
    <div className='height-h-screen p-2.5 flex flex-col items-center justify-center mt-3.5'>
        <h1 className='text-3xl font-bold mb-4'>MEMORY GAME</h1>
        <div className='mb-4'>
            <label htmlFor='gridSize' className='mr-1.5'>Grid Size: (Max 10)</label>
            <input type='number'  id='gridSize'  min='2' max='10' className='border border-gray-300 rounded-md p-1 ml-2 w-14 h-8 text-center' value={gridSize} onChange={HandleGridSizeChanged} /> 
        </div>

        {/* Game Board */}
        <div className={`grid gap-2 mb-2`} 
            style={{ gridTemplateColumns: `repeat(${gridSize},
            minmax(0, 1fr))`,
            width:`min(100%,${(gridSize*5.5)}rem))`,
        }}>{/* 1fr is used for giving equal space to each card and minmax is used for making the cards responsive */}

            {cards.map((card)=>{
                return <div 
                    key={card.id}
                    onClick={()=>handleClick(card.id)}
                    className='aspect-square flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer transition-all duration-300 bg-gray-100 hover:bg-purple-400 p-6 space-between'>
                    {isFlipped(card.id) ? card.number : '?'}
                </div>
            })}
        </div>
    </div>
    
  )
}

export default Game
