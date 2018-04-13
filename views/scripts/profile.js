function saveDetails(){
    $(".userDetails").attr('contentEditable',false);
    console.log('called..');
    var user_id = $('#userId').val();
    var user_email = $('#user_email').text();
    var user_firstname = $('#user_firstname').text();
    var user_lastname = $('#user_lastname').text();
    var token = localStorage.getItem('authToken');

    $.ajax({    
        method:"POST",
        url:"http://localhost:3001/signup/userDetails/update",
        data:{
            _id:user_id,    
            email:user_email,
            firstname:user_firstname,
            lastname:user_lastname,
            token:token
        },
        success:function(response){
            console.log("called..");
            $('#user_email').text(response.data.email);
            $('#user_firstname').text(response.data.firstname);
            $('#user_lastname').text(response.data.lastname);
            console.log("updated..");
        }
    })
    
    $('#edit_button').show();
    $("#save_button").hide();
    $("#cancel_button").hide();
}

function showSaveAndCancel(){
    $('#save_button').show();
    $("#cancel_button").show();
    $('#edit_button').hide();
    $(".userDetails").attr('contentEditable',true);                               

}