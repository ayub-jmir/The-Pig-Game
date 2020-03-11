/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as they wish. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- if a player gets two 6's in a row, they lost their progress and start again
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach given or by default 20 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, inGame = true, getScore;


init();


function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    inGame = true;
    

    //set all values to 0

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector(".final-score").value = "";
    // document.querySelector('#current-' + activePlayer).textContent = dice;

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

//Check if previous and current are 6 then reset the score for that player
let oldDice;

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(inGame)
    {
    //take random dice number between 1 and 6
        var dice = Math.floor(Math.random() * 6) + 1;
        let diceDOM = document.querySelector('.dice');
        

    //Make the dice visible
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        if(oldDice === 6 && dice === 6){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        }
        else if(dice > 1)
        {
        //add score else necxt player
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;

        }else{
       
       nextPlayer();
        }
        console.log(dice);
        oldDice = dice;
    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if(inGame){
        //add current score to the global score

        scores[activePlayer] += roundScore;

        //update UI
      

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        let input = document.querySelector(".final-score").value;
        
        if(input){
            getScore = input;
        }else{
            getScore = 20;
        }
        //check if user won
        if(scores[activePlayer] >= getScore){
            document.querySelector('#name-' + activePlayer).textContent = "WINNER!";
            document.querySelector('.dice').style.display = 'none';
            
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            inGame = false;

        }else{
            nextPlayer();
        }
    }

});


function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    //reset values
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //chnage user easily by toggle method
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}