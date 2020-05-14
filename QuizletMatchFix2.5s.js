/*

////////////////////////////////////////////////////////////////////////////////////////////////////
The scrip was created for learning purpose only. Please do NOT use it in to ruin other's experience!
I also do NOT encourage you to use it while you're signed in, so that Quizlet won't save your score.
////////////////////////////////////////////////////////////////////////////////////////////////////

*/
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
    currentCards = document.querySelectorAll('.MatchModeQuestionGridTile');
    currentCards[0].dispatchEvent(event);
    current=currentCards[0].textContent;
    console.log('szó: ' + current);
    j(k());
    if(currentCards.length>1){
       setTimeout(bot,500);
       
    }
    function k (){
            for(k = 0; k<length; k++){
                if(terms[k].definition===current){
                    word = terms[k].word;
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
                if(currentCards[j].textContent===val){
                    currentCards[j].dispatchEvent(event);
                    break;
                }
            }
    }
};
