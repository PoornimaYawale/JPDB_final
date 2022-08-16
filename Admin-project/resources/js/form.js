var jpdbBaseURL= "http://api.login2explore.com:5577";
var jpdbIRL= "/api/irl";
var jpdbIML= "/api/iml";

var relName = localStorage.getItem("relname");
  var dbName = localStorage.getItem("dbname");
  var token = localStorage.getItem("connection_token");
function openform(){
  
    if(relName === "" && dbName === ""){
        window.location.replace('table.html');
    }
   else{
        window.location.replace('form.html');
   }
        
}



function openEditForm(rec_no)
{  
    
 
    
   var getColReq = createGETALLCOLRequest(token, dbName, relName) ;

  jQuery.ajaxSetup({async:false});
  var getColRes = executeCommandAtGivenBaseUrl(getColReq, jpdbBaseURL, jpdbIRL);
  jQuery.ajaxSetup({async:true});
  var colName = getColRes.data;
  console.log(colName);
    var record = rec_no;
  //  alert(record);
    var getRequest = createGET_BY_RECORDRequest(token, dbName, relName, record, true, true)
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if(resJsonObj.status === 400)
    {
        
        $('#save').prop('disabled', false);
        $('#reset').prop('disabled', false);
    }
    else if ( resJsonObj.status === 200)
    { 
            window.location.href ="form.html";
            disenable01();
            result=JSON.parse(resJsonObj.data);
            console.log(result);
            alert(result);
            for(let i=0;i<colName.length;i++){
                var id = "#" + colName[i].colName;
              //  alert("col name :"+colName[i].colName);
               
                key = colName[i].colName;
                //alert(result.record[key]);
                $(id).val(result.record[key]);
                
            }
            disableFields();

        $('#change').prop('disabled', false);
        $('#reset').prop('disabled', false);
        
    }

}


function resetForm(){
    for(let i=0;i<colName.length;i++){
        var id = "#" + colName[i].colName;
        $(id).val("")
    }
    $("#first").attr("disabled",false);
    $("#prev").attr("disabled",false);
    $("#change").attr('disabled',false);
    $("#save").attr('disabled',false);
    $("#reset").attr('disabled',false);
    $("#last").attr("disabled",false);
    $("#next").attr("disabled",false);
}

function saveData(){
    var jsonStr=validateAndGetForm01();
    if(jsonStr===""){
        return;
    }
    var req=createPUTRequest(token, jsonStr, dbName, relName);
   // console.log(req);
    jQuery.ajaxSetup({async:false});
    var resultObj=executeCommand(req,imlPartUrl);
    jQuery.ajaxSetup({async:true});
    var resultStr=JSON.stringify(resultObj);
    //console.log(resultStr);
    disableFields();
}

function validateAndGetForm01(){
    
    var jsonStr={
        
    }
    for(let i=0;i<colName.length;i++){
        var id = "#" + colName[i].colName;
        jsonStr[""+colName[i].colName]=$(id).val()
    }
    return JSON.stringify(jsonStr);
}

function checkID(){
    var jsonStr=validateAndGetForm02();
   // console.log(jsonStr)
    if(jsonStr===""){
        return;
    }
    var checkReq=createGET_BY_KEYRequest(token, dbName, relName, jsonStr, true, true);
    //console.log(checkReq)
    jQuery.ajaxSetup({async:false});
    var resultObj=executeCommand(checkReq,"/api/irl");
    jQuery.ajaxSetup({async:true});
    if(resultObj["status"]==200){
        disenable01();
        result=JSON.parse(resultObj.data);
        for(let i=0;i<colName.length;i++){
            var id = "#" + colName[i].colName;
            $(id).val(result.record[colName[i].colName]);
        }
        disableFields();
    }
    else
    disenable02();
}

function validateAndGetForm02(){
    var str=$("#"+colName[0].colName).val();
    if(str===""){
        return;
    }
    var jsonStr={

    }
    jsonStr[""+colName[0].colName]=str
    return JSON.stringify(jsonStr);
}

function disenable01(){
    $("#save").attr('disabled',true);
    $("#reset").attr('disabled',true);
}

function disenable02(){
    $("#change").attr('disabled',true);
}

function changeData(){
    var jsonStr=validateAndGetForm01();
    if(jsonStr===""){
        return;
    }
    var primaryKey=""+colName[0].colName;
    var updateReq=createSETRequest(token, jsonStr, dbName, relName,"UPDATE",primaryKey)
   // console.log(updateReq);
    jQuery.ajaxSetup({async:false});
    var resultObj=executeCommand(updateReq,"/api/iml/set");
    jQuery.ajaxSetup({async:true});
    //console.log(JSON.stringify(resultObj));
    disableFields();
}

function disableFields(){
    for(let i=0;i<colName.length;i++){
        var id = "#" + colName[i].colName;
        $(id).attr('readonly', true);
    }
    $("#save").attr("disabled",true);
}    

function enableFields(){
    for(let i=0;i<colName.length;i++)
    
        var id = "#" + colName[i].colName;
        $(id).attr('readonly', false);
        $("#first").attr("disabled",false);
        $("#prev").attr("disabled",false);
        $("#change").attr('disabled',false);
        $("#save").attr('disabled',false);
        $("#reset").attr('disabled',false);
        $("#last").attr("disabled",false);
        $("#next").attr("disabled",false);
    
}       

function firstData(){
    var firstReq=createFIRST_RECORDRequest(token, dbName, relName, true, true);
    jQuery.ajaxSetup({async:false});
    var resultObj01=executeCommand(firstReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    var result01=JSON.parse(resultObj01.data);
    for(let i=0;i<colName.length;i++){
        var id = "#" + colName[i].colName;
        $(id).val(result01.record[""+colName[i].colName]);
    }
    $("#first").attr("disabled",true);
    $("#prev").attr("disabled",true);
    $("#next").attr("disabled",false);
    $("#last").attr("disabled",false);
}

function lastData(){
    var lastReq=createLAST_RECORDRequest(token, dbName, relName, true, true);
    jQuery.ajaxSetup({async:false});
    var resultObj01=executeCommand(lastReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    var result01=JSON.parse(resultObj01.data);
    for(let i=0;i<colName.length;i++){
        var id = "#" + colName[i].colName;
        $(id).val(result01.record[""+colName[i].colName]);
    }
    $("#last").attr("disabled",true);    
    $("#next").attr("disabled",true);
    $("#prev").attr("disabled",false);
    $("#first").attr("disabled",false);
}

function nextData(){
    var jsonStr=validateAndGetForm02();
    if(jsonStr===""){
        return;
    }
    var checkReq=createGET_BY_KEYRequest(token, dbName, relName, jsonStr, true, true);
    jQuery.ajaxSetup({async:false});
    var resultObj=executeCommand(checkReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    var result01=JSON.parse(resultObj.data);
    var recordNumber=result01["rec_no"];
    var nextReq=createNEXT_RECORDRequest(token, dbName, relName, recordNumber, true, true);
    jQuery.ajaxSetup({async:false});
    var resultObj01=executeCommand(nextReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    if(resultObj01["status"]==400){
        $("#next").attr("disabled",true);
        $("#last").attr("disabled",true);
        $("#prev").attr("disabled",false);
        $("#first").attr("disabled",false);

        return;
    }
    var result=JSON.parse(resultObj01.data);
    for(let i=0;i<colName.length;i++){
        var id = "#" + colName[i].colName;
        $(id).val(result.record[""+colName[i].colName]); 
    }
    
    $("#first").attr("disabled",false);
    $("#prev").attr("disabled",false);
}

function prevData(){
    var jsonStr=validateAndGetForm02();
    if(jsonStr===""){
        return;
    }
    var checkReq=createGET_BY_KEYRequest(token, dbName, relName, jsonStr, true, true);
    jQuery.ajaxSetup({async:false});
    var resultObj=executeCommand(checkReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    var result01=JSON.parse(resultObj.data);
    var recordNumber=result01["rec_no"];
    var nextReq=createPREV_RECORDRequest(token, dbName, relName, recordNumber, true, true);
    jQuery.ajaxSetup({async:false});
    var resultObj01=executeCommand(nextReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    if(resultObj01["status"]==400){
        $("#prev").attr("disabled",true);
        $("#first").attr("disabled",true);
        return;
    }
    var result=JSON.parse(resultObj01.data);
    for(let i=0;i<colName.length;i++){
        var id = "#" + colName[i].colName;
        $(id).val(result.record[""+colName[i].colName]); 
    }
    
    $("#last").attr("disabled",false);
    $("#next").attr("disabled",false);
}
