const WORD_LENGTH = 8
const FLIP_ANIMATION_DURATION = 500
const DANCE_ANIMATION_DURATION = 500
const keyboard = document.querySelector("[data-keyboard]")
const alertContainer = document.querySelector("[data-alert-container]")
const guessGrid = document.querySelector("[data-guess-grid]")
const guessGridb = document.querySelector("[data-guess-grid-bottom]")
const targetWord = genRE(8,true)
const targetAnswer = eval(targetWord)

guessGridb.innerHTML = '<div class="tile l1" data-letter="?"></div>\
    <div class="tile" data-guess="guess" id="b0">?</div>\
    <div class="tile" data-guess="guess" id="b1">?</div>\
    <div class="tile" data-guess="guess" id="b2">?</div>\
    <div class="tile" data-guess="guess" id="b3">?</div>\
    <div class="tile" data-guess="guess" id="b4">?</div>\
    <div class="tile" data-guess="guess" id="b5">?</div>\
    <div class="tile" data-guess="guess" id="b6">?</div>\
    <div class="tile" data-guess="guess" id="b7">?</div>\
    <div class="tile" data-letter="=" data-answer="guess">=</div>\
    <div class="tile" data-letter="?" data-answer="guess">'+String(targetAnswer)[0]+'</div>\
    <div class="tile" data-letter="?" data-answer="guess">'+String(targetAnswer)[1]+'</div>\
    <div class="tile" data-letter="?" data-answer="guess">'+String(targetAnswer)[2]+'</div>'

var hr = document.getElementById("hours")
var min = document.getElementById("minutes")
var sec = document.getElementById("seconds")
var seconds = 0
var globalwin = false
var show = false
const timer = setInterval(time, 1000)
const flicker = setInterval(flick, 2000)
var color = []
var liepos = 0

//copypaste
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    //modal.style.display = "none";
  }
}

//copypaste

let reqGA, guessans=false, cluecount=0, guesscount=0, guesses=[]
addrow()
startInteraction()

function time() {
  seconds++
  sec.innerHTML = fill(seconds % 60)
  min.innerHTML = fill(parseInt(seconds % 3600 / 60))
  hr.innerHTML = fill(parseInt(seconds / 3600))
}

function flick() {
  let ans = "623-45+1679"
  if (show == false) {
    for (let i = 0; i < 8; i++){
      document.getElementById("s"+String(i)).textContent = ans[i]
      document.getElementById("a"+String(i)).textContent = ans[i]
      document.getElementById("c"+String(i)).textContent = ans[i]
      document.getElementById("s"+String(i)).style.color = "hsl(100, 100%, 50%)"
      document.getElementById("a"+String(i)).style.color = "hsl(100, 100%, 50%)"
    }
    for (let i = 0; i < 8; i++)
      document.getElementById("c"+String(i)).style.color = "hsl(100, 100%, 50%)"
    document.getElementById("liar").classList.add("lie")
    show = true
  }else{
    for (let i = 0; i < 8; i++){
      document.getElementById("s"+String(i)).textContent = "?"
      document.getElementById("a"+String(i)).textContent = "?"
      document.getElementById("s"+String(i)).style.color = "white"
      document.getElementById("a"+String(i)).style.color = "white"
    }
    for (let i = 0; i < 8; i++){
      document.getElementById("c"+String(i)).textContent = "?"
      document.getElementById("c"+String(i)).style.color = "white"
    }
    document.getElementById("liar").classList.remove("lie")
    document.getElementById("c8").textContent = "5"
    document.getElementById("c9").textContent = "7"
    document.getElementById("c10").textContent = "9"
    show = false
  }
}

function fill(n) {
  var str = n + ""
  if (str.length < 2) {
    return "0" + str
  } else {
    return str
  }
}

function startInteraction() {
  document.addEventListener("click", handleMouseClick)
  document.addEventListener("keydown", handleKeyPress)
}

function stopInteraction() {
  document.removeEventListener("click", handleMouseClick)
  document.removeEventListener("keydown", handleKeyPress)
}

function handleMouseClick(e) {
  if (e.target.matches("[data-editcolor]")) {
    if (e.target.dataset.editcolor=="no") {e.target.dataset.editcolor="cor";}
    else if  (e.target.dataset.editcolor=="cor") {e.target.dataset.editcolor="wro";}
    else if  (e.target.dataset.editcolor=="wro") {e.target.dataset.editcolor="blu";}
    else if  (e.target.dataset.editcolor=="blu") {e.target.dataset.editcolor="pur";}
    else if  (e.target.dataset.editcolor=="pur") {e.target.dataset.editcolor="no";}
    return
  }

  if (e.target.matches("[data-delete]")) {
    deleteKey()
    return
  }

  if (e.target.matches("[data-key]")) {
    pressKey(e.target.dataset.key)
    return
  }

  if (e.target.matches("[data-enter]")) {
    submitGuess()
    return
  }

  if (e.target.matches("[data-guessb]")) {
    if (guessans == false) {
      guessans = true;
      keyboard.querySelector("[data-guessb]").textContent = "Back";
      let answerTiless = [...getAnswerTiles()]
      for (let i = 0; i < answerTiless.length; i++) {
        answerTiless[i].dataset.error = "noerror";
      }
      guessansf();
    }else{
      guessans = false;
      guessGridb.querySelector('[data-guess="guess"]').remove();
      guessGridb.querySelector('[data-guess="guess"]').remove();
      guessGridb.querySelector('[data-guess="guess"]').remove();
      guessGridb.querySelector('[data-guess="guess"]').remove();
      guessGridb.querySelector('[data-guess="guess"]').remove();
      guessGridb.querySelector('[data-guess="guess"]').remove();
      guessGridb.querySelector('[data-guess="guess"]').remove();
      guessGridb.querySelector('[data-guess="guess"]').remove();
      guessGridb.innerHTML = '<div class="tile l1" data-letter="?"></div>\
    <div class="tile" data-guess="guess" id="b0">?</div>\
    <div class="tile" data-guess="guess" id="b1">?</div>\
    <div class="tile" data-guess="guess" id="b2">?</div>\
    <div class="tile" data-guess="guess" id="b3">?</div>\
    <div class="tile" data-guess="guess" id="b4">?</div>\
    <div class="tile" data-guess="guess" id="b5">?</div>\
    <div class="tile" data-guess="guess" id="b6">?</div>\
    <div class="tile" data-guess="guess" id="b7">?</div>\
    <div class="tile" data-letter="=" data-answer="guess">=</div>\
    <div class="tile" data-letter="?" data-answer="guess">'+String(targetAnswer)[0]+'</div>\
    <div class="tile" data-letter="?" data-answer="guess">'+String(targetAnswer)[1]+'</div>\
    <div class="tile" data-letter="?" data-answer="guess">'+String(targetAnswer)[2]+'</div>'
      keyboard.querySelector("[data-guessb]").textContent = "Guess";
      /*let guessTiles = guessGridb.querySelectorAll('[data-state="active"]');
      let lastTile = guessTiles[guessTiles.length - 1]
      while (lastTile != null) {
        lastTile.textContent = ""
        delete lastTile.dataset.state
        delete lastTile.dataset.error
        delete lastTile.dataset.letter
        activeTiles = guessGridb.querySelectorAll('[data-state="active"]')
        lastTile = activeTiles[activeTiles.length - 1]
      }*/
    }
    return
  }
}

function handleKeyPress(e) {
  if (e.key === "Enter") {
    submitGuess()
    return
  }

  if (e.key === "Backspace" || e.key === "Delete") {
    deleteKey()
    return
  }
  if (e.key.match(/^[0-9\+\-\*/]$/)) {
    pressKey(e.key)
    return
  }
}

function pressKey(key) {
  let activeTiles = getActiveTiles()
  if (activeTiles.length >= WORD_LENGTH) return
  if (guessans) {
    if (guessGridb.querySelectorAll('[data-state="active"]').length >= 8) return
    activeTiles = guessGridb.querySelectorAll('[data-state="active"]')
    let nextTile = guessGridb.querySelector(':not([data-letter])');
    nextTile.dataset.letter = key.toLowerCase()
    nextTile.textContent = key
    nextTile.dataset.state = "active"
  }
  else {
    let nextTile = guessGrid.querySelector(":not([data-letter])");
    nextTile.dataset.letter = key.toLowerCase()
    nextTile.textContent = key
    nextTile.dataset.state = "active"
  }
  let activeTiless = [...getActiveTiles()]
  if (guessans) {activeTiless = [...guessGridb.querySelectorAll('[data-state="active"]')]}
  let guess = activeTiless.reduce((word, tile) => {
    return word + tile.dataset.letter
  }, "")
  guess=ptchangerev(guess)
  let error= validExpression(guess,true)
  for (let i = 0; i < activeTiless.length; i++) {
  if (error[6+i] == '1') {activeTiless[i].dataset.error = "error";}
  else {activeTiless[i].dataset.error = "noerror";}
  }
  let reqGAcal=reqGA
  if (guessans) {reqGAcal=targetAnswer}
  if (activeTiles.length==WORD_LENGTH-1 && error.search('1') == -1 && eval(ptchange(guess))!=reqGAcal) {
    let answerTiless = [...getAnswerTiles()]
    if (guessans) {answerTiless = [...guessGridb.querySelectorAll('[data-answer="guess"]')]}
    for (let i = 0; i < answerTiless.length; i++) {
        answerTiless[i].dataset.error = "error";
    }
  }
  let calb=guessGridb.querySelector('.tile.l1')
  if (error.substr(1).search('1') == -1) {
    calb.textContent = calbb(guess, reqGAcal)
  }
  else if (error[1]==1) {calb.textContent = "leading or trailing operator error";}
  else if (error[2]==1) {calb.textContent = "leading zero error";}
  else if (error[3]==1) {calb.textContent = "consecutive operators error";}
  else {calb.textContent = "formula redundancy error";}
    
}

function deleteds(array) {
    let na=[]
    for (i=0;i<array.length;i++) {
        if (array[i]!='d') {
            na.push(array[i])
        }
    }
    return(na);
}

function calbdisplay(array) {
    na=[];
    for (i=0;i<array.length;i++) {
        if ("p-t/".search(array[i])!=-1) {na.push(array[i])}
        else {na.push(twodp(array[i]))}
    }
    return (ptchange(na.join('')))
}

function twodp(n) {
  return (Math.round(n*100)/100)
}

function calbb(formula, ans) {
  if (formula.search("/0")!=-1) {return("/0 error")}
  let hvpm=0;
  let output=ptchange(formula), endsym=formula[formula.length-1]
  if ("p-t/".search(endsym)==-1) {endsym="";}
  else {endsym; 
  formula=formula.substr(0,formula.length-1);}
  let t1=0,a=[], perform, change
  for (i=0; i<formula.length; i++) {
    if ("p-t/".search(formula[i])!=-1) {
      a.push(t1)
      a.push(formula[i])
      t1=0
    }
    else {
      t1=t1*10+parseInt(formula[i])
    }
  }
  a.push(t1)
  while (true) {
    if (a.length==1||
    (a.length==3 && (endsym=='t'||endsym=='/') && "p-".search(a[1])!=-1)) {break;}
    output+=" = ";
    change=0;
    perform='y';
    for (i=1; i<a.length-1; i++) {
        if (perform!='n'&&"t/".search(a[i])!=-1) {
            a[i-1]=eval(ptchange(a[i-1]+a[i]+a[i+1]));
            a[i]='d';
            a[i+1]='d';
            perform='n';
            change=1;
        }
        if ("p-".search(a[i])!=-1) {
            perform='r';
        }
    }
    a=deleteds(a)
    if (change==1) {output+=calbdisplay(a);
    output+=ptchange(endsym); continue;}
    for (i=1; i<a.length-1; i++) {
        if ("p-".search(a[i])!=-1) {
            hvpm=1;
            a[i-1]=eval(ptchange(a[i-1]+a[i]+a[i+1]));
            a[i]='d';
            a[i+1]='d';
            a=deleteds(a)
            output+=calbdisplay(a);
            output+=ptchange(endsym);
            continue;
        }
    }
  }
  output+=" "
  if (a.length==1) {
    if (endsym!="") {
      if (endsym=="p") {output+="("+twodp(ans-a[0])+")";}
      if (endsym=="-") {output+="("+twodp(a[0]-ans)+")";}
      if (endsym=="t") {output+="("+twodp(ans/a[0])+")";}
      if (endsym=="/") {output+="("+twodp(a[0]/ans)+")";}
    }
    else if (a[0]<ans) {
      if (hvpm==1 || a[0]==0) {
        output+="(+"+twodp(ans-a[0])+")";
      }
      else {
        output+="(+"+twodp(ans-a[0])+", *"+twodp(ans/a[0])+")";
      }
    }
    else if (a[0]>ans) {
      if (hvpm==1) {
        output+="(-"+twodp(a[0]-ans)+")";
      }
      else {
        output+="(-"+twodp(a[0]-ans)+", /"+twodp(a[0]/ans)+")";
      }
    }
    else {
      output+="(!!)";
    }
  }
  else {
    if (a[1]=="p" && endsym=="t") {output+="("+twodp((ans-a[0])/a[2])+")";}
    if (a[1]=="p" && endsym=="/") {output+="("+twodp(a[2]/(ans-a[0]))+")";}
    if (a[1]=="-" && endsym=="t") {output+="("+twodp((a[0]-ans)/a[2])+")";}
    if (a[1]=="-" && endsym=="/") {output+="("+twodp(a[2]/(a[0]-ans))+")";}
  }
  return (output)
}

function deleteKey() {
  let activeTiles = getActiveTiles()
  if (guessans) {
    let guessTile = guessGridb.querySelectorAll('[data-state="active"]');
    activeTiles = guessGridb.querySelectorAll('[data-state="active"]');
    let lastTile = guessTile[guessTile.length - 1]
    if (lastTile == null) return
    lastTile.textContent = ""
    delete lastTile.dataset.state
    delete lastTile.dataset.error
    delete lastTile.dataset.letter
  }
  else {
    let lastTile = activeTiles[activeTiles.length - 1]
    if (lastTile == null) return
    lastTile.textContent = ""
    delete lastTile.dataset.state
    delete lastTile.dataset.error
    delete lastTile.dataset.letter
  }

  let activeTiless = [...getActiveTiles()]
  if (guessans) {activeTiless = [...guessGridb.querySelectorAll('[data-state="active"]')]}
  let guess = activeTiless.reduce((word, tile) => {
    return word + tile.dataset.letter
  }, "")
  guess=ptchangerev(guess)
  let error= validExpression(guess,true)
  for (let i = 0; i < activeTiless.length; i++) {
  if (error[6+i] == '1') {activeTiless[i].dataset.error = "error";}
  else {activeTiless[i].dataset.error = "noerror";}
  }
  if (activeTiles.length==WORD_LENGTH) {
    let answerTiless = [...getAnswerTiles()]
    if (guessans) {answerTiless = [...guessGridb.querySelectorAll('[data-answer="guess"]')]}
    for (let i = 0; i < answerTiless.length; i++) {
        answerTiless[i].dataset.error = "noerror";
    }
  }
  let calb=guessGridb.querySelector('.tile.l1')
  if (error.substr(1).search('1') == -1) {
    calb.textContent = calbb(guess, reqGA)
  }
  else if (error[1]==1) {calb.textContent = "leading or trailing operator error";}
  else if (error[2]==1) {calb.textContent = "leading zero error";}
  else if (error[3]==1) {calb.textContent = "consecutive operators error";}
  else {calb.textContent = "formula redundancy error";}
}

function submitGuess() {
  if (guessans) {
    const guessTiles = [...guessGridb.querySelectorAll('[data-state="active"]')];
    if (guessTiles.length == 8) {
      const activeTiles = [...guessGridb.querySelectorAll(":not(.tile.l1)")]
      ansguess = guessTiles.reduce((word, tile) => {
        return word + tile.dataset.letter
      }, "")
      if (ansguess == targetWord) {
        globalwin=true;
        guesscount+=1;
        document.querySelector('#incguess').textContent="Guesses: "+guesscount
        activeTiles.forEach((...params) => flipTile(...params))
        clearInterval(timer)
        stopInteraction();
        return;
      }
      ansguess=ptchangerev(ansguess)
      if (validExpression(ansguess, true).search('1') != -1) {
        showAlert("Error in expression")
        shakeTiles(activeTiles, false)
        return
      }
      if (eval(ptchange(ansguess))!=targetAnswer) {
        showAlert("Expression mismatch answer")
        shakeTiles(activeTiles, false)
        return
      }
      if (guesses.includes(ansguess)) {showAlert("Repeated incorrect guess");}
      else {
        guesses.push(ansguess);
        guesscount+=1;
        showAlert("Incorrect guess")};
        document.querySelector('#incguess').textContent="Guesses: "+guesscount
      shakeTiles(guessTiles, true)
      return;
    }
    else {
      showAlert("Not enough characters")
      shakeTiles(guessTiles, true)
      return;
    }
  }

  const activeTiles = [...getActiveTiles()]

  let guess = activeTiles.reduce((word, tile) => {
    return word + tile.dataset.letter
  }, "")
  guess=ptchangerev(guess)
  if (activeTiles.length !== WORD_LENGTH) {
    showAlert("Not enough characters")
    shakeTiles(activeTiles, true)
    return
  }

  if (validExpression(guess, true).search('1') != -1) {
    showAlert("Error in expression")
    shakeTiles(activeTiles, false)
    return
  }

  let answerTiless = [...getAnswerTiles()]

  if (eval(ptchange(guess))!=reqGA) {
    showAlert("Expression mismatch guess")
    shakeTiles(answerTiless, true)
    return
  }

  stopInteraction()
  for (let i = 0; i < answerTiless.length; i++) {
        answerTiless[i].dataset.answer = "old";
    }
  
  lie()

  activeTiles.forEach((...params) => flipTile(...params))
}

function lie() {
  let liecolor = 0
  let notlying = true
  const activeTiles = [...getActiveTiles()]
    let guess = activeTiles.reduce((word, tile) => {
      return word + tile.dataset.letter
    }, "")
  while(notlying) {
    color = []
    for (let i = 0; i < 8; i++)
      color.push(checkpos(ptchangerev(guess), ptchangerev(targetWord), i))
    notlying = false
    liepos = Math.floor(Math.random()*8)
    liecolor = Math.floor(Math.random()*3)+1
    if (color[liepos] == liecolor){
      notlying = true
      continue
    }
    if (liecolor == 2)
      for (let i = 0; i < liepos; i++) 
        if (guess[liepos] == guess[i] && color[i] == 3) {
          notlying = true
          break
        }
    if (liecolor == 3)
      for (let i = liepos + 1; i < 8; i++)
        if (guess[liepos] == guess[i] && color[i] == 2) {
          notlying = true
          break
        }
  }
  color[liepos] = liecolor
}

function checkpos(g, a, i) {
  if (g[i] == a[i])
    return 1  
  for (let j = 0; j < g.length; j++){
    if (g[i] == a[j] && freq(i, g.length, g[i], g, a, 0))
      return 2
  }
  return 3
}

function freq(n,l,x,g,a,count) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] == x)
      count++;
  }
  for (let i = 0; i < l; i++){ 
    if (g[i] == x && i < n)
      count--;
    else if (g[i] == x && g[i] == a[i])
      count--;
  }
  return (count > 0) ? true : false;
}

function flipTile(tile, index, array) {
  const activeTiles = [...getActiveTiles()]
  let guess = activeTiles.reduce((word, tile) => {
    return word + tile.dataset.letter
  }, "")
  const check = color[index] //checkpos(ptchangerev(guess), ptchangerev(targetWord), index)
  const letter = tile.dataset.letter
  const key = keyboard.querySelector(`[data-key="${letter}"i]`)
  setTimeout( () => {
    tile.classList.add("flip")
  }, (index * FLIP_ANIMATION_DURATION) / 2)

  tile.addEventListener(
    "transitionend",
    () => {
      tile.classList.remove("flip")
      tile.dataset.state = "wrong"

      if (globalwin) {
      tile.textContent = (targetWord+"="+targetAnswer)[index];
      tile.dataset.state = "correct"
      } else if (check === 1) {
        tile.dataset.state = "correct"
        tile.dataset.editcolor = "no"
        key.classList.add("wrong")
      } else if (check === 2/*targetWord.includes(letter)*/) {
        tile.dataset.state = "wrong-location"
        tile.dataset.editcolor = "no"
        key.classList.add("wrong")
      } else {
        tile.dataset.state = "wrong"
        tile.dataset.editcolor = "no"
        key.classList.add("wrong")
      }

      if (liepos == index){
        tile.classList.add("lie")
      }

      if (index === array.length - 1) {
        tile.addEventListener(
          "transitionend",
          () => {
            if (!globalwin) {
            guessGridb.querySelector('.tile.l1').textContent=""
            cluecount+=1
            document.querySelector('#clues').textContent="Clues: "+cluecount
            addrow()
            startInteraction()
            }
            else {
            showAlert("You win!", 5000);
            danceTiles(guessGridb.querySelectorAll(":not(.tile.l1)"))
            var ele = document.getElementById("add_to_me").getElementsByClassName("tile lie")
            for (let i = 0; i < ele.length; i++)
              ele[i].classList.add("showlie")
            document.getElementById("ending").style.display = "inline";
            }
          },
          { once: true }
        )
      }
    },
    { once: true }
  )
}

function getActiveTiles() {
  return guessGrid.querySelectorAll('[data-state="active"]')
}

function getAnswerTiles() {
  return guessGrid.querySelectorAll('[data-answer="new"]')
}

function showAlert(message, duration = 1000) {
  const alert = document.createElement("div")
  alert.textContent = message
  alert.classList.add("alert")
  alertContainer.prepend(alert)
  if (duration == null) return

  setTimeout(() => {
    alert.classList.add("hide")
    alert.addEventListener("transitionend", () => {
      alert.remove()
    })
  }, duration)
}

function shakeTiles(tiles, all) {
  tiles.forEach(tile => {
    if (all||tile.dataset.error=="error") {
    tile.classList.add("shake")
    tile.addEventListener(
      "animationend",
      () => {
        tile.classList.remove("shake")
      },
      { once: true }
    )
    }
  })
}

function danceTiles(tiles) {
  tiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add("dance")
      tile.dataset.state="correct"
      tile.addEventListener(
        "animationend",
        () => {
          tile.classList.remove("dance")
        },
        { once: true }
      )
    }, (index * DANCE_ANIMATION_DURATION) / 5)
  })
}

//

function ci(string, i, char) {
  return string.substr(0,i)+char+string.substr(i+1)
}

function addrow() {
    reqGA=100+Math.floor(Math.random() * 900);
    while (reqGA==targetAnswer) {reqGA=100+Math.floor(Math.random() * 900);}
    document.getElementById("add_to_me").innerHTML += "<div class=\"tile\"></div>\
    <div class=\"tile\"></div>\
    <div class=\"tile\"></div><div class=\"tile\"></div>\
    <div class=\"tile\"></div><div class=\"tile\"></div>\
    <div class=\"tile\"></div><div class=\"tile\"></div>\
    <div class=\"tile\" data-letter=\"=\" data-answer=\"new\">=</div>\
    <div class=\"tile\" data-letter=\"?\" data-answer=\"new\">"+String(reqGA)[0]+"</div>\
    <div class=\"tile\" data-letter=\"?\" data-answer=\"new\">"+String(reqGA)[1]+"</div>\
    <div class=\"tile\" data-letter=\"?\" data-answer=\"new\">"+String(reqGA)[2]+"</div>"
}

function random(n, d, l){ 
    let sum = 0, c = 0;
    for (let i = 0; i < l; i++) {
        sum += d[i];
    }
    let r = Math.random()*sum + 1;
    for (let i = 0; i < l; i++){
        c += d[i];
        if (r <= c)
            return(n[i]);
    }
    return -1;
}

function genRE(flength, ban) {
    let n = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]
    let op = ['p','-','t','/'];
    let dg = ['0','1','2','3','4','5','6','7','8','9'];
    let opld = [12455,9200,6207,4933,11099,10277,7299,11025,5227,1358,1583];
    let opd = [2,6,4,30];
    let dgd = [2,1,1,1,1,1,1,1,1,1];
    let length8 = ["12356","4789","12AB","3469","158A","2347B"];
    let code = "123456789ABCDEFGHIJKLM";
    let length = ["",];
    let fformula = "xxxxxxxx", formula, o = [0,1,2,3], p = [0,1,2,3,4,5,6,7,8,9], opl, oplal=11;
    while (true) {
        formula = fformula;
        opl = random(n, opld, oplal);
        for (let i = 0; i < 6; i++) {
            if (length8[i].search(code[opl]) != -1)
                formula = formula.substr(0,i+1)+op[random(o,opd,4)]+formula.substr(i+2);
        }
        for (let i = 0; i < flength; i++){
            if (formula[i] == 'x')
                formula = formula.substr(0,i)+dg[random(p,dgd,10)]+formula.substr(i+1);
        }
        if (validExpression(formula, ban).search('1') != -1)
            continue;
        formula=ptchange(formula);
        let so = eval(formula);
        if (Math.floor(so) != Math.ceil(so))
            continue;
        if (so < 100 || so > 999)
            continue;
        break;
    }
    return formula;
}

function ptchange(formula) {
  for (let i = 0; i < formula.length; i++){
            if (formula[i] == 'p')
                formula = formula.substr(0,i)+'+'+formula.substr(i+1);
            if (formula[i] == 't')
                formula = formula.substr(0,i)+'*'+formula.substr(i+1);
        }
  return formula;
}

function ptchangerev(formula) {
  for (let i = 0; i < formula.length; i++){
            if (formula[i] == '+')
                formula = formula.substr(0,i)+'p'+formula.substr(i+1);
            if (formula[i] == '*')
                formula = formula.substr(0,i)+'t'+formula.substr(i+1);
        }
  return formula;
}

function validExpression(g, ban) {
    let flength=g.length;
    let errortype="000000";
    let errorpos="00000000"
    if (flength!=8) {errortype=ci(errortype,0,'1');}
    let num="1234567890", op="p-t/", numop="1234567890p-t/", ptd="pt/", td="t/";
    if (flength>=2&&g[0]=='0'&&(num.search(g[1])!=-1)) {errortype=ci(errortype,2,'1'); errorpos = ci(errorpos,0,'1');}
    //leadingzero
    for ( i=0; i<flength;i++) {
        if ((i==0||i==7)&&(op.search(g[i])!=-1)) {errortype=ci(errortype,1,'1'); errorpos = ci(errorpos,i,'1');} 
        //check for no leading or trailing operations
        if (i>=2&&(op.search(g[i-2])!=-1)&&g[i-1]=='0'&&(num.search(g[i])!=-1)) {errortype=ci(errortype,2,'1'); errorpos = ci(errorpos,i-1,'1');}
        //check for no leading zeroes
        if (i>=1&&(op.search(g[i-1])!=-1)&&(op.search(g[i])!=-1)) {errortype=ci(errortype,3,'1'); errorpos = ci(errorpos,i,'1'); errorpos = ci(errorpos,i-1,'1');}
        //check for no consecutive operators
        if (ban==true) {
            if (i>=2&&(op.search(g[i-2])!=-1)&&g[i-1]=='0'&&(op.search(g[i])!=-1)) {errortype=ci(errortype,5,'1'); errorpos = ci(errorpos,i-2,'1'); errorpos = ci(errorpos,i-1,'1');}
            if (i>=2&&(td.search(g[i-2])!=-1)&&g[i-1]=='1'&&(op.search(g[i])!=-1)) {errortype=ci(errortype,5,'1'); errorpos = ci(errorpos,i-2,'1'); errorpos = ci(errorpos,i-1,'1');}
            if (i>=2&&(op.search(g[i-2])!=-1)&&g[i-1]=='1'&&(g[i]=='t')) {errortype=ci(errortype,5,'1'); errorpos = ci(errorpos,i-1,'1'); errorpos = ci(errorpos,i,'1');}
            //prohibits redundant 0+*/ or +-*/0 or 1* or */1
        }
    }
    if (flength>=2) {
        if (g[0]=='0'&&(ptd.search(g[1])!=-1)) {errortype=ci(errortype,5,'1'); errorpos = ci(errorpos,0,'1'); errorpos = ci(errorpos,1,'1');}
        if (g[0]=='1'&&(g[1]=='t')) {errortype=ci(errortype,5,'1'); errorpos = ci(errorpos,0,'1'); errorpos = ci(errorpos,1,'1');}
        if (flength==8) {
        if (g[flength-1]=='0'&&(op.search(g[flength-2])!=-1)) {errortype=ci(errortype,5,'1'); errorpos = ci(errorpos,flength-1,'1'); errorpos = ci(errorpos,flength-2,'1');}
        if (g[flength-1]=='1'&&(td.search(g[flength-2])!=-1)) {errortype=ci(errortype,5,'1'); errorpos = ci(errorpos,flength-1,'1'); errorpos = ci(errorpos,flength-2,'1');}
        }
        //prohibits redundant 0+*/ or +-*/0 or 1* or */1
    }
    return (errortype+errorpos);
}

function guessansf() {
  guessGridb.querySelector('.tile.l1').textContent = ""
  let activeTiles = getActiveTiles()
  let lastTile = activeTiles[activeTiles.length - 1]
  while (lastTile != null) {
    lastTile.textContent = ""
    delete lastTile.dataset.state
    delete lastTile.dataset.error
    delete lastTile.dataset.letter
    activeTiles = getActiveTiles()
    lastTile = activeTiles[activeTiles.length - 1]
  }
  guessGridb.innerHTML = '<div class="tile l1" data-letter="?"></div>\
    <div class="tile" data-guess="guess" data-input=\"input\" id="b0"> </div>\
    <div class="tile" data-guess="guess" data-input=\"input\" id="b1"> </div>\
    <div class="tile" data-guess="guess" data-input=\"input\" id="b2"> </div>\
    <div class="tile" data-guess="guess" data-input=\"input\" id="b3"> </div>\
    <div class="tile" data-guess="guess" data-input=\"input\" id="b4"> </div>\
    <div class="tile" data-guess="guess" data-input=\"input\" id="b5"> </div>\
    <div class="tile" data-guess="guess" data-input=\"input\" id="b6"> </div>\
    <div class="tile" data-guess="guess" data-input=\"input\" id="b7"> </div>\
    <div class="tile" data-letter="=" data-answer="guess">=</div>\
    <div class="tile" data-letter="?" data-answer="guess">'+String(targetAnswer)[0]+'</div>\
    <div class="tile" data-letter="?" data-answer="guess">'+String(targetAnswer)[1]+'</div>\
    <div class="tile" data-letter="?" data-answer="guess">'+String(targetAnswer)[2]+'</div>'
}