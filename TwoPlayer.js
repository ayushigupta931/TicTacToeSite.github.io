let player_one_score = document.getElementById('player_1_score')
let player_two_score = document.getElementById('player_2_score')
let reset = document.getElementById('reset')
let msg = document.getElementById('message')
let PlayAgain = document.getElementById('playAgain')

PlayAgain.addEventListener('click', playAgain)

let Btns = document.querySelectorAll('.btn')
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

let player_1_name = document.getElementById('player_1')
let player_2_name = document.getElementById('player_2')

let play = document.getElementById('play')
play.addEventListener('click',()=>{

    let P1name = document.getElementById('P1name').value.toString()
    let P2name = document.getElementById('P2name').value.toString()
    
    if(P1name.trim() == "")
        player_1_name.textContent = "PLAYER 1"
    else
        player_1_name.textContent = P1name
    
    if(P2name.trim() == "")
        player_2_name.textContent = "PLAYER 2"
    else
        player_2_name.textContent = P2name


    player_1_name.style.textDecoration = 'underline'
    document.getElementById('options').style.visibility = 'hidden'
    document.getElementById('base').style.visibility = 'visible'
})

//player 1 = 1 (x)
//player 2 = 0 (0)
let gameBoard = [0,2,2,2,2,2,2,2,2,2]

//winning combinations
//row : {1,2,3}, {4,5,6}, {7,8,9}
//column : {1,4,7} ,{2,5,8}, {3,6,9}
//diagonal : {1,5,9}, {3,5,7}
let winningComb = [[1,2,3], [4,5,6], [7,8,9], [1,4,7] ,[2,5,8], [3,6,9], [1,5,9], [3,5,7]]

let count = 0
let p1 = 0
let p2 = 0

//k=1 : player 1 wins
//k=0 : player 2 wins
//k=2 : tie
let k = -1


//player 1 = true
//player 2 = false
let player = true

let buttons = document.querySelectorAll('.button')

buttons.forEach(function fun(element){


    element.addEventListener('mouseover',()=>{
        element.style.background = '#8D6E63'
    })

    
    
    element.addEventListener('mouseout',()=>{
        element.style.background = '#4E342E'
    })

    element.addEventListener('click',()=>{
        
        var id = element.id.toString()
        var gameBoardPointer = parseInt(id.slice(id.length-1,id.length))
        
        if(element.innerHTML.trim() == "" && PlayAgain.style.visibility != 'visible'){
            var text
            if(player){
                text = "x"
                element.textContent = text
                gameBoard[gameBoardPointer] = 1
                
            }
            else{
                text = "o"
                element.textContent = text
                gameBoard[gameBoardPointer] = 0
            
            }
            count +=1
            player = !(player)
            if(player){
                player_1_name.style.textDecoration = 'underline'
                player_2_name.style.textDecoration ='none'
            }
            else{
                player_2_name.style.textDecoration = 'underline'
                player_1_name.style.textDecoration ='none'
            }

            if(checkWinner() || count == 9){
            
                player_1_name.style.textDecoration = 'none'
                player_2_name.style.textDecoration ='none'
                if(count == 9 && k == -1){
                    k = 2
                }

                if(k == 1){
                    p1 += 1
                    player_one_score.textContent = p1.toString()
                    let text = "" + player_1_name.textContent + "  won the game!"
                    msg.textContent = text
                    
                }
                else if(k == 0){
                    p2 += 1
                    player_two_score.textContent = p2.toString()
                    msg.textContent = "" + player_2_name.textContent + "  won the game!" 
                    
                }
                else if(k == 2){
                    msg.textContent = "It's a tie!"
                }
                msg.style.visibility = 'visible'
                PlayAgain.style.visibility = 'visible'
                
            }
        }
    })
})


function checkWinner(){
    k = -1
    let result = false
    winningComb.forEach(function fn(element){
        if(gameBoard[element[0]] == gameBoard[element[1]] && gameBoard[element[1]] == gameBoard[element[2]] && gameBoard[element[0]] == 1){
                k=1
                result = true
            
        }
        else if(gameBoard[element[0]] == gameBoard[element[1]] && gameBoard[element[1]] == gameBoard[element[2]] && gameBoard[element[0]] == 0){
                k=0
                result = true
        
        }
    })

    return result
}

function playAgain(){
    player_1_name.style.textDecoration = 'underline'
    PlayAgain.style.visibility = 'hidden'
    msg.style.visibility = 'hidden'
    k =-1
    player = true
    count =0
    var i =1
    buttons.forEach(function fn(element){
        element.textContent = ""
        gameBoard[i] = 2
        i++
    })
}

reset.addEventListener('click',()=>{
    player_1_name.style.textDecoration = 'underline'
    PlayAgain.style.visibility = 'hidden'
    msg.style.visibility = 'hidden'
    k = -1
    player = true
    player_two_score.textContent = "0"
    player_one_score.textContent = "0"
    p1 =0
    p2 =0
    count =0
    let i =1
    buttons.forEach(function fn(element){
        element.textContent = ""
        gameBoard[i] = 2
        i++
    })
})



