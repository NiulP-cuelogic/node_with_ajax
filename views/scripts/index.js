function validation(event){

    event.preventDefault();
    
    if(email_validation() && fname_validation() && lname_validation() && p_validation()){
        return true;
    }
    else{
        return false;
    }
}


function email_validation(email){

    var user_email = $("#user_email").val();

    // console.log("called...");
    var temp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(user_email.match(temp)){
        $("#user_email").css("border-color","blue");
        $("#error_message_signup").text(" ");
        console.log('called....');
        return true;
    }
    else{
        // console.log("not valid..");
        $("#error_message_signup").text("Email is invalid").css("color","red");
        $("#user_email").css("border","1px solid red");
        return false;
    }
}

function fname_validation(firstname){

    var user_firstname = $("#user_firstname").val();
    var temp = /^[a-zA-Z ]{2,30}$/;
    if(user_firstname.match(temp)){
        $("#user_firstname").css("border-color","blue");
        $("#error_message_signup").text(" ");
        console.log('called....');
        return true;
    }
    else{
        
        $("#error_message_signup").text("First name is invalid").css("color","red");
        $("#user_firstname").css("border","1px solid red");
        return false;
    }
}

function lname_validation(lastname){

    var user_lastname = $("#user_lastname").val();
    var temp =  /^[a-zA-Z ]{2,30}$/ ;
    if(user_lastname.match(temp)){
        $("#user_lastname").css("border-color","blue");
        $('#error_message_signup').text(' ');
        console.log('called....');
        return true;
    }
    else{
       
        $("#error_message_signup").text("Last name is invalid").css("color","red");
        $("#user_lastname").css("border","1px solid red");
        return false;
    }
}

function p_validation(password){

    var user_password = $("#user_password").val();

    console.log("called...");
    var temp = /^[a-zA-Z ]{3,30}$/;
    if(user_password.match(temp)){
        $("#user_email").css("border-color","blue");
        $('#error_message_signup').text(" ");
        console.log('called password....');
        return true;
    }
    else{
       
        $("#error_message_signup").text("Password is invalid").css("color","red");
        $("#user_password").css("border","1px solid red");
        return false;
    }
}