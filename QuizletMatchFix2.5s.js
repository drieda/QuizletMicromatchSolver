document.querySelector('.UIButton--hero').addEventListener('click', function(){
    
    setTimeout(bot,8);
    
    
});

//fix 2.5s;

var k,j;
var currentCards = [],current,word,def;
var terms = Quizlet.matchModeData.terms;
var length = terms.length;
var event = new PointerEvent('pointerdown');

function bot (){
    console.log('bot running');
    currentCards = document.querySelectorAll('.MatchModeQuestionGridTile');
    //currentCards = getItems();
    
    console.log(currentCards);
    currentCards[0].dispatchEvent(event);
    //console.log(currentCards[i].innerText);
    current=currentCards[0].textContent; //def vagy word

    console.log('szó: ' + current);
    j(k());
    if(currentCards.length>1){
       setTimeout(bot,500);
       
    } else {
         console.log("GG");
    }

    function k (){
            for(k = 0; k<length; k++){

                console.log('k: ' +k);

                if(terms[k].definition===current){
    
                    word = terms[k].word;
                    console.log('word: ' + word);
                    return word;
    
                } else if (terms[k].word === current){
    
                    def = terms[k].definition;
                    console.log('def: '+ def);
                    return def;
                    
                }
                
            
            }
    }

    function j (val){
            for(j = 0; j < currentCards.length; j++){
                console.log('j: ' + j);
                if(currentCards[j].textContent===val){
    
                    currentCards[j].dispatchEvent(event);
                    console.log('válaszra katt');
                    break;
                    
    
                } else if (currentCards[j].textContent===val){
    
                    currentCards[j].dispatchEvent(event);
                    console.log('válaszra katt');
                    
                    break;
                    
                }
                
    
            }
    }

};
