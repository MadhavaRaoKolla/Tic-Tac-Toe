let turn : string = "X";
let isgameover : boolean = false;

//same with different types
let playerX : HTMLElement | null = document.querySelector(".playerX");
let player0 : HTMLElement = document.querySelector(".player0") as HTMLElement;

//this is definitely an element becaues of [0] so it cannot be null like query selector
let scorex : HTMLElement  = document.getElementsByClassName("scorex")[0] as HTMLElement; 
let score0 : HTMLElement = document.getElementsByClassName("score0")[0] as HTMLElement; 

let px : string [] = [];
let p0 : string [] = [];

//changing turn
const changeTurn = () : string => {
    return turn === 'X'?'0':'X';
};

//X winning
const xwins = () : void => {
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
const ywins = () : void => {
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
const checkWin = () : void => {
    //this is HTMLCollection of HTML Elements 
    let boxtext : HTMLCollection = document.getElementsByClassName('content'); // all spans
    let wins : number[][] = [
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
            (document.getElementsByClassName("info")[0] as HTMLElement).innerHTML = "Turn for : " + turn;

            //unless we mention HTMLElement we cant access innerHTML for a node( if it is an element 
            //it returns all css selectors of content 
            let spans : NodeListOf<HTMLElement> = document.querySelectorAll('.content');
            spans.forEach(elem => {
                elem.innerHTML = "";
            });
            isgameover = false;
        }
    });
};

//game logic
let boxes: HTMLCollection = document.getElementsByClassName("box"); // all divs
    //prototype checking for HTMLCollectionOf<HTMLElements> Array.from().forEach
    Array.from(boxes).forEach( elem => {
        let boxtext: HTMLElement = elem.querySelector('.content') as HTMLElement; //optional checking for null
        //we cannot hold a null and compare it with others so definitely it should be an HTMLElement
        elem.addEventListener('click', () => {
            if (boxtext.innerHTML === '') {
                boxtext.innerHTML = turn;
                setTimeout(checkWin);
                if (!isgameover) {
                    turn = changeTurn();
                    (document.getElementsByClassName("info")[0] as HTMLElement).innerHTML = "Turn for : " + turn;
                }
            }
    })
});

//resetting
const resetGame = () => {
    let boxtexts : NodeListOf<HTMLElement>= document.querySelectorAll('.content');
    boxtexts.forEach(element => {
        element.innerHTML = "";
    });
    turn = 'X';
    isgameover = false;
    (document.getElementsByClassName("info")[0] as HTMLElement).innerHTML = "Turn for : " + turn;
    px = []; 
    p0 = []; 
    scorex.innerHTML = ""; 
    score0.innerHTML = ""; 
};

(document.getElementById('reset') as HTMLElement).addEventListener('click', resetGame);