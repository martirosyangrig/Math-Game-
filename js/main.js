"use strict"
const btns = document.querySelectorAll(".lvl_btns > button");
const options = document.querySelectorAll(".options_checkbox > label > input");
const setting_wrapper = document.querySelector(".settings_wrapper");
const gameStart = document.querySelector(".game_start");
const userScore =document.querySelector(".user_score");
const setAnswere = document.querySelector(".set_answere > input");
const form = document.querySelector("form");
const gameQuestion =document.querySelector(".game_question")
let time = document.querySelector(".time")
const questionNumber = document.querySelector(".n_question");
const resetBtn = document.querySelector(".game_header> button")



let charArr; // contains every number and symbol of every question to use in chekAnswere function
let quet = 0; // for saving question numbers


let gameSettings = { // game settings when user choose level and options
    option: [],
    level: ""
}

let user = { // user with his default points
    point: 1
}

resetBtn.addEventListener("click", ()=>{ // reset btn if you want to start the game again
    location.reload();
})


function setSettings(){
    btns.forEach((btn)=>{
        btn.addEventListener("click", ()=>{
            let test = 0;
            options.forEach(opt=>{
                if(opt.checked){
                    test++
                }
            })
            if(test == 0){
                alert("pleasy chose smt")
            }else{
                gameSettings.level = btn.textContent;
                setting_wrapper.style.display = "none";
                gameStart.style.display = "flex";
                questionGenerator()
            }
            
        })
    });
    
    options.forEach((chek)=>{
        chek.addEventListener("change", (e)=>{
            if(e.target.checked){
                gameSettings.option.push(e.target.name) 
            }
        })
    })
}

setSettings()



function setScore(){ // updating user point 
    userScore.textContent = user.point;
}

let id; // id for interval

function timing(){ // function for timeing for each question 
   let mainTime = 0;
    if(gameSettings.level === "Easy"){
        mainTime = 20
    }else if(gameSettings.level === "Medium"){
        mainTime = 15
    }else{
        mainTime = 8
    }
   
    id = setInterval(()=>{
        time.textContent = mainTime;
        mainTime--
        if(mainTime < 0){
            clearInterval(id)
            user.point--
            setScore()
            detectUserStatus()
            questionGenerator()
            
        }

    }, 850)

    
   
}

function randomInteger(min, max) { //raandom integer
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function numGenerator(){ // returns random nums ( depends  on lvl) and random operator which user choose
    let num1; 
    let num2;

    if(gameSettings.level === "Easy"){
        num1 = randomInteger(0, 10)
        num2 = randomInteger(0, 10)
    }else if(gameSettings.level === "Medium"){
        num1 = randomInteger(10, 100)
        num2 = randomInteger(10, 100)
    }else if(gameSettings.level === "Difficult"){
        num1 = randomInteger(100, 999)
        num2 = randomInteger(100, 999)
    }

    const option =  gameSettings.option[Math.floor(Math.random() * gameSettings.option.length)]

     return [num1 ,num2, option]
    
}



function questionGenerator(){ // generate our question in main div

    const rand = numGenerator()
    charArr = rand;
    const [num1, num2, option] = rand
    quet++; 
    questionNumber.textContent =  quet
    gameQuestion.innerHTML  = `
        ${num1}${option}${num2}
    `
    timing()
        
    
}



function chekAnswere(){ // checking our answere if correct incriment user poin if not discriment
    
    form.addEventListener("submit", (e)=>{
        e.preventDefault()
        
        const [a,b,c] = charArr;
        const val = setAnswere.value

        if(val != ""){
            if(val.trim() == parseInt(chekRealAnswere(a, b, c))){
                user.point++
                setScore()
                detectUserStatus()
                clearInterval(id);
            }else{
                user.point--;
                setScore()
                detectUserStatus();
                clearInterval(id);
            }
            questionGenerator()
        }

        e.target.reset()
        console.log(user.point);
      
    })
    
}
chekAnswere()


function chekRealAnswere(x, y, sign){ //function for calculating our question and returning the answere
    switch (sign) {
      case "+":
            return x + y;
      case "-":
            return x - y;
      case "*":
            return x * y;
      case "/":
            return x / y;

    }
   
}

function detectUserStatus(){  //detecting if user win or loose
    if(user.point >= 50){
        alert("you win")
       
        location.reload();

    }else if(user.point <= 0){
        alert("you lost")
       
        location.reload();
    }
    
}

