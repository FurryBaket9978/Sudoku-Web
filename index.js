//runs the code when the website is loaded
window.onload = init
//the board
const board = [
    [0,0,0,2,6,0,7,0,1],
    [6,8,0,0,7,0,0,9,0],
    [1,9,0,0,0,4,5,0,0],
    [8,2,0,1,0,0,0,4,0],
    [0,0,4,6,0,2,9,0,0],
    [0,5,0,0,0,3,0,2,8],
    [0,0,9,3,0,0,0,7,4],
    [0,4,0,0,5,0,0,3,6],
    [7,0,3,0,1,8,0,0,0]
]

let algoBoard = [
    [0,0,0,2,6,0,7,0,1],
    [6,8,0,0,7,0,0,9,0],
    [1,9,0,0,0,4,5,0,0],
    [8,2,0,1,0,0,0,4,0],
    [0,0,4,6,0,2,9,0,0],
    [0,5,0,0,0,3,0,2,8],
    [0,0,9,3,0,0,0,7,4],
    [0,4,0,0,5,0,0,3,6],
    [7,0,3,0,1,8,0,0,0]
]

//the board solved (is not initiated as solved, but is solved by an algorithm)
let solved = [
    [0,0,0,2,6,0,7,0,1],
    [6,8,0,0,7,0,0,9,0],
    [1,9,0,0,0,4,5,0,0],
    [8,2,0,1,0,0,0,4,0],
    [0,0,4,6,0,2,9,0,0],
    [0,5,0,0,0,3,0,2,8],
    [0,0,9,3,0,0,0,7,4],
    [0,4,0,0,5,0,0,3,6],
    [7,0,3,0,1,8,0,0,0]
]

//runs the following code when the website is loaded
function init(){
    //prints the numbers to the board so that the board can be easily changed
    printBoard(board)
    //gets all of the cells
    const cells = document.getElementsByClassName('cell')
    //loops through each cell to allow them to be highlighted
    for (let i=0; i < cells.length; i++){
        //adds an onclick function for each cell
        cells[i].addEventListener('click', function() {
            //gets the element with active in its class name (the currently highlighted cell)
            let currentCell = document.getElementsByClassName("active")
            //replaces the current highlighted cell's class name with the normal class name 'cell'
            currentCell[0].className = currentCell[0].className.replace(" active", "")
            //takes the current cell and adds the active class to it
            this.className += " active"
        })
    }

}

//finds the first empty square in the board
function findEmpty(board) {
    //loops through each row
    for (let i=0; i<board.length; i++) {
        //loops through each position in the row
        for (let j=0; j<board[0].length; j++) {
            //checks if the (row, col) equals zero
            if (board[i][j] == 0) {
                //if it equals zero then it returns its position
                return [i, j]
            }
        }
    }
}

//checks if the number inputed is valid
function isValid(board, num, pos) {
    //gets the row of the given position
    const row = board[pos[0]]
    //initiates a variable for the col array
    let col = []
    //initiates the box array
    let box = []
    //adds the rounded down result of the row divided by 3 to the box array
    box.push(Math.floor(pos[0]/3))
    //adds the rounded down result of the col divided by 3 to the box array
    box.push(Math.floor(pos[1]/3))
    
    //loops through the first position of the x box to the last position
    for (let i = box[0] * 3; i < (box[0] * 3 + 3); i++) {
        //loops through the first position of the y box to the last position
        for (let j = box[1] * 3; j < (box[1] * 3 + 3); j++) {
            //if one of the positions has that number then the number given is not valid
            if (board[i][j] == num) {
                //returns false
                return false
            }
        }
    }

    //loops through the rows
    for (let i = 0; i < board.length; i++) {
        //adds the number in each row that corresponds to the col spot
        col.push(board[i][pos[1]])
    }

    //loops through the row array
    for (let i = 0; i < row.length; i++) {
        //if the number is equal to the number given then it returns false
        if (row[i] == num) {
            //returns false
            return false
        }
    }

    //loops through the numbers in the col array
    for (let i = 0; i < col.length; i++) {
        //if the number is equal to the given number then it returns false
        if (col[i] == num) {
            //returns false
            return false
        }
    }

    //if it ran through each loop successfully then the number is valid and the function returns true
    return true
}

//function that solves the board
function solveBoard(board) {
    //if the function cannot find an empty space then the board is solved
    if (!findEmpty(board)) {
        //returns true and ends the function
        return true
    }
    //finds the first zero on the board
    let zero = findEmpty(board)
    //takes the row from the position of the zero
    let row = zero[0]
    //takes the col from the position of the zero
    let col = zero[1]
    //loops through the numbers 1-9 and tries them in each spot
    for (let i = 1; i < 10; i++) {
        //checks if the number is valid in that spot
        if (isValid(board, i, zero)) {
            //this makes that spot the successful number
            board[row][col] = i
            //tries the next zero in recursion until a number is invalid and then restarts
            if (solveBoard(board)) {
                //returns true
                return true
            }
            //if it does not work then the position is set back to zero
            board[row][col] = 0
        }
    }
    //returns false if the solution does not work
    return false

}

//prints each cell number to the respective cell
function printBoard(board) {
    //gets the table
    const grid = document.getElementById('grid')
    //gets each cell
    const gridCells = grid.getElementsByClassName('cell')
    //loops through each list in the board variable
    for (let i=0; i < board.length; i++){
        //loops through each element in the respective list
        for(let k=0; k < board[i].length; k++){
            //if the element is greater than zero (not an empty blank) it adds the value to the innerHTML
            if (board[i][k] > 0){
                //adds the value to the innerHTML
                gridCells[i*9 + k].innerHTML = board[i][k]
            }
            //if the element is blank then it puts nothing in the innerHTML
            else {
                //adds nothing to the innerHTML
                gridCells[i*9 + k].innerHTML = ''
            }
        }
    }
}

function checkFull() {
    //gets the table in which the cells are located
    const grid = document.getElementById('grid')
    //gets each cell
    const cells = grid.getElementsByClassName('cell')
    //contains a list of numbers that will be used later to determine whether a cell is empty
    const numbers = [1,2,3,4,5,6,7,8,9]
    //count used to determine how many cells have numbers in them
    let count = 0
    //loops through each cell
    for (i=0; i<cells.length; i++) {
        //checks if the innerHTML of each cell is in the numbers list *note: it also checks if the innerHTML contains 9 because for some reason the if statement ignored all 9s
        if (cells[i].innerHTML in numbers || cells[i].innerHTML == 9) {
            //adds one to the count
            count += 1
        }
    }
    //checks to see if the count is 81 (a full board)
    if (count === 81){
        //returns true
        return true
    }
    //if the count is anything else then the code returns false
    else {
        //returns false
        return false
    }
}

//adds the num to the innerHTML and checks wheter it is correct or incorrect
function addNum(num) {
    //gets the highlighted cell (the selected cell)
    const highlighted = document.getElementsByClassName('cell active')
    //gets all of the cells
    const cells = document.getElementsByClassName('cell')
    //sets the count at zero
    let count = 0
    //sets the selected element's innerHTML to 1
    highlighted[0].innerHTML = num
    //loops through each cell
    for (i=0; i<cells.length; i++){
        //checks if the cell is selected
        if (cells[i].className == 'cell active') {
            //sets the position equal to the count
            const pos = count
            //sets the row to the count the count divided by 9 and rounded down
            const row = Math.floor(count/9)
            //sets the column to the count being modulo divided by 9
            const col = count % 9
            //if the value of the solved board at the row and column equals the value in the cell then it adds a solved id to the element
            if (solved[row][col] == cells[count].innerHTML){
                //adds the solved id to the element which colors the number green
                cells[i].id ='solved'
            }
            //if the value is not equal to the solved board's value then it adds the incorrect id to the element
            else {
                //adds the incorrect id to the element which colors the number red
                cells[i].id = 'incorrect'
            }
            //breaks through the loop since the active number has been found and all of the code needed has been executed
            break
        }
        //adds one to the count
        count += 1
    }

}

//resets the board
function restart() {
    //gets all elements with class name cell
    const cells = document.getElementsByClassName('cell')
    //loops through each cell before the board is reset to make sure no values are left green or red
    for (i=0; i<cells.length; i++){
        //if the id equals solved or incorrect then it changes the id to nothing
        if (cells[i].id === 'solved' || cells[i].id === 'incorrect'){
            //changes the id to nothing
            cells[i].id = ''
        }
    }
    //just prints the starting board
    printBoard(board)
}

//erases the value that is selected
function erase() {
    //gets the selected element
    const highlighted = document.getElementsByClassName('cell active')
    //makes the selected element's innerHTML nothing
    highlighted[0].innerHTML = ''
}

//submits the board and checks it
function submit() {
    //checks if the board is full and then executes
    if (checkFull()) {
        //sets the count equal to zero
        let count = 0
        //gets all of the cells
        const cells = document.getElementsByClassName('cell')
        //loops through the board's rows
        for (let i=0; i<solved.length; i++) {
            //loops through the board's rows' values
            for (let j=0; j<solved[i].length; j++) {
                //if the solved board's value is equal to the cell at the position count's value then it executes
                if (solved[i][j] == cells[count].innerHTML) {
                    //sets the id of the cell to solved which colors it green
                    cells[count].id = 'solved'
                    //adds one to count
                    count += 1
                    //continues the code
                    continue
                }
                //if the cell contains an incorrect value then the code executes
                else {
                    //sets the cell's id to incorrect
                    cells[count].id = 'incorrect'
                    //returns false and terminates the function
                    return false
                }
            }
        }
        //returns true if the entire board is solved
        return true
    }
    //if the board is not entirely solved then it terminates the code and returns false
    else {
        //returns false
        return false
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function algorithm() {
    sleep(250)
    const cells = document.getElementsByClassName('cell')
    
    //if the function cannot find an empty space then the board is solved
    if (!findEmpty(algoBoard)) {
        //returns true and ends the function
        console.log(algoBoard)
        return true
    }
    //finds the first zero on the board
    let zero = findEmpty(algoBoard)
    //takes the row from the position of the zero
    let row = zero[0]
    //takes the col from the position of the zero
    let col = zero[1]
    const position = ((row * 9) - 1) + (col + 1)

    //loops through the numbers 1-9 and tries them in each spot
    for (let i = 1; i < 10; i++) {
        //checks if the number is valid in that spot
        if (isValid(algoBoard, i, zero)) {
            //this makes that spot the successful number
            algoBoard[row][col] = i
            //tries the next zero in recursion until a number is invalid and then restarts
            if (algorithm(algoBoard)) {
                //returns true
                return true
            }
            //if it does not work then the position is set back to zero
            algoBoard[row][col] = 0
        }
    }
    //returns false if the solution does not work
    return false

}