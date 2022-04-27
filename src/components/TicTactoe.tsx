import React, {useState, useEffect} from 'react'
import '../App.css'

function TicTactoe() {

    const [board, setBoard] = useState(Array(9).fill(null))
    const [currentPlayer, setCurrentPlayer] = useState('X')
    const [lastPlayer, setLastPlayer] = useState(null)



    console.log(board)

    function Square ({ squareId }) { 

      return (
        <button className="square" 
        onClick={()=> {
            const nextBoard = [...board]
            if (nextBoard[squareId] == null)
            {
                nextBoard[squareId] = currentPlayer
                setLastPlayer(currentPlayer)

            }
            setBoard(nextBoard)
        }}>
        
        {board[squareId]}

        </button>
      )
    }


    useEffect(()=> {
        currentPlayer === 'X' ? setCurrentPlayer('O') : setCurrentPlayer('X')
    },[lastPlayer])


  return (
    <>
    <div className='current-player'>Current player is: {currentPlayer}</div>
    <div className='frame'>
        <Square squareId={0}/>
        <Square squareId={1}/>
        <Square squareId={2}/>
        <Square squareId={3}/>
        <Square squareId={4}/>
        <Square squareId={5}/>
        <Square squareId={6}/>
        <Square squareId={7}/>
        <Square squareId={8}/>
    </div>    
    </>
  )
}

export default TicTactoe