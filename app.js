let turn = "X";
let isgameover = false;
let playerX = document.querySelector(".playerX");
let player0 = document.querySelector(".player0");
let scorex = document.getElementsByClassName("scorex")[0]; 
let score0 = document.getElementsByClassName("score0")[0]; 
let px = [];
let p0 = [];

//changing turn
const changeTurn = () => {
    return turn === 'X'?'0':'X';
};

//X winning
const xwins = () => {
    px.push("X");
    scorex.innerHTML = ""; 
    px.forEach(elem => {
        scorex.innerHTML += (elem + " "); 
    });
    setTimeout( () => {
        if (px.length == 5) {
                window.alert("X won the match");
                resetGame();
            }
    },0)
    
};

//0 winning
const ywins = () => {
    p0.push("0");
    score0.innerHTML = ""; 
    p0.forEach(elem => {
        score0.innerHTML += (elem + " "); 
    });
    setTimeout( () => {
        if (p0.length == 5) {
                window.alert("0 won the match");
                resetGame();
            }
    },0)
};

//checking winning
const checkWin = () => {
    let boxtext = document.getElementsByClassName('content'); // all spans
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    wins.forEach(e => {
        if ((boxtext[e[0]].innerHTML === boxtext[e[1]].innerHTML) &&
            (boxtext[e[2]].innerHTML === boxtext[e[1]].innerHTML) && (boxtext[e[0]].innerHTML !== '')) 
        {
            isgameover = true;
            if (boxtext[e[0]].innerHTML === 'X') {
                xwins();
            } else {
                ywins();
            }
            window.alert(boxtext[e[0]].innerHTML + " has won this round");
            turn = changeTurn();
            turn = 'X';
            document.getElementsByClassName("info")[0].innerHTML = "Turn for :" + turn;
            let spans = document.querySelectorAll('.content');
            Array.from(spans).forEach(elem => {
                elem.innerHTML = "";
            });
            isgameover = false;
        }
    });
};

//game logic
let boxes = document.getElementsByClassName("box"); //all divs
Array.from(boxes).forEach(elem => {
    let boxtext = elem.querySelector('.content'); //span in a div
    elem.addEventListener('click', () => {
        if (boxtext.innerHTML === '') {
            boxtext.innerHTML = turn;
            setTimeout( checkWin )
            if (!isgameover) {
                turn = changeTurn();
                document.getElementsByClassName("info")[0].innerHTML = "Turn for " + turn;
            }
        }
    });
});

//resetting
const resetGame = () => {
    let boxtexts = document.querySelectorAll('.content');
    Array.from(boxtexts).forEach(element => {
        element.innerHTML = "";
    });
    turn = 'X';
    isgameover = false;
    document.getElementsByClassName("info")[0].innerHTML = "Turn for : " + turn;
    px = []; 
    p0 = []; 
    scorex.innerHTML = ""; 
    score0.innerHTML = ""; 
};

document.getElementById('reset').addEventListener('click', resetGame);