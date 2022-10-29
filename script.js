var stopUpdateTime = false;
var stopCountDownFrom = false;
var stopScrambleLetters = false;
let alphabet = ["A","B","C","D","E","C","F","G","H","I","J","K","L","M","N","O","P","<span>Qu</span>","R","S","T","U","V","W","X","Y","Z"]

function getRandoms(length,seed) {
  var myrng = new Math.seedrandom(seed.toString());
  var randoms = []
  for (x=0;x<length;x++) {
    randoms.push(myrng())
  }
  return randoms
}

function shuffleArray(array,seed) {
  var myrng = new Math.seedrandom(seed.toString());
  var randoms = getRandoms(16,seed)

  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(randoms[i] * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  for (i in array) {
    array[i] = array[i][Math.floor(randoms[i] * 6)]
  }
  return array;
}

function start() {
  var date = new Date();
  var seed = parseInt(""+date.getFullYear()+(date.getMonth()+1)+date.getDate()+date.getHours()+date.getMinutes())
  document.getElementById("match-id").innerHTML = "Match ID: <b>"+seed+"</b>"
  // stopScrambleLetters = false
  // scrambleLetters()
  for (block of document.getElementsByClassName("letter")) { block.innerHTML = "-" }
  var tillNextMin = 60 - date.getSeconds();
  setTimeout(function(){ 
    // stopScrambleLetters = true
    generateRandom()
    document.getElementById("count-down").children[0].className = "countDown"
    document.getElementById("count-down").children[1].innerHTML = "GAME ENDS IN"
    stopUpdateTime = true
    stopCountDownFrom = false
    countDownFrom(170)
    setTimeout(function(){ 
      alert("Game Over")
      document.getElementById("count-down").children[0].className = ""
      document.getElementById("count-down").children[1].innerHTML = "NEXT GAME IN"
      stopCountDownFrom = true
      stopUpdateTime = false
      updateTime()
    }, 170*1000);
  }, tillNextMin*1000);
}

function generateRandom() {
  const letters = [
    ["F","P","S","A","F","K"],
    ["I","E","N","U","E","S"],
    ["E","R","<u>W</u>","T","V","H"],
    ["N","G","E","E","A","A"],
    ["Y","R","D","V","E","L"],
    ["O","O","B","J","B","A"],
    ["<u>m</u>","U","<span>Qu</span>","H","N","I"],
    ["T","<u>W</u>","A","O","T","O"],
    ["H","N","L","N","R","<u>Z</u>"],
    ["R","T","T","E","L","Y"],
    ["T","O","E","S","I","S"],
    ["E","E","H","N","<u>W</u>","G"],
    ["P","S","H","A","C","O"],
    ["U","<u>M</u>","C","O","T","I"],
    ["D","R","X","I","E","L"],
    ["T","S","T","I","D","Y"],
  ]

  var d = new Date();
  var seed = parseInt(""+d.getFullYear()+(d.getMonth()+1)+d.getDate()+d.getHours()+d.getMinutes())
  var shuffledCubes = shuffleArray(letters,seed)

  var blocks = document.getElementsByClassName("letter")
  for (i in blocks) {
    blocks[i].innerHTML = shuffledCubes[i];
  }
}

function updateTime() {
  var date = new Date();
  var tillNextMin = 60 - date.getSeconds();
  document.getElementById("count-down").children[2].innerHTML = tillNextMin
  setTimeout(function(){ 
    if (stopUpdateTime == false) {
      updateTime() 
    }
  }, 1000);
}

function countDownFrom(time,stop=false) {
  if (!stop) {
    if (time != 0) {
      document.getElementById("count-down").children[2].innerHTML = time
      if (stopCountDownFrom == false) {
        setTimeout(function(){ 
          countDownFrom(time - 1)
        }, 1000)
      }
    }
  }
}

function scrambleLetters() {
  for (block of document.getElementsByClassName("letter")) {
    block.innerHTML = alphabet[Math.floor(Math.random() * 27)];
    if (stopScrambleLetters == false) {
      setTimeout(function(){
        scrambleLetters()
      }, 2000)
    }
  }
}