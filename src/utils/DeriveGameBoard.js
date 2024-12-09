const DeriveGameBoard = (gameTurn, gameBoard) => {
    for (const turn of gameTurn) {
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
      }
      return gameBoard;
}

export default DeriveGameBoard;