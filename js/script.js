$( document ).ready(function() {
    $("#DOB").attr("max", getCurrentDate);
    $("#DOJ").attr("min", getCurrentDate);
    $("#age").attr("min",0,"max",100);

    $(".my-modal").hide();

    $(".signup").click(function(event){
        event.preventDefault();
        validateUser();
        $("input").focus(function (e) { 
            e.preventDefault();
            $(".error").html("");
            $(".alert").hide();
        });
    })
    
    $("#submit").click(()=>{
        modalToggle();
        signupSuccess();
    })

    $("#edit").click(()=> modalToggle());
});

const getCurrentDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
       dd = '0' + dd;
    }
    if (mm < 10) {
       mm = '0' + mm;
    } 
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}
const modalToggle = () => {
    $(".my-modal").toggle();
}
const fetchValues = () => {
    var name = $("#name").val().trim(); 
    var age = $("#age").val().trim(); 
    var dob = $("#DOB").val().trim().toLocaleString(); 
    var doj = $("#DOJ").val().trim().toLocaleString(); 
    var gender = $("#Gender option:selected").val();
    var modeOfWork = $("input[name=workMode]:checked").val();
    var languages = [];

    var checks = $("input[type='checkbox']:checked"); // returns object of checkeds.
    for(var i=0; i<checks.length; i++){
        languages.push($(checks[i]).val()); // or do what you want
    };

    var user = {
     "name" : name,
     "age" : age,
     "gender": gender,
     "modeOfWork": modeOfWork, 
     "languages" : languages,
     "dob" : dob,
     "doj" : doj
    }
    console.log(user);
    return user;
}

const validateUser = () =>{
     var user = fetchValues();
     var hasNumber = /\d/;
     var hasChar = /[a-z][A-Z]/;
     var checks = 0;
     if(user.name == ""){
         $("#nameerror").append("Name cannot be empty");
        checks ++;
     }
     if(hasNumber.test(user.name)){
        $("#nameerror").append("Name cannot contain numbers");
        checks ++;
    }

     if(user.age == ""){
         $("#ageerror").append("Age cannot be empty");
         checks ++;
    }

     if(parseInt(user.age) <= 0){
        $("#ageerror").append("Age cannot be negative or zero");
        checks ++;
    }

    if(hasChar.test(user.name)){
        $("#ageerror").append("Age cannot contain characters");
        checks ++;
    }

    if(user.gender == ""){
        $("#degreeerror").append("Select Gender");
        checks ++;
    }

    if(user.modeOfWork === undefined){
        $("#modeerror").append("Select Mode of Work");
        checks ++;
    }

     if(user.dob == ""){
         $("#doberror").append("Date of birth cannot be empty");
         checks ++;
    }

     if(user.doj == ""){
         $("#dojerror").append("Date of joining cannot be empty");
         checks ++;
    }

    if(user.languages.length === 0){
        $("#langerror").append("Select a language");
         checks ++;
    }

    console.log("Validation Failed: " + checks);
     if(checks > 0 ) {
        $("div .alert").addClass("alert-danger").html("Kindly enter correct details to sign up!").show();
     }
     else{
        modalToggle();
        $(".content")
        .css({'white-space': 'pre'})
        .html("<b>Name - </b>" + user.name + "<b>\nAge - </b>" + user.age + "<b>\nGender - </b>" + user.gender + "<b>\nDOB - </b>" + user.dob + "<b>\nDOJ - </b>" + user.doj);
     }   
}

const signupSuccess = () => {
    $("div .alert").removeClass("alert-danger").addClass("alert-success").html("Thanks for signing up!").show();
}

