  // Submit username/password to login
 var submit = document.getElementById("login");
 submit.onclick = function(){
    //Creat a request object
    var request = new XMLHttpRequest();
    //capture the response and stored in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //take some action
            if(request.status === 200){
               console.log('user logged in');
               alert('Logged succesfully');
             }  else if(request.status === 403){
                 alert('username/password is incorrect');
             }  else if (request.status === 500){
                 alert('Something went wrong on the server');
             }
        }
      };
       
         var username = document.getElementById("username").value;
         var password = document.getElementById("password").value;
         console.log(username);
         console.log(password);
         request.open('POST','http://rakeshgsingh.imad.hasura-app.io/login', true);
         request.setRequestHeader('Content-Type', 'application/json');
         request.send(JSON.stringify({username: username, password: password}));
 };     
 