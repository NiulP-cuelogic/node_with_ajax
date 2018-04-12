var user_email = $("#user_email").val();
var user_firstname = $("#user_firstname").val();
var user_lastname = $("#user_lastname").val();
var user_password = $("#user_password").val();

// function validation(){
//     if(email_validation())
//     {
//         return true;
//     }
//     else{
//         return false;
//     }
// }

function email_validation(){
    var temp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(user_email.match(temp)){
        $("#user_email").css("border-color","blue");
        console.log('called....');
        return true;
    }
    else{
        $("#user_email").css("border-color","red");
    }
}