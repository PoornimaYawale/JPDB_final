var jpdbBaseURL= "http://api.login2explore.com:5577";
var jpdbIRL= "/api/irl";
var jpdbIML= "/api/iml";


setBaseUrl(jpdbBaseURL);



function connection_token()
{
    var token = localStorage.getItem("connection_token");
    document.getElementById("curr_token").value = token;
    //document.getElementById(curr_token)
}
function removeToken()
{
    localStorage.removeItem("connection_token");
    window.location.href = "index.html";
}
function get_Database()
{
    let database = localStorage.getItem("DB").split(",");
    //console.log(database);
    var va="";
    for(let i=0; i<database.length;i++){
        va += "<li class=\"nav-item\" ><div style = \"color:white;\" class=\"nav-link\"><i class=\"nav-icon fas fa-table\"></i><p id =\"id\"><i class=\"fas fa-angle-left right\"></i>" + database[i] + "</p></div><ul class=\"nav nav-treeview\">";
       
       var relRequest = createGET_ALL_RELATIONRequest(localStorage.getItem("connection_token"),database[i]);
       jQuery.ajaxSetup({async:false});
       var relresponse = executeCommandAtGivenBaseUrl(relRequest, jpdbBaseURL, jpdbIRL);
       jQuery.ajaxSetup({async:true});
       var name = relresponse.data;
     //  console.log(name);
      
       for(let j=0; j<name.length;j++){
          var relname = name[j].relName;
        va+="<li class=\"nav-item\"onclick =\"getDataFromRel(this)\"> <a class=\"nav-link\"><i class=\"far fa-circle nav-icon\"></i><p>"+ relname +"</p></a></li>"
       
       }
       va += "</ul></li>";
       $("#tables").html(va);
    }
}



function getDataFromRel(Relname)
{
        var relName = Relname.innerText;
        var parent = Relname.parentElement.closest('li');
        var dbName = parent.querySelector("#id").innerText;
        localStorage.setItem("relname",relName);
        localStorage.setItem("dbname",dbName);

}
function deleteRecord(rec,recno)
{
   // alert("deleteRecord");
    var removerecord = rec.closest("tr");
    var rec_no = recno;
    var relName= localStorage.getItem("relname");
    var dbName = localStorage.getItem("dbname");
   
   alert(rec_no); 
   alert(relName);
   alert(dbName);
   removerecord.remove(); 
    
   var removeRecReq = createREMOVERecordRequest(localStorage.getItem("connection_token"), dbName, relName, rec_no);
   jQuery.ajaxSetup({async:false});
   var removeRecRes = executeCommandAtGivenBaseUrl(removeRecReq, jpdbBaseURL, jpdbIML);
   jQuery.ajaxSetup({async:true});
  
   if(removeRecRes.status === 200){
    alert("record deleted ");

   }

}







