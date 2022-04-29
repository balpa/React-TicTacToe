import React from 'react'

const WinnerModal: React.FC<{winner: string, restart: any}> = ({winner, restart}) => {
  return (
      <>
      <div className='winner-modal'>
          {winner === "X" || winner === "O" ? `Winner is: ${winner}` : "DRAW"}
          <button id='restart-button' onClick={()=> restart(null)} >Restart</button>
      </div>
      </>
  )
}

export default WinnerModal