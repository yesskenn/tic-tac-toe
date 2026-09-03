function gameBoard(){
    const board = []
    const rows = 3;
    const columns = 3;   
    
 
   //drawing the mf'ing board

    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j=0; j < columns; j++){
        board[i].push(cell());
        }
    }   

    //inspo /help from the connect4 guy
    const getBoard = () => board;
    

    const printBoard = () => {
        const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.table(boardWithCellValues);
  };

function spots(){
const spot = {

     1: board[0][0],
     2: board[0][1],
     3: board[0][2],
     4: board[1][0],
     5: board[1][1],
     6: board[1][2],
     7: board[2][0],
     8: board[2][1],
     9: board[2][2]
}
return spot;
}

const currentSpots = spots();
  // game.playTurn(1);
//NEXT IS TO LOOK THROUGH AVAILABLE TIC TAC TOE CELLS AND FIND AN EMPTY ONE BUT DROP THE TOKEN WHERE THE PLAYER SAYS THEY WANT IT 
const dropSpot = (spot, player) => {
    const targetCell = currentSpots[spot];
    
        targetCell.addToken(player);
    
    
    //if the player chooses a spot number, add the player token to the spot on the board
}
  return { getBoard, dropSpot, currentSpots, printBoard};

}

function cell(){
    let value = 0;
//change the value of the cell with player's token
    const addToken = (player) => {
        value = player;
    };
//retrieves cell value through closure (from building a house from the inside out)
    const getValue = () => value;

    return {
        addToken,
        getValue,
    };
    }





function gameController(
    playerXname = "PlayerX",
    playerOname = "PlayerO"
    ){

        const board = gameBoard();
        const players = [
            {
                name: playerXname,
                token: "X",
            },
            {
                name: playerOname,
                token: "O",
            },
        ]
       

        //take turns between players X and O
        let activePlayer = players[0];

        const switchPlayerTurn = () => {
            activePlayer = activePlayer === players[0] ? players[1] : players[0];
        };
        const getActivePlayer = () => activePlayer;
        

        const printNewRound = () => {
            board.printBoard();
            console.log(`${getActivePlayer().name}'s turn`)
        };
        const checkWinner = () => {
            const winConditions = [
                [1,4,7],
                [2,5,8],
                [3,6,9],
                [1,2,3],
                [4,5,6],
                [7,8,9],
                [1,5,9],
                [3,5,7]
            ]
            // check if the tokens are in any of the spots, if any of the winning combinations are there

            //are any of the winning conditions present?
            const isMatch =  winConditions.some(combination =>
                //is every spot in one of the winning conditions present?
                combination.every(spot => {
                    const targetCell = board.currentSpots[spot];

                    // is this cell the current player's token?
                    return targetCell.getValue() === getActivePlayer().token;
                })
            );
        
                //if activePlayer has spots in any of the winConditions, declare winner
            if (isMatch){
                console.log(`the winner is ${getActivePlayer().name}!!!!`);
            }
            }; //game.playTurn(
            checkWinner();
      
    
        const playTurn = (spot) => {
            console.log( `${getActivePlayer().name}'s token into spot ${spot}`)
            board.dropSpot(spot, getActivePlayer().token);
            
            checkWinner();

            
           
            printNewRound();
            switchPlayerTurn();
        }
    

    return {
        playTurn,
        getActivePlayer,
    };

    }
const game = gameController();


//write out your spot like "game.playTurn(1)"
    
    // pick a spot on the table, between 1 and 9
    // replace that spot with X or O depending on active player
    // refresh the table // check for winner
            // check winning combinations for X and winning combinations for O 
            // if winner, then declare winner
            // else continue
    // and switch active player


function renderBoard(){
    let body = document.querySelector('body');
    let squareBoard = document.createElement('div');
    document.body.appendChild(squareBoard);
            squareBoard.style.setProperty('border', '10px solid #4a5a72') //previous pink #F9AED1
            squareBoard.classList.add('squareBoard');



}
renderBoard();