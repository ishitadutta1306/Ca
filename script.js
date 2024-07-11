let inputField=document.querySelector("#input input");
let buttons=document.querySelectorAll("button");
let string="";     //to store the expression being entered by the user
let btnsArr=Array.from(buttons);    //buttons stored in array
let isEvaluated=false;   //flag to track if an expression has been evaluated

//Event listener on each button clicked 
btnsArr.forEach(button =>{
    button.addEventListener("click",(e)=>{
        console.log("button clicked");

        //clear the input field if the previous action was an evaluation
        if (isEvaluated && e.target.innerText!=="="){
            string="";
            isEvaluated=false;  //reset
        }

        //handle user input
        switch(e.target.innerText){
            case "=":
                try{
                    string=eval(string);
                    inputField.value=string;     //sets the value of the userInput to the result of the evaluated expression
                    isEvaluated=true;   //expression has been evaluated and its result is currently displayed
                }
                catch(err){
                    inputField.value="Error";
                }
                console.log(inputField.value);
                break;

            case "AC":
                string="";
                inputField.value=string;
                isEvaluated=false;
                break;

            case "DEL":
                string=string.slice(0,-1);   //returns a portion of the string from the 0th index not including the last char
                inputField.value=string;
                break;

            case "( )":
                string+=getNextParenthesis(string);
                inputField.value=string;
                break;

            default:
                string+=e.target.innerText;   //append the clicked button's value to the expression string
                inputField.value=string;
                break;
        }
    });
});

//Determine whether to add '(' or ')'
const getNextParenthesis=((str)=>{
    let openParCount=(str.match(/\(/g) || []).length;   // '\(' check for open parenthesis
    let closedParCount=(str.match(/\)/g) || []).length;
    return openParCount>closedParCount?")":"(";
});

//Event listener on keyboard inputs
document.addEventListener("keydown",(e)=>{
    if (isEvaluated && e.key!=="Enter" && e.key!=="="){
        string="";
        isEvaluated=false;
    }

    switch(e.key){
        case "Enter":
        case "=":
            try{
                string=eval(string);
                inputField.value=string;
                isEvaluated=true;
            }
            catch(err){
                inputField.value="Error";
            }
            console.log(inputField.value);
            break;

        case "Backspace":
            string=string.slice(0,-1);
            inputField.value=string;
            break;

        case "(":
        case ")":
            string+=getNextParenthesis(string);
            inputField.value=string;
            break;
        
        case "Escape":
            string="";
            inputField.value=string;
            isEvaluated=false;
            break;

        default:
            if(/\d|\+|-|\*|\/|\./.test(e.key)){
                string+=e.key;
                inputField.value = string;
            }
            break;
    }
});
