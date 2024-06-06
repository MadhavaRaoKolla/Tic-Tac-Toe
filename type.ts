let turn : string = "X";
let isgameover : boolean = false;
let playerX : HTMLElement | null= document.querySelector(".playerX");
let player0 : HTMLElement = document.querySelector(".player0") as HTMLElement;
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
    let boxtext : HTMLCollectionOf<HTMLElement> = document.getElementsByClassName('content') as HTMLCollectionOf<HTMLElement>; // all spans
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
            let spans : NodeListOf<HTMLElement> = document.querySelectorAll('.content');
            spans.forEach(elem => {
                elem.innerHTML = "";
            });
            isgameover = false;
        }
    });
};

//game logic
let boxes: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("box") as HTMLCollectionOf<HTMLElement>; // all divs
for (let i = 0; i<boxes.length;i++) {
    let elem = boxes[i];
    let boxtext: HTMLElement = elem.querySelector('.content') as HTMLElement; // span in a div
    elem.addEventListener('click', () => {
        if (boxtext.innerHTML === '') {
            boxtext.innerHTML = turn;
            setTimeout(checkWin);
            if (!isgameover) {
                turn = changeTurn();
                (document.getElementsByClassName("info")[0] as HTMLElement).innerHTML = "Turn for : " + turn;
            }
        }
    });
}


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