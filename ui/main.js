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
 var nameInput = document.getElementById("name");
 var name = nameInput.value;
 
 var submit = document.getElementById("submit_btn");
 
 submit.onclick = function(){
     // make a request to server and send the name.
     
     //capture a list of name and render it as a list.
     var names = ['name1','name2','name3'];
     var list = '';
     for(var i=0; i<names.length; i++){
         list += '<li>' + [name(i)] + '</li>';
         
         var ul = document.getElementById("namelist")
         ul.innerHTML = list;
         
     }
     
 };