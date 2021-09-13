let player_score = document.getElementById('player_score')
let bot_score = document.getElementById('bot_score')
let reset = document.getElementById('reset')
let player_name = document.getElementById('player_name')
let buttons = document.querySelectorAll('.button')
let msg = document.getElementById('message')
let PlayAgain = document.getElementById('playAgain')

var firstMove

PlayAgain.addEventListener('click', ()=>{
    firstMove = confirm("Do you want to make first move?")
    playAgain()
})

let shapeP
let shapeBot


//player  = 1 
//bot = 0 
let gameBoard = [0,2,2,2,2,2,2,2,2,2]

//winning combinations
//row : {1,2,3}, {4,5,6}, {7,8,9}
//column : {1,4,7} ,{2,5,8}, {3,6,9}
//diagonal : {1,5,9}, {3,5,7}
let winningComb = [[1,2,3], [4,5,6], [7,8,9], [1,4,7] ,[2,5,8], [3,6,9], [1,5,9], [3,5,7]]

let count = 0
let p = 0
let bot = 0

//k=-1 : player  wins
//k=1 : bot wins
//k=0 : tie
let k = -2


let options = document.querySelectorAll('.Button')
options.forEach(function f(element){
    element.addEventListener('click', ()=>{
        if(element.style.color == 'lightcyan'){
        element.style.background = 'lightcyan'
        element.style.color = '#4E342E'
    }
    else{
        let cross = document.getElementById('cross')
        let zero = document.getElementById('zero')
        let yes = document.getElementById('yes')
        let no = document.getElementById('no')
        
        if(element.id == 'yes' || element.id == "no"){
            yes.style.background = 'lightcyan'
            yes.style.color = '#4E342E'
            no.style.background = 'lightcyan'
            no.style.color = '#4E342E'
        }
        else{
            cross.style.background = 'lightcyan'
            cross.style.color = '#4E342E'
            zero.style.background = 'lightcyan'
            zero.style.color = '#4E342E'
        }

        element.style.background = '#4E342E'
        element.style.color = 'lightcyan'

    }
    })
})



let Btns = document.querySelectorAll('.btns')
Btns.forEach(function f(element){
    element.addEventListener('mouseover',()=>{
        element.style.background = '#4E342E'
        element.style.color = 'lightcyan'
    })
     element.addEventListener('mouseout',()=>{
        element.style.background = 'lightcyan'
        element.style.color = '#4E342E'
    })
})



let play = document.getElementById('play')
play.addEventListener('click',()=>{
     
    let Pname = document.getElementById('name').value.toString()
    let cross = document.getElementById('cross').style.color
    let zero = document.getElementById('zero').style.color
    let yes = document.getElementById('yes').style.color
    let no = document.getElementById('no').style.color
    
    if((cross != 'lightcyan' && zero != 'lightcyan') || (yes != 'lightcyan' && no != 'lightcyan'))
        alert("You have not selected any option!")

    else{
        if(cross == 'lightcyan'){
            shapeP ='x'
            shapeBot = 'o'
        }
        else{
            shapeP ='o'
            shapeBot = 'x'
        }

        if(yes != 'lightcyan'){
            gameBoard[1] = 0
            buttons[0].textContent = shapeBot  
            count++
        }
        
    

        if(Pname.trim() == "")
            player_name.textContent = "PLAYER"
        else
            player_name.textContent = Pname
    
        document.getElementById('options').style.visibility = 'hidden'
        document.getElementById('base').style.visibility = 'visible'
    } 
    
})



buttons.forEach(function f(element){

    
    element.addEventListener('mouseover',()=>{
        element.style.background = '#8D6E63'
    })

     element.addEventListener('mouseout',()=>{
        element.style.background = '#4E342E'
    })

    element.addEventListener('click', ()=>{
        let id = element.id.toString()
        let gameBoardPointer = parseInt(id.slice(id.length-1,id.length))

        if(element.innerHTML.trim() == "" && PlayAgain.style.visibility != 'visible'){
            element.textContent = shapeP
            gameBoard[gameBoardPointer] = 1
            count++
        
      
        if(checkWinnerOrTie()){
            gameCompleted()
            PlayAgain.style.visibility = 'visible'
            return
        }

        chooseBestMove()
        count++
      
        if(checkWinnerOrTie()){
            gameCompleted()
            PlayAgain.style.visibility = 'visible'
        }
    }
    })
})


function checkWinnerOrTie(){
    let result = false
    k =-2

    if(count == 9){
        result = true
        k =0
    }
        
        
    winningComb.forEach(function fn(element){
        if(gameBoard[element[0]] == gameBoard[element[1]] && gameBoard[element[1]] == gameBoard[element[2]] && gameBoard[element[0]] == 1){
                k= -1
                result = true
            
        }
        else if(gameBoard[element[0]] == gameBoard[element[1]] && gameBoard[element[1]] == gameBoard[element[2]] && gameBoard[element[0]] == 0){
                k= 1
                result = true
        
        }
    })

    return result
}


function gameCompleted(){
    if(k==1){
        bot +=1
        bot_score.textContent = bot.toString()
        msg.textContent = "Bot won the game!"
    }
    else if(k==-1){
        p++
        player_score.textContent = p.toString()
        msg.textContent = "" + player_name.textContent + "  won the game!"
    }
    else if(k==0){
        msg.textContent = "It's a tie "
    }
    msg.style.visibility = 'visible'
}


function chooseBestMove(){
    
    let bestScore = Number.NEGATIVE_INFINITY
    let bestMove = 0
    
    buttons.forEach(function fn(element){
        let id = element.id.toString()
        let gameBoardPointer = parseInt(id.slice(id.length-1,id.length))
         
        
        if(element.innerHTML.trim() == ""){
            element.textContent = shapeBot
            gameBoard[gameBoardPointer] = 0
            count++
            let score = minimax(false)
            element.textContent = ""
            gameBoard[gameBoardPointer] = 2
            count--

            if(score > bestScore){
                
                bestScore = score
                bestMove = gameBoardPointer
            }
        }
    })

    
    let bestId = "button_" + bestMove.toString()
    document.getElementById(bestId).textContent = shapeBot
    gameBoard[bestMove] = 0
    
    
}

function minimax(isMaximizing){
    if (checkWinnerOrTie()){
        return k*(10 - count)
    }

    if(isMaximizing){
        let bestScore = Number.NEGATIVE_INFINITY
        
        buttons.forEach(function fn(element){
        let id = element.id.toString()
        let gameBoardPointer = parseInt(id.slice(id.length-1,id.length))

        if(element.innerHTML.trim() == ""){
            element.textContent = shapeBot
            gameBoard[gameBoardPointer] = 0
            count++
            let score = minimax(false)
            element.textContent = ""
            gameBoard[gameBoardPointer] = 2
            count--

            if(score > bestScore){
                bestScore = score
            }
        }
    })

    return bestScore
    }

    else{
        let bestScore = Number.POSITIVE_INFINITY
        
        buttons.forEach(function fn(element){
        let id = element.id.toString()
        let gameBoardPointer = parseInt(id.slice(id.length-1,id.length))

        if(element.innerHTML.trim() == ""){
            element.textContent = shapeP
            gameBoard[gameBoardPointer] = 1
            count++
            let score = minimax(true)
            element.textContent = ""
            gameBoard[gameBoardPointer] = 2
            count--

            if(score < bestScore){
                bestScore = score
            }
        }
    })

    return bestScore
    }
}

function playAgain(){
    msg.style.visibility = 'hidden'
    PlayAgain.style.visibility = 'hidden'
    k =-1
    count =0
    var i =1
    buttons.forEach(function fn(element){
        element.textContent = ""
        gameBoard[i] = 2
        i++
    })
     if(!firstMove){
        gameBoard[1] = 0
            buttons[0].textContent = shapeBot  
            count++
    }
}

reset.addEventListener('click',()=>{
    msg.style.visibility = 'hidden'
    PlayAgain.style.visibility = 'hidden'
    k = -1
    player_score.textContent = "0"
    bot_score.textContent = "0"
    p = 0
    bot = 0
    count =0
    var i =1
    buttons.forEach(function fn(element){
        element.textContent = ""
        gameBoard[i] = 2
        i++
    })
})
