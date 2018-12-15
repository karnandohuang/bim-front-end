let USERNAME = $('.login-box#user-name').val();
let PASSWORD = $('.login-box#password').val();

function make_base_auth(user, password) {
    let tok = user + ':' + password;
    let hash = Base64.encode(tok);
    return "Basic " + hash;
}

$.ajax({
    type: "GET",
    url: "index1.php",
    dataType: 'json',
    headers: {
        "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)
    },
    data: '{ "comment" }',
    success: function (){
        alert('Thanks for your comment!');
    }
});