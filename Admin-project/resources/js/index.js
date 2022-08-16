var jpdbBaseURL= "http://api.login2explore.com:5577";
var jpdbIRL= "/api/irl";
var jpdbIML= "/api/iml";

setBaseUrl(jpdbBaseURL);


function createGET_ALL_DBRequest(token) {
    var sendGET_ALL_DBRequest = "{\n"
            + "\"token\" : \""
            + token
            + "\",\n"
            + "\"cmd\" : \n"
            + "\"GET_ALL_DB\""
            + "\n"
            + "}";
    return sendGET_ALL_DBRequest;
}
function checkUser()
{
    // var cmd = "GET_ALL_DB";
    var conn_token = $('#conn_token').val();
    if(conn_token === ''){
       $("#conn_error").html("Enter Connection Token");
    }
    var connrequest = createGET_ALL_DBRequest(conn_token);
    jQuery.ajaxSetup({async:false});
    var connresponse = executeCommandAtGivenBaseUrl(connrequest, jpdbBaseURL, jpdbIRL);

    jQuery.ajaxSetup({async: true}); 
    if(connresponse.status === 401 || connresponse.status === 400) 
    {
        var stat = connresponse.status;
        alert(stat);
        $("#conn_error").html("Wrong Connection Token");
    }
    else if(connresponse.status === 200) 
    {
    
        window.location.replace('table.html');
        localStorage.setItem("connection_token", conn_token);
        var data = connresponse.data;
        localStorage.setItem("DB",data);
    }
    
}


