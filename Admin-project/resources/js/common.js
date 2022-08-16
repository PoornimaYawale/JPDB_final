var myStatus;
function ckeckToken()
{
   
    var token = localStorage.getItem("connection_token");
    if(token === null){
        if(myStatus === "in")
        {
            window.location.href = "index.html";
        }else{
            return;
        }
    } else 
    {
        if(myStatus === "out"){
            window.location.href = "table.html";
        }else{
            return;
        }

    }
}