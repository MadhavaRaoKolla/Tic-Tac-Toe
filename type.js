var turn = "X";
var isgameover = false;
var playerX = document.querySelector(".playerX");
var player0 = document.querySelector(".player0");
var scorex = document.getElementsByClassName("scorex")[0];
var score0 = document.getElementsByClassName("score0")[0];
var px = [];
var p0 = [];

//changing turn
var changeTurn = function () {
    return turn === 'X' ? '0' : 'X';
};

//X winning
var xwins = function () {
    px.push("X");
    scorex.innerHTML = "";
    px.forEach(function (elem) {
        scorex.innerHTML += (elem + " ");
    });
    setTimeout(function () {
        if (px.length == 5) {
            window.alert("X won the match");
            resetGame();
        }
    }, 0);
};

//0 winning
var ywins = function () {
    p0.push("0");
    score0.innerHTML = "";
    p0.forEach(function (elem) {
        score0.innerHTML += (elem + " ");
    });
    setTimeout(function () {
        if (p0.length == 5) {
            window.alert("0 won the match");
            resetGame();
        }
    }, 0);
};

//checking winning
var checkWin = function () {
    var boxtext = document.getElementsByClassName('content'); // all spans
    var wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    wins.forEach(function (e) {
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
            var spans = document.querySelectorAll('.content');
            spans.forEach(function (elem) {
                elem.innerHTML = "";
            });
            isgameover = false;
        }
    });
};

//game logic
var boxes = document.getElementsByClassName("box"); // all divs
var _loop_1 = function (i) {
    var elem = boxes[i];
    var boxtext = elem.querySelector('.content'); // span in a div
    elem.addEventListener('click', function () {
        if (boxtext.innerHTML === '') {
            boxtext.innerHTML = turn;
            setTimeout(checkWin);
            if (!isgameover) {
                turn = changeTurn();
                document.getElementsByClassName("info")[0].innerHTML = "Turn for : " + turn;
            }
        }
    });
};
for (var i = 0; i < boxes.length; i++) {
    _loop_1(i);
}

//resetting
var resetGame = function () {
    var boxtexts = document.querySelectorAll('.content');
    boxtexts.forEach(function (element) {
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