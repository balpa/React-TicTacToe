import { spawn } from 'child_process'
import React, {useState, useEffect} from 'react'
import { useRef } from 'react'
import '../App.css'
import WinnerModal from './WinnerModal'

function TicTactoe() {



    const [board, setBoard] = useState(Array(9).fill(null))
    const [currentPlayer, setCurrentPlayer] = useState('X')
    const [lastPlayer, setLastPlayer] = useState(null)
    const [winner, setWinner] = useState(null)
    const [gameCount, setGameCount] = useState(0)
    const [countX, setCountX] = useState(0)
    const [countO, setCountO] = useState(0)
    const [selectedPlayer, setSelectedPlayer] = useState("2P")
    const [OsinArray, setOsinArray] = useState(0)

    let drawCount = gameCount - (countX+countO)

    const placeMark = () => {
        let randomElement = board[Math.floor(Math.random() * board.length)];

            if (board[randomElement] === null)
            {
                board[randomElement] = 'O'   
            }
        
    }

    // counts O's in board.
    useEffect(() => {
        let count = 0
        board.map((item) => {if (item === "O") {count++}})

        placeMark()
        setOsinArray(count)

    },[board])



    console.log(board)


    function computePosition() {
        let position = Math.floor(Math.random() * 8) + 1
        return position
    }



    function restart () {
        setWinner(null)
    }

    const Square: React.FC<{squareId: number}> = ({ squareId }) => { 

      return (
        <button className={`square${squareId}`}
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
            setGameCount(gameCount + 1)
            if (currentPlayer === "X")
            {
                setCountX(countX + 1)
            }
            else if (currentPlayer === "O")
            {
                setCountO(countO + 1)
            }
        }
        
        // CHECK IF ALL SQUARES ARE FILLED
        const isFull = () => {
            let count = 0
                for (let i = 1; i<board.length; i++) 
                {
                    if (board[i] === null) 
                    {count += 1}
                }
                return count
                }
        // IF ALL SQUARES ARE FILLED, SETS A DRAW 
        if (isFull() === 0 && checkWin(currentPlayer) === false) {
            setWinner('DRAW')
            setGameCount(gameCount + 1)
            }

    },[lastPlayer])


  return (
    <>
    <div className='current-player'>Current player is: {currentPlayer}
        <div>
            Mode:
            <span style={selectedPlayer === '1P' ? {color: "red"} : {}} onClick={()=> setSelectedPlayer('1P')}> 1P </span>
            <span style={selectedPlayer === '2P' ? {color: "red"} : {}} onClick={()=> setSelectedPlayer('2P')}>2P</span>
        </div>
    </div>
  

    <div className='counts'>
        <div>Game {gameCount}</div>
        <div>Draw {drawCount}</div>
        <div>Games won by X: {countX}</div>
        <div>Games won by O: {countO}</div>
        
    </div>
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
    {winner != null ? <WinnerModal restart={ winner =>{
            setWinner(winner);
            setBoard(Array(9).fill(null))
        }} 
        winner={winner}/> : null}
    </>
  )
}

export default TicTactoe