//counter code
var button = document.getElementById("counter");

button.onclick = function(){
    
   //Creat a request 
    var request = new XMLHttpRequest();
    
    //capture the response and stored in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.Done){
            //take some action
            
            if(request.status === 200){
              var counter =  request.responseText;
             var span = document.getElementById("count");
             span.innerHTML = counter.toString(); 
            }
            
        }
        //Not done yet
    };
    //make a request
        request.open('GET','http://rakeshgsingh.imad.hasura-app.io/counter', true);
        request.send(null);
 };