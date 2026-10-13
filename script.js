let container = document.querySelector("#intro-container");
const canvas = document.getElementById('board');

const boardDiv = document.querySelector('#board');
const winnerDiv = document.querySelector('#winner');
const playerTurnDiv = document.querySelector('#turn');
    playerTurnDiv.style.setProperty('display','none');
const playerXdiv = document.querySelector("#playerXscore");
const playerOdiv = document.querySelector("#playerOscore");
const startBtn = document.querySelector('#start');
const playerXField = document.getElementById("playerNameX").value = "";
const playerOField = document.getElementById("playerNameO").value = "";
const restartBtn = document.querySelector("#restartBtn");


function enterPlayerName(){
      document.getElementById("name-dialog").submit();

}

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
        };   
    const getBoard = () => board;     // inspo / help from the connect4 guy
   
    const printBoard = () => {
        const boardWithCellValues = board.map((row) =>
            row.map((cell) => cell.getValue()));
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
        };
     
        const currentSpots = spots();
        const dropSpot = (spot, player) => {
            const targetCell = currentSpots[spot];
                targetCell.addToken(player);    //if the player chooses a spot number, add the player token to the spot on the board   
        }
          
        const resetGameBoard = () => {
            board.forEach(row => {
                row.forEach(cell => {
                    cell.reset();
                });
            });
        } ;
        return { resetGameBoard, getBoard, dropSpot, currentSpots, printBoard};

};

function cell(){
    let value = 0;
        //change the value of the cell with player's token
    const addToken = (player) => {
        value = player;
        };
        //retrieves cell value through closure (from building a house from the inside out)
    const getValue = () => value;
    const reset = () => {
        value = 0;
    }

    return {
        addToken,
        getValue,
        reset
            };
    };


function gameController(
    playerXname = "PlayerX",
    playerOname = "PlayerO",
    ){

        const board = gameBoard();
        const players = [
            {
                name: playerXname,
                token: "X",
                preferredName: playerXField,
             
            },
            {
                name: playerOname,
                token: "O",
                preferredName: playerOField,
            
            },
        ]

        let xScore = 0;
        let oScore = 0;

            
  

        //take turns between players X and O
        let activePlayer = players[0];
        const switchPlayerTurn = () => {
            activePlayer = activePlayer === players[0] ? players[1] : players[0];
        };
        const getActivePlayer = () => activePlayer;
        
        const printNewRound = () => {
            board.printBoard();
            console.log(`${getActivePlayer().preferredName}'s turn`)
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
/* alternate way of checking if every index is in a row for a token
 for (let pattern of patterns) {
			if (pattern.every((index) => board[index] === currentPlayer.marker)) {
				return true;
			}
		}

		return false;
        */
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
                const winner = getActivePlayer().preferredName;
                winnerDiv.textContent = `The winner is ${winner}!`
                restartBtn.style.setProperty('display','block');

               
                if(getActivePlayer().name === playerXname){
                    xScore++;
                    playerXdiv.textContent = `X: ${xScore}`;
                } else if(getActivePlayer().name === playerOname){
                     oScore++;
                    playerOdiv.textContent = `O: ${oScore}`;
                        //playagain?
                }
               
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
 const resetDisplayBoard = () => {
    const boardCell = document.querySelectorAll(".cell");

    boardCell.forEach((cell) => {
                cell.textContent = "";
        });
    };
    return {
        playTurn,
        resetDisplayBoard,
        getActivePlayer,
        currentSpots: board.currentSpots,
        getBoard: board.getBoard,
        resetGameBoard: board.resetGameBoard,
        
    };

    }

const game = gameController();
const board = gameBoard();
//console.log(game.resetBoard);

    //write logic for when game is found
    /* 
    - hide the player turn div
    - show player score (or maybe this goes elsewhere)
    - add a plus one for the winner
    - ask the player to start over or end the game
    - start the game over if they chose to play again
    - 
    */



    
startBtn.addEventListener('click', () => {
    addGrid(canvas, 3, game.currentSpots);
    playerTurnDiv.style.setProperty('display','block');
    playerXdiv.textContent = `X: `;
    playerOdiv.textContent = `O: `;
  
    startBtn.style.setProperty('display', 'none');
      console.log("HELLOOOOSADFJKLSD")
       
    });
               

 

  function addGrid(element, squares, currentSpots){
    element.style.setProperty('background-color', '#313233')
    for (let i=0; i < squares*squares; i++){
        let square = document.createElement('button');
        square.className="cell";
        const spot = i+1;
        square.dataset.spot = spot;

        square.style.setProperty('width',`100%`)
        square.style.setProperty('height',`auto`)
        square.style.setProperty('aspect-ratio','1/1')
        square.style.setProperty('box-sizing', 'border-box');

       // square.style.setProperty('border-right', '1px solid #ffffff')
       // square.style.setProperty('border-top', '1px solid #4a5a72')  
       // square.style.setProperty('border-bottom', '1px solid #ffffff')  
        square.addEventListener('mouseover', () => {
           const rndCol = `rgba(${random(120)+80} ${random(115)} ${random(120)+80})`;
            square.style.backgroundColor = rndCol;   
            });

      canvas.appendChild(square);
    }
    }

   
  

function screenController(){
   // const game = gameController();
    // const board = gameBoard();
     

    const updateScreen = () => {
        const activePlayer = game.getActivePlayer();
        playerTurnDiv.textContent =  `${activePlayer.name}'s turn`; //activePlayer is the player object 
    }

    const updateScores = () => {
       // player1Score.textContent = gameBoard.activePlayer()[0].getPlayerScore();
		//player2Score.textContent = gameBoard.activePlayer()[1].getPlayerScore();
    };

    const resetScores = () => {
		playerOscore.textContent = 0;
		playerXScore.textContent = 0;
		tieScore.textContent = 0;
	};
    

    const announceWinner = () => {

    }

    const resetDisplay = () => {
        game.resetGameBoard();
        game.resetDisplayBoard();
        winnerDiv.textContent = "";
        updateScreen();
    };
  
    function clickHandler(e){
        const spot = e.target.dataset.spot;
                if (!e.target.classList.contains("cell")) return;

        game.playTurn(spot);
        e.target.textContent = game.currentSpots[spot].getValue();
        updateScreen();
        }
        boardDiv.addEventListener("click", clickHandler);
        updateScreen();
return { resetDisplay, updateScreen, updateScores, announceWinner, resetScores
    }
    
};
    const screen = screenController();
    restartBtn.addEventListener('click', () => {

    screen.resetDisplay();
  
    
 });

function random(number) {
  return Math.floor(Math.random() * (number + 1));
}


/*
   
   
          square.addEventListener('click', () => {
            square.appendChild(playerBtn);
            playerBtn.textContent = `${getActivePlayer().token}`;
        });
        */
     