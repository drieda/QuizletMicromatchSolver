/*
////////////////////////////////////////////////////////////////////////////////////////////////////
The scrip was created for learning purpose only. Please do NOT use it in to ruin other's experience!
I also do NOT encourage you to use it while you're signed in, so that Quizlet won't save your score.
////////////////////////////////////////////////////////////////////////////////////////////////////
*/

{
    //Html manipulator
    let htmlManip = () => {

        //Sets the default time to finish in for the bot 
        let defaultTime = 5.4;

        //Defines the html which will be injected into to the document
        let html='<h3 class="UIHeading--three" style="text-align: center; margin: 35px 0 15px 0; width: 90%; position: relative; left: 50%; transform: translateX(-50%);">What time do you wish to achieve?</h3><p style="text-align: center; margin: 0 0 35px 0; width: 90%; position: relative; left: 50%; transform: translateX(-50%);">Note that Quizlet can\'t store a time lower than 0.5s</p><input type="text" id="time" name="time" value="%default%" style="color: #455358; -webkit-appearance: none;-moz-appearance: none; appearance: none; border: solid #3ccfcf;border-radius: .25rem;display: inline-block;font: inherit;max-width: 100%;padding: .75rem 1.5rem; font-weight: 600; font-size: .875rem; line-height: 1.285714285714286; transition: all .12s cubic-bezier(.47,0,.745,.715); width: 80px; height:50px; position:relative; left:50%;transform:translateX(-50%); text-align:center; padding:0px; margin: 0 0 0 0"></input>';
        
        //Puts th default value to the html
        html=html.replace("%default%",defaultTime);

        //Injects the html to the document
        document.querySelector('.UIModalBody').insertAdjacentHTML('beforeend', html);

        //Adds event listener to the input box for better UX | on click deletes the value written inside
        document.getElementById('time').addEventListener('click', e => e.target.value='');
    }
    
    //Gets all the flashcards from Quizlet
    let getTerms = () => {

        //def: one side of the card | word: other side of the card | terms: every the flashcard with all information
        let def = [], word = [], terms = Quizlet.matchModeData.terms;

        //Extracts the one and the other side of each card
        terms.forEach((el,index) => {
            def[index] = el.definition;
            word[index] = el.word;
        });

        //Returns both sides separately in 2 arrays
        return{
            def: def,
            word: word
        }
    }

    //Gets all tiles from the micromatch game
    let getObjects =  () => {

        //text: all the text that's found on the tile | elem: nodelist containing tile elements
        let text, elem=document.querySelectorAll('.MatchModeQuestionGridTile');

        //Extracts the text from the tiles
        text = Array.prototype.map.call(elem, x => x.innerText);

        //returns an object with an array and a nodelist containing the words and the tiles
        return {
            text,
            elem
        }
    }

    //Finds the pair for the currently targeted card | current: the text on the currently selected card | terms: all the flashcard from Quizlet
    let findPair = (current, terms) => {

        //Decides which side of the card is currently selected and returns the other side of it
        for(let i = 0; i<(terms.def).length; i++)
        {
            if(current === terms.def[i]) return terms.word[i];
            else if(current === terms.word[i]) return terms.def[i];
        }
    }

    //The bot that does the work | botTerms: all the flashcard from Quizlet | botObjects: an object containing the words and the tiles
    let bot = (botTerms, botObjects) => {

        //event: a pointerdown event | clicked: an array which stores the index of the tiles that have been clicked | x: index of the current card
        let event = new PointerEvent("pointerdown");
        let clicked = [], x=0;

        //A function that runs until all tiles have been clicked
        while(x < (botObjects.text).length){

            //If the upcoming tile hasn't been clicked
            if(clicked.indexOf(x) === -1){

                //Clicks the tile
                botObjects.elem[x].dispatchEvent(event);
    
                //index: the index of the pair of the tile clicked above
                let index = botObjects.text.indexOf(findPair(botObjects.text[x],botTerms));
              
                //Clicks the tile that has the pair of the current card
                botObjects.elem[index].dispatchEvent(event);
                
                //Stores the index of the tile that has been clicked
                clicked.push(index);
               
            }

            //Jumps to the next card
            x++;
        }

    }

    //A function which prepares the bot and triggers it | time: the value stored in the input box
    let callBack = time => {

        //delay: the time after which the bot triggers, the value of the input box converted to milliseconds also I added 40ms for a better accuracy
        let delay = parseInt(time * 1000 + 40);

        //A timeout for the bot to trigger after
        setTimeout(() => bot(getTerms(),getObjects()), delay)
        
    }

    //A function which runs as soon as the script is invoked
    let init = () => {
        
        //Sets up the html
        htmlManip();

        //Reads the default time value from the input box
        let defaultTime = document.getElementById('time').value;

        //Reads the time value which has been typed in the input box
        let time = document.getElementById('time').addEventListener('keyup', () => time = document.getElementById('time').value)

        //If 'enter' is spressed while the input box is selected this function starts the game (written to improve UX)
        document.getElementById('time').addEventListener('keydown', e => {
                
            //keycode for 'enter'
            if(e.keyCode===13) {

                //Presses the 'start game' button
                document.querySelector('.UIButton--hero').click();
            }
        })

        //A target for the observer to watch
        const target = document.querySelector('body');

        //Configures the observer currently it only checks for attribute changes
        let config = {
            attributes: true
        };

        //Defines the observer and a callback function and triggers it
        let observer = new MutationObserver(() => {

            //If a time has been typed in then the defaultTime value is replaced to it
            if(time >= 0){

                //replaces the default time with the typed in time
                defaultTime=time;
            }

            //Triggers the setup function for the bot
            callBack(defaultTime);

        }).observe(target, config);
        
    }

    //Triggers the init function
    init();
}
