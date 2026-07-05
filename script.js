
function play(){
    function board(){

    const board = []
    const cell = " ";
    const rows = 3;
    const columns = 3;
    const abc = ["A", "B", "C"];

    let column = [];
    for (let i = 0; i < rows; i++) {
    let row = [];
        if (i/i===0) {
            board.push(row);
        }
        for (let j = 0; j <= columns; j++) {
            let column = [];
            if(i/j === 0){
                board.push(column);  
                }       
            }  
            console.log(board);   
        }

    };


    function chooseMarker(){
        playerX = "PlayerX",
        playerO = "PlayerO"
   

        const players = [
            {name: playerX,
                token: "X",

            },
            {name: playerO,
                token: "O",
            }
        ];
    }
    chooseMarker();

    console.log("X or O?")
     board();
}


function Cell(){
    let value = 0; 

    //accept x or o

    const addToken = (player) => value;
        return {
            addToken,
            getValue,
        };

  }
  
play();
    /* 
const getBoard = () => board;


    
const addMarker = (column, player) => {
    const availableCells = board 
        .filter((row) => [column].getValue() === " ")
        .map((row) => row[column]);


        const lowRow = availableCells.length-1;
        board[lowRow][column].addMarker(player);
};


const renderBoard = () => {
    const boardWithCellValues = board.map((row) =>
        row.map((cell) => cell.getValue())
);
console.log(boardWithCellValues);
}


return { getBoard, addMarker, renderBoard};




   function game(
    


    let activePlayer = players[0]
   }
   }
        //select where the x or o is going to go on the board/grid
        //update the board
        //return the result
board();


*/

