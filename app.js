let turn = "X"
let isgameover = false;

//function to change turn 
const changeTurn = () => {
    return turn === 'X'?'0':'X'
}

//checking win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('content'); //gives all span tags
    let wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    wins.forEach( e => {
        if((boxtext[e[0]].innerHTML === boxtext[e[1]].innerHTML) && 
            (boxtext[e[2]].innerHTML === boxtext[e[1]].innerHTML) && (boxtext[e[0]].innerHTML !== ''))
        {
            isgameover= true;
            turn = changeTurn();
            window.alert(turn + " has won the match")
            turn='X'
            document.getElementsByClassName("info")[0].innerHTML="Turn for " + turn;
            let spans = document.querySelectorAll('.content');
            Array.from(spans).forEach(elem => {
                elem.innerHTML=""
            });
            isgameover= false;
        }
    })
}

//game logic
let boxes = document.getElementsByClassName("box"); //divs are returned
Array.from(boxes).forEach( elem =>{ 
    let boxtext = elem.querySelector('.content'); //span in a div
    elem.addEventListener('click',()=>{
        if(boxtext.innerHTML === ''){
            boxtext.innerHTML = turn;
            turn = changeTurn();
            checkWin();  
            if(!isgameover){
                document.getElementsByClassName("info")[0].innerHTML="Turn for " + turn;
            }
        }
    })
})

//resetting
reset.addEventListener('click',()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerHTML=""
    });
    turn='X'
    isgameover=false;
    document.getElementsByClassName("info")[0].innerHTML="Turn for " + turn;
})