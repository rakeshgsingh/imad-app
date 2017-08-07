//counter code
var button = document.getElementById("counter");

button.onclick = function(){
    
   //Creat a request object
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
 
 // submit name

 var submit = document.getElementById("submit_btn");
 
 submit.onclick = function(){
     
     //Creat a request object
    var request = new XMLHttpRequest();
    
    //capture the response and stored in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.Done){
            
            //take some action
            
            if(request.status === 200){
                //capture a list of name and render it as a list.
             var names = request.responseText;
             names = JSON.parse(names);
             var list = '';
             for(var i=0; i<names.length; i++){
                 list += '<li>' + names[i] + '</li>';
             }
                 document.getElementById("namelist").innerHTML = list;
                
            
            
        }
    }          
     
        //not done yet 
     };
        //make a request
         var nameInput = document.getElementById("name");
         var name = nameInput.value;
 
        request.open('GET','http://rakeshgsingh.imad.hasura-app.io/submit-name?name=' + name, true);
        request.send(null);
 };     
 