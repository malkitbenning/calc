
var totalNumberOfKeys = document.querySelectorAll(".calc-digit").length;
var theOutput = document.getElementById("the-output");
var miniOutput = document.getElementById("mini-ans-i");
var stage = 1;
var part1 = 0;
var operand = "";
var part2 = "";

// function isNumeric(n) {
//     return !isNaN(parseFloat(n)) && isFinite(n);
// }

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!
  return !isNaN(str) && !isNaN(parseFloat(str))
}

function doMaths(){
  var resultNum = 0;
  switch (operand) {
        case "+":
            resultNum = Number(part1) + Number(part2);
            break;

        case "-":
            resultNum = Number(part1) - Number(part2);
            break;

        case "*":
            resultNum = Number(part1) * Number(part2);
            break;

        case "/":
            resultNum = Number(part1) / Number(part2);
            break;

            // If equal is pressed without an operator, keep number and continue
        default:
            resultNum = part2;
    }
    return resultNum;
}

function processInput(target){
  if (target == "ac"){
    theOutput.textContent = "";
    miniOutput.textContent="";
    part1 = "";
    part2 = "";
    operand="";
    stage = 1;
  } else {
    if (stage == 1) {
      if ([ '+', '-', '*', '/' ].includes(target)) {
      // if (target.includes("-", "+", "*", "/")) {
      // if (target == "+" || target == "-" || target == "*" || target == "/") {
        if (theOutput.textContent == "") {
          theOutput.textContent = "0";
        }
        part1 = theOutput.textContent;

        operand = target;
        if (isNumeric(part1)){
          miniOutput.textContent = part1 + " " + operand;
          stage=2;

          theOutput.textContent = "";
        } else {
          alert("not a valid number");
          theOutput.textContent = "";
          miniOutput.textContent="";
        }

      } else {
        theOutput.textContent = theOutput.textContent + target;
        miniOutput.textContent = miniOutput.textContent + target;

      }
    } else if (stage == 2) {
      if (target == "=") {
        theOutput.textContent = doMaths();
        part1 = theOutput;
        part2 = "";
        stage=1;
      } else {
        theOutput.textContent = theOutput.textContent + target;
        miniOutput.textContent=miniOutput.textContent + theOutput.textContent;
        part2 = part2 + target;
      }
    }
  }
}

for (var i = 0; i < totalNumberOfKeys; i++) {
  document.querySelectorAll(".grid-item")[i].addEventListener("click", function() {
    var targetID = this.id;
    var dataID = this.dataset.value;
    animation(targetID);
    processInput(dataID);
  });

}

//
document.addEventListener("keydown", function(event){
  var keyPressed = event.key;
  var targetID ="";
  var dataID = "";
  switch (keyPressed) {
    case "0":
      targetID = "n0";
      dataID = "0";
      break;
    case "1":
      targetID = "n1";
      dataID = "1";
      break;
    case "2":
      targetID = "n2";
      dataID = "2";
      break;
    case "3":
      targetID = "n3";
      dataID = "3";
      break;
    case "4":
      targetID = "n4";
      dataID = "4";
      break;
    case "5":
      targetID = "n5";
      dataID = "5";
      break;
    case "6":
      targetID = "n6";
      dataID = "6";
      break;
    case "7":
      targetID = "n7";
      dataID = "7";
      break;
    case "8":
      targetID = "n8";
      dataID = "8";
      break;
    case "9":
      targetID = "n9";
      dataID = "9";
      break;
    case ".":
      targetID = "fDot";
      dataID = ".";
      break;
    case "+":
      targetID = "fPlus";
      dataID = "+";
      break;
    case "-":
      targetID = "fMinus";
      dataID = "-";
      break;
    case "*":
      targetID = "fMult";
      dataID = "*";
      break;
    case "/":
      targetID = "fDivide";
      dataID = "/";
      break;
    case "=":
      targetID = "fEquals";
      dataID = "=";
      break;
    case "Enter":
      targetID = "fEquals";
      dataID = "=";
      break;
    case "Backspace":
      targetID = "fClear";
      dataID = "ac";
      break;
    default:
      targetID = "none";

  }
  if (targetID != "none") {
    animation(targetID);
    processInput(dataID);
  }
});
//
function animation(targetID){
  var currentKey = document.querySelector("#"+ targetID);
  currentKey.classList.add("pressed");
  setTimeout(function(){document.querySelector("#"+ targetID).classList.remove("pressed");}, 50);
}
