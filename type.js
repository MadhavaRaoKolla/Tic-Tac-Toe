"use strict";
let turn = "X";
let isgameover = false;
//same with different types
let playerX = document.querySelector(".playerX");
let player0 = document.querySelector(".player0");
//this is definitely an element becaues of [0] so it cannot be null like query selector
let scorex = document.getElementsByClassName("scorex")[0];
let score0 = document.getElementsByClassName("score0")[0];
let px = [];
let p0 = [];
//changing turn
const changeTurn = () => {
    return turn === 'X' ? '0' : 'X';
};
//X winning
const xwins = () => {
    px.push("X");
    scorex.innerHTML = "";
    px.forEach(elem => {
        scorex.innerHTML += (elem + " ");
    });
    setTimeout(() => {
        if (px.length == 5) {
            window.alert("X won the match");
            resetGame();
        }
    }, 0);
};
//0 winning
const ywins = () => {
    p0.push("0");
    score0.innerHTML = "";
    p0.forEach(elem => {
        score0.innerHTML += (elem + " ");
    });
    setTimeout(() => {
        if (p0.length == 5) {
            window.alert("0 won the match");
            resetGame();
        }
    }, 0);
};
//checking winning
const checkWin = () => {
    //this is HTMLCollection of HTML Elements 
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
            (boxtext[e[2]].innerHTML === boxtext[e[1]].innerHTML) && (boxtext[e[0]].innerHTML !== '')) {
            isgameover = true;
            if (boxtext[e[0]].innerHTML === 'X') {
                xwins();
            }
            else {
                ywins();
            }
            window.alert(boxtext[e[0]].innerHTML + " has won this round");
            turn = changeTurn();
            turn = 'X';
            document.getElementsByClassName("info")[0].innerHTML = "Turn for : " + turn;
            //unless we mention HTMLElement we cant access innerHTML for a node( if it is an element 
            //it returns all css selectors of content 
            let spans = document.querySelectorAll('.content');
            spans.forEach(elem => {
                elem.innerHTML = "";
            });
            isgameover = false;
        }
    });
};
//game logic
let boxes = document.getElementsByClassName("box"); // all divs
//prototype checking for HTMLCollectionOf<HTMLElements> Array.from().forEach
Array.from(boxes).forEach(elem => {
    let boxtext = elem.querySelector('.content'); //optional checking for null
    //we cannot hold a null and compare it with others so definitely it should be an HTMLElement
    elem.addEventListener('click', () => {
        if (boxtext.innerHTML === '') {
            boxtext.innerHTML = turn;
            setTimeout(checkWin);
            if (!isgameover) {
                turn = changeTurn();
                document.getElementsByClassName("info")[0].innerHTML = "Turn for : " + turn;
            }
        }
    });
});
//resetting
const resetGame = () => {
    let boxtexts = document.querySelectorAll('.content');
    boxtexts.forEach(element => {
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
