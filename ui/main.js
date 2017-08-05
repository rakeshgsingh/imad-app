//counter code
var button = document.getElementById("counter");
var counter=0;
button.onclick = function(){
    
   //make a request to the counter endpoint. 
    
    //capture the response and stored in a variable
    
    //Render the vaiable in correct span.
    counter = counter + 1;
    var span = document.getElementById("count");
    span.innerHTML = counter.toString();
    
};