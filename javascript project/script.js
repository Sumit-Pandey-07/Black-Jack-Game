//Challenge 1
function ageIndays() {
    var birthyear=prompt('What year you were Born...Good Friend');
    var ageIndayss=(2021-birthyear)*365;
    var h1=document.createElement('h1');
    var textanswer=document.createTextNode('You are '+ ageIndayss + ' days old');
    h1.setAttribute('id','ageIndays');
    h1.appendChild(textanswer);
    document.getElementById('flex-box-result').appendChild(h1);   
}
function reset() {
    document.getElementById('ageIndays').remove();
}
//cat generator
function generatecat() {
    var image=document.createElement('img');
    var div=document.getElementById('flex-cat-gen');
    image.src="http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}
//rock,paper,scissors
function rpsgame(yourchoice) {
    console.log(yourchoice);
    var humanchoice,botchoice;
    humanchoice=yourchoice.id;
    botchoice=numbertochoice(randomnorps());
    console.log('computer choice:',botchoice);
    
    results=decidewinner(humanchoice,botchoice);//(0,1) humanlost botwon
    console.log(results);
    
    message=finalmessage(results);//(message:'you won',color:'grey')
    console.log(message);
    rpsfrontend(yourchoice.id,botchoice,message);
}

function randomnorps() {
    return Math.floor(Math.random()*3);
}
function numbertochoice(number) {
    return['rock','paper','scissors'][number];
}

function decidewinner(yourchoice,computerchoice) {
    var rpsdatabase={
        'rock':{'scissors':1,'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'rock':0,'paper':1,'scissors':0.5},
    };
    var yourscore=rpsdatabase[yourchoice][computerchoice];//it will go to database and take my choice and bot choice and return its value eg if i pick rock and pc scissors so i return 1

    var computerscore=rpsdatabase[computerchoice][yourchoice];
    return [yourscore,computerscore];
}
function finalmessage([yourscore, computerscore]) {
    if(yourscore===0){
        return {'message':'You Lost!','color':'red'};
    }
    else if(yourscore===0.5){
        return {'message':'You Tied!','color':'yellow'};
    }
    else{
        return {'message':'You Won!','color':'green'};
    }

}
function rpsfrontend(humanimagechoice,botimagechoice,finalmessage) {
    var imagesdatabase={
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }
    //rempoving rest of images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humandiv=document.createElement('div');
    var botdiv=document.createElement('div');
    var messagediv=document.createElement('div');

    humandiv.innerHTML="<img src='"+imagesdatabase[humanimagechoice]+"' height=150 width=150 style='box-shadow: 0px 10px 50px rgb(46, 20, 160);'>"
    
    messagediv.innerHTML="<h1 style='color:"+finalmessage['color']+";font-size: 60px; padding: 30px; '>"+finalmessage['message']+"</h1>"

    botdiv.innerHTML="<img src='"+imagesdatabase[botimagechoice]+"' height=150 width=150 style='box-shadow: 0px 10px 50px rgb(243,38,24,1);'>"
    
    
    document.getElementById('flex-box-rps-div').appendChild(humandiv);
    document.getElementById('flex-box-rps-div').appendChild(messagediv);
    document.getElementById('flex-box-rps-div').appendChild(botdiv);
    
}
//challenge 4 black jack
let blackjackgame={
    'you':{'scorespan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scorespan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsmap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draw':0,
    'stand':false,
    'turnsover':false,
};
const YOU=blackjackgame['you']
const DEALER=blackjackgame['dealer']
const hitsound=new Audio('sounds/swish.m4a');
const winsound=new Audio('sounds/cash.mp3');
const losssound=new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackhit);

document.querySelector('#blackjack-stand-button').addEventListener('click',dealerlogic);

document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackdeal);

function blackjackhit() {
    if (blackjackgame['stand']===false) {
        let card=randomcard();
        showcard(card,YOU);
        updatescore(card,YOU);
        showscore(YOU)    
    }
}

function randomcard() {
    let randomindex=Math.floor(Math.random()*13);
    return blackjackgame['cards'][randomindex];
}

function showcard(card,activePlayer) {
    if(activePlayer['score']<=21){
    let cardimage=document.createElement('img');
    cardimage.src=`images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardimage);
    hitsound.play();
    }

}

function blackjackdeal() {
    if (blackjackgame['turnsover']===true) {
        blackjackgame['stand']=false;
        
    let yourimages=document.querySelector('#your-box').querySelectorAll('img');
    let dealerimages=document.querySelector('#dealer-box').querySelectorAll('img');
    for(i=0;i<yourimages.length;i++){
        yourimages[i].remove();
    }
    for(i=0;i<dealerimages.length;i++){
        dealerimages[i].remove();
    }
    YOU['score']=0;
    DEALER['score']=0;
    document.querySelector('#your-blackjack-result').textContent=0;
    document.querySelector('#dealer-blackjack-result').textContent=0;

    document.querySelector('#your-blackjack-result').style.color='#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color='#ffffff';
    document.querySelector('#blackjack-result').textContent="LET'S PLAY";
    document.querySelector('#blackjack-result').style.color='black';
    blackjackgame['turnsover']=true;
    }
    
}

function updatescore(card,activePlayer){
    if(card ==='A'){
    //if adding 11 keeps me below 21,add 11 else add 1
    if (activePlayer['score']+blackjackgame['cardsmap'][card][1]<=21) {
        activePlayer['score']+=blackjackgame['cardsmap'][card][1];
    }
    else{
        activePlayer['score']+=blackjackgame['cardsmap'][card][0];
    }
   }
    else{
        activePlayer['score']+=blackjackgame['cardsmap'][card];
    }
}

function sleep(ms) {
    return new Promise(resolve=>setTimeout(resolve,ms));
}

function showscore(activePlayer) {
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scorespan']).textContent='BUST!';
        document.querySelector(activePlayer['scorespan']).style.color='red';
    }
    else{
    document.querySelector(activePlayer['scorespan']).textContent=activePlayer['score'];
    }
}

async function dealerlogic() {
    blackjackgame['stand']=true;

    while (DEALER['score']<16 && blackjackgame['stand']===true) {
        let card=randomcard();
    showcard(card,DEALER);
    updatescore(card,DEALER);
    showscore(DEALER);
    await sleep(1000);
    }

    
        blackjackgame['turnsover']=true;
        let winner=computewinner();
        showresult(winner);
        
}

// compute winnner who won the game and update wins and loss
function computewinner() {
    let winnner;
    if(YOU['score']<=21){
        //condition : higher score than dealer or dealer busts but you're 21 or under
        if(YOU['score']>DEALER['score'] ||( DEALER['score']>21)){
            blackjackgame['wins']++;
            winnner=YOU;
        }
        else if (YOU['score']<DEALER['score']) {
            blackjackgame['losses']++;
            winnner=DEALER;            
        }
        else if (YOU['score']===DEALER['score']) {
            blackjackgame['draw']++;
        }
    }
        //conditioon when you bust but dealer dosent bust
        else if (YOU['score']>21 && DEALER['score']<=21) {
            blackjackgame['losses']++;
            winnner=DEALER;
        }
        //condition when YOu and DEALER Bust
        else if (YOU['score']>21 && DEALER['score']>21) {
            blackjackgame['draw']++;
        }
    console.log(blackjackgame);
    return winnner;
}
function showresult(winnner) {
    let message,messagecolor;

    if (blackjackgame['turnsover']===true) {
        if (winnner===YOU) {
            document.querySelector('#wins').textContent=blackjackgame['wins'];
            message='YOU WON!!!!';
            messagecolor='green';
            winsound.play();
        }
        else if (winnner===DEALER) {
            document.querySelector('#loses').textContent=blackjackgame['losses'];
            message='YOU LOST!';
            messagecolor='red';
            losssound.play();
        }
        else{
            document.querySelector('#draws').textContent=blackjackgame['draw'];
            message='YOU DREW!'
            messagecolor='black'
        }
        document.querySelector('#blackjack-result').textContent=message;
        document.querySelector('#blackjack-result').style.color=messagecolor;    
    }    
}




// //minifief version of blackjackdeal
// function blackjackdeal(){if(blackjackgame.turnsover===!0){blackjackgame.stand=!1;let yourimages=document.querySelector('#your-box').querySelectorAll('img');let dealerimages=document.querySelector('#dealer-box').querySelectorAll('img');for(i=0;i<yourimages.length;i++){yourimages[i].remove()}
// for(i=0;i<dealerimages.length;i++){dealerimages[i].remove()}
// YOU.score=0;DEALER.score=0;document.querySelector('#your-blackjack-result').textContent=0;document.querySelector('#dealer-blackjack-result').textContent=0;document.querySelector('#your-blackjack-result').style.color='#ffffff';document.querySelector('#dealer-blackjack-result').style.color='#ffffff';document.querySelector('#blackjack-result').textContent="LET'S PLAY";document.querySelector('#blackjack-result').style.color='black';blackjackgame.turnsover=!0}}