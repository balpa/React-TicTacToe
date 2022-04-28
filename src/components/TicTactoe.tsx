import React, {useState, useEffect} from 'react'
import '../App.css'

function TicTactoe() {



    const [board, setBoard] = useState(Array(9).fill(null))
    const [currentPlayer, setCurrentPlayer] = useState('X')
    const [lastPlayer, setLastPlayer] = useState(null)
    const [winner, setWinner] = useState(null)



    const Square: React.FC<{squareId: number}> = ({ squareId }) => { 

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

        // CHECK IF THE MACTH HAS FINISHED

        const winningCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]

        // CHECKS FOR THE CURRENT PLAYER'S MOVES AND THE WINNING COMBINATIONS IF THEY MATCH
        const checkWin = (player: string) => {
            return winningCombinations.some(combination => {
                return combination.every(index => board[index] === player)
            })
        }


        // CHECK FOR THE WINNING COMBINATION POSITIONS, RETURNS AN ARRAY
        const whichCombination = () => {
            for (let i = 0; i < winningCombinations.length; i++) {
                const combination = winningCombinations[i]
                if (board[combination[0]] === currentPlayer && board[combination[1]] === currentPlayer && board[combination[2]] === currentPlayer) {
                    return combination
                }}}


        if (checkWin(currentPlayer) === true){
            setWinner(currentPlayer)


        }

    },[lastPlayer])


  return (
    <>
    <div className='current-player'>Current player is: {currentPlayer}</div>
    <div className='winner'>{winner != null ? `Winner is: ${winner}` : ""}</div>
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