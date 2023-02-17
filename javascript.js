

let  playerTurn = true;
let end = false;

// Track X player game state
let x = [
    0,0,0,
    0,0,0,
    0,0,0
]

// Track X player game state
let o = [
    0,0,0,
    0,0,0,
    0,0,0
]

// List of win condition
let winCon = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]

// Check win condition
function checkWin() {

    //Loop through all the win condition of first player
    for (let i = 0; i<winCon.length; i++) {
        for (let j = 0; j<3; j++) {

            if (o[winCon[i][j]] != 1) {
                break;
            } 

            //If all 3 condition met, end game
            if (j == 2) {
                document.getElementById('turn').innerHTML = "O WIN";
                document.getElementById('button').style.display = 'block';
                endGame(winCon[i]);
                return true;
            }
        }
    }

    //Loop through all the win condition of second player
    for (let i = 0; i<winCon.length; i++) {
        for (let j = 0; j<3; j++) {
            if (x[winCon[i][j]] != 1) {
                break;
            }

            //If all 3 condition met, end game
            if (j == 2) {
                document.getElementById('turn').innerHTML = "X WIN";
                document.getElementById('button').style.display = 'block';
                endGame(winCon[i]);
                return true;
            }
        }
    }
    

    // Check if all the block are fill, if so end the game as tie.
    col = document.getElementsByClassName('col')
    for (let i = 0; i<col.length; i++) {
        if (col[i].innerHTML == "") {
            return
        }
    }
    document.getElementById('turn').innerHTML = "TIE";
    document.getElementById('button').style.display = 'block';
    endGame(null);

    return true

}

//End the game, pause every button until reset button is click
function endGame(winCon) {
    const col = document.getElementsByClassName('col');

    document.getElementById('button').onclick = reset;
    document.getElementById('button').classList.toggle('animation');

    if (end == true) {
        for(let i=0; i<col.length; i++) {
            col[i].onclick = null;
        }
    } else {
        for(let i=0; i<col.length; i++) {
            col[i].onclick = false;
        }
    }

    if (winCon == null) {
        return
    }

    
    //Winning animation
    for (let i=0; i<3; i++) {
        setTimeout(()=> {
            col[winCon[i]].style.backgroundColor = "cyan"
            col[winCon[i]].classList.toggle('win_animation');
        }, i * 140);
    }

    for (let i=0; i<3; i++) {
        setTimeout(()=> {
            col[winCon[i]].classList.remove('win_animation');
        }, (i * 100)+340);
    }
}

//Reset  game to inital state
function reset() {

    playerTurn = true;
    document.getElementById('turn').innerHTML = "O TURN";
    document.getElementById('button').onclick = null;
    
    document.getElementById('button').classList.remove('animation');

    const col = document.getElementsByClassName('col');
    for (let i=0; i<col.length; i++) {

        col[i].innerHTML = ""
        col[i].style.backgroundColor = "white"
        col[i].onclick = function() {
            clickHandler(col[i])
        }
        col[i].classList.remove('animation');

    }

    for (let i=0; i<9; i++) {
        x[i] = 0
        o[i] = 0
    }
}

//Animation timer for "Turn" display 
function text_anim() {
    setTimeout(()=> {
        document.getElementById('turn').style.opacity = "1";
    }, 100);
    document.getElementById('turn').style.opacity = "0";
}

// Handle onclick
function clickHandler(select) {

    if (select.innerHTML != "") {
        return
    }

    if (playerTurn == true) {
        select.innerHTML = "O";
        select.classList.toggle('animation');
        x[select.dataset.block] = 1;
        text_anim();
        document.getElementById('turn').innerHTML = "X TURN";
        playerTurn = false;
    } else {
        select.innerHTML = "X";
        select.classList.toggle('animation');
        o[select.dataset.block] = 1
        text_anim();
        document.getElementById('turn').innerHTML = "O TURN";
        playerTurn = true;
    }
    checkWin();
}

// Assign onclick to every button
document.addEventListener('DOMContentLoaded', () => {
    const col = document.getElementsByClassName('col');

    for(let i=0; i< col.length; i++){
        col[i].onclick = function() {
            clickHandler(col[i])
        }
    }
    
})

