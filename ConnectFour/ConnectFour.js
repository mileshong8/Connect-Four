;/**
 * Created by user on 2/4/2017.
 */
var table = document.getElementById("gametable");

$(document).ready(function() {
    /*
     var alltd = document.getElementsByTagName("td");
     for (var i = 0; i <= alltd.length; i++) {
     alltd[i].innerHTML = "<img src='Images/emptypiece.png' height='75px' width='75px' class='cell'>";
     }
     */
    $(document).find("td").each(function() {
        $(this).html("<img src='Images/emptypiece.png' height='75px' width='75px'>");
    });
    var colorPiece = "y";
    var currentGameboard = new GameBoard();
    console.log(currentGameboard);
    $("#gametable td").click(function(){
        //$(".cell").click(function(){
        //var colNumber = $(this).attr('col');

        var colNumber = parseInt($(this).attr('id').split('-')[0]);
        console.log(colNumber);
        var rowNumber = currentGameboard.playPiece(colorPiece, colNumber);
        var idNumber = colNumber + "-" + rowNumber;
        currentGameboard.printBoard();
        currentGameboard.checkWin(colorPiece, colNumber, rowNumber);
        if (rowNumber < 6) {
            if (colorPiece == "y") {
                document.getElementById(idNumber).innerHTML = "<img src='Images/yellowpiece.png' height='75px' width='75px'>";
                colorPiece = "r"
            }
            else if (colorPiece == "r") {
                document.getElementById(idNumber).innerHTML = "<img src='Images/redpiece.png' height='75px' width='75px'>";
                colorPiece = "y"
            }
        }
        $("#clearboardbutton").click(function() {
            currentGameboard.clear();
            if (rowNumber < 6) {
                $(document).find("td").each(function() {
                    $(this).html("<img src='Images/emptypiece.png' height='75px' width='75px'>");
                });
            }
            colorPiece = "y";
        })
    });


});






function GameBoard () {

    // this array keeps the state of the board, the value of each cell will be '' when it is not played, 'r' for red, 'y' for yellow
    var arr = [
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""]
    ];

    this.printBoard = function() {
        console.log(arr);
    };

    // clear the board so that game can restart
    this.clear = function(){
        for (var i=0; i < 6; i++) {
            for (var j=0; j<7; j++) {
                arr[i][j] = "";
            }
        }
    };

    // play piece
    this.playPiece = function(color, colNum) {
        for (var i = 0; i < 6; i++) {
            if (arr[i][colNum] == "") {
                arr[i][colNum] = color;
                return i;
            }

        }
    };



    // determine winner - return the winner (= color) or '' means no winner
    this.checkWin = function (color, colNum, rowNum) {
        //check horizontal
        var rowCount = 0;
        var colCount = 0;
        var diagCount = 0;

        function diagLooptoRight(row, col, stepNum) {
            for (var z = 0; z < stepNum; z++) {
                if (color == arr[row + z][col + z]) {
                    diagCount++
                }
                else {
                    diagCount = 0;
                }
                if (diagCount == 4) {
                    alert(color + " " + "wins");
                }

            }
        }

        function diagLooptoLeft(row, col, stepNum) {
            for (var z = 1; z < stepNum; z++) {
                if (color == arr[row + z][col - z]) {
                    diagCount++
                }
                else {
                    diagCount = 0;
                }
                if (diagCount == 4) {
                    alert(color + " " + "wins");
                }
            }
        }

        //check horizontal
        for (var j=0; j<7; j++) {

            if (arr[rowNum][j] == arr[rowNum][colNum]) {
                rowCount++;
            }
            else {
                rowCount = 0;
            }
            if (rowCount == 4) {
                alert(color + " " + "wins");
            }
        }
        //check vertical
        for (var i = 0; i < 6; i++) {
            if (arr[i][colNum] == arr[rowNum][colNum]) {
                colCount++;
            }
            else {
                colCount = 0;
            }
            if (colCount == 4) {
                alert(color + " " + "wins");
            }
        }
        //check diagonal

        //check diag from left to right
        diagLooptoRight(0, 0, 6);
        diagLooptoRight(0, 1, 6);
        diagLooptoRight(0, 2, 5);
        diagLooptoRight(0, 3, 4);
        diagLooptoRight(1, 0, 5);
        diagLooptoRight(2, 0, 4);

        //check diag from right to left
        diagLooptoLeft(0, 6, 6);
        diagLooptoLeft(0, 5, 6);
        diagLooptoLeft(0, 4, 5);
        diagLooptoLeft(0, 3, 4);
        diagLooptoLeft(1, 6, 5);
        diagLooptoLeft(2, 6, 4);



    };
}