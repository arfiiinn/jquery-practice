$(document).ready(function () {


    addModalToggle();
    editModalToggle();
    displayUsersList(UsersList);

    //Pagination
    var table = $('#.data-table-body');
    var rowsPerPage = 10;
    var totalPages = Math.ceil(table.find('tbody tr').length / rowsPerPage);
    
    // display the first page of rows
    displayRows(1);
    
    // create pagination links
    for (var i = 1; i <= totalPages; i++) {
      $('<a href="#"></a>')
        .attr('data-page', i)
        .text(i)
        .appendTo('#pagination')
        .on('click', function(e) {
          e.preventDefault();
          displayRows($(this).data('page'));
        });
    }
    
    function displayRows(pageNum) {
      var start = (pageNum - 1) * rowsPerPage;
      var end = start + rowsPerPage;
      
      // hide all rows
      table.find('tbody tr').hide();
      
      // show the rows for the current page
      table.find('tbody tr').slice(start, end).show();
      
      // highlight the current page link
      $('#pagination a').removeClass('active');
      $('#pagination a[data-page="' + pageNum + '"]').addClass('active');
    }



    $("#add-user").click(function(event){
        event.preventDefault();
        validateUser();
        $("input").focus(function (e) { 
            e.preventDefault();
            $(".error").html("");
        });
    });

    $("#add").click(()=> addModalToggle());
    $("#close-addModal").click(()=> addModalToggle());
    $("#close-editModal").click(()=> editModalToggle());

    $(".data-table-body").on("click", ".delete",((event)=>{
        var id = $(event.target).closest('tr').attr("id");
        console.log(id);
        $("#delete").click(()=>{
            UsersList.splice(id, 1);
            displayUsersList(UsersList);
        });
       
    }));

    $(".data-table-body").on("click", "#edit",((event)=>{
        var id = $(event.target).closest('tr').attr("id");
        editModalToggle();
        getUserbyId(id);
        $("#edit-user").click((event)=>{
            event.preventDefault();
            validateEditedUser(id);
            $("input").focus(function (e) { 
                e.preventDefault();
                $(".error").html("");
            });
        });    
    }));

});

$(".filter-gender").on('change',function (event) { 
    var gender = event.target.value;
    console.log(gender);

    $(".data-table-body tr").filter(function () { 
        if(gender === "") {
            $(".data-table-body tr").show();
        } else {
            $(".data-table-body tr").hide();
            $(".data-table-body tr td:nth-child(4):contains(" + gender +")").parent().show();
        }
    }); 

    // if(gender === ""){
    //     displayUsersList(UsersList);
    // }
    // else{
    //     let filteredByGenderUser = UsersList.filter(user => user.gender === gender);
    //     console.log(filteredByGenderUser);
    //     displayUsersList(filteredByGenderUser);
    // }
});

$("#search-text").on('input', (event) =>{
    event.preventDefault();
    let searchText = $("#search-text").val();
    console.log(searchText);

    $(".data-table-body tr").filter(function () { 
        if(searchText === "") {
            $(".data-table-body tr").show();
        } else {
            $(".data-table-body tr").hide();
            $(".data-table-body tr td:nth-child(1):contains(" + searchText +")").parent().show();
            $(".data-table-body tr td:nth-child(2):contains(" + searchText +")").parent().show();
        }
    }); 

});

const getUserbyId = (id) => {
    var selectedUser = UsersList[id];
    console.log(selectedUser);
    $("#firstName").val(selectedUser.firstName);
    $("#lastName").val(selectedUser.lastName);
    $("#Email").val(selectedUser.email);
    $("#gender").val(selectedUser.gender);
    $("#mobileNum").val(selectedUser.mobileNo);
}

const UsersList = [{
        firstName: "Arfin",
        lastName: "Sayyed",
        email: "arfin@mail.com",
        gender: "Female",
        mobileNo: 9930152069
    },
    {
        firstName: "Meredith",
        lastName: "Grey",
        email: "meredith@mail.com",
        gender: "Female",
        mobileNo: 9930152021
    },
    {
        firstName: "Addison",
        lastName: "Montgomery",
        email: "addison-montgomery@mail.com",
        gender: "Female",
        mobileNo: 9930152069
    },
    {
        firstName: "Derek",
        lastName: "Shepherd",
        email: "shepherd-derek1@mail.com",
        gender: "Male",
        mobileNo: 8880152069
    },
    {
        firstName: "Mark",
        lastName: "Sloan",
        email: "mark-sloan22@mail.com",
        gender: "Female",
        mobileNo: 9930152069
    },
    {
        firstName: "Aariz",
        lastName: "Sayyed",
        email: "aariz@mail.com",
        gender: "Male",
        mobileNo: 9930152068
    },
    {
        firstName: "Anam",
        lastName: "Abbasi",
        email: "anam@mail.com",
        gender: "Female",
        mobileNo: 9930152067
    },
    {
        firstName: "Asnim",
        lastName: "Taufik",
        email: "asnim@mail.com",
        gender: "Female",
        mobileNo: 9930152066
    },
    {
        firstName: "Aakifah",
        lastName: "Chowgule",
        email: "aakifahc@mail.com",
        gender: "Female",
        mobileNo: 9930152065
    },
    {
        firstName: "Mehfooz",
        lastName: "Abbasi",
        email: "mehfooz@mail.com",
        gender: "Male",
        mobileNo: 9930152063
    },
    {
        firstName: "Aman",
        lastName: "Rawal",
        email: "aman-rawal@mail.com",
        gender: "Male",
        mobileNo: 9930152062
}];

const displayUsersList = (userArray) => {
    $(".data-table-body").html('');
    var users = userArray;
    for(i=0; i<users.length; i++){
    $(".data-table-body").append(`<tr id="${i}">
    <td>${users[i].firstName}</td>
    <td>${users[i].lastName}</td>
    <td>${users[i].email}</td>
    <td>${users[i].gender}</td>
    <td>${users[i].mobileNo}</td>
    <td>
        ${editIcon}
        ${deleteIcon}
    </td>
    </tr>`);
    }
    
}

const fetchValues = () => {
    var firstName = $("#fname").val().trim(); 
    var lastName = $("#lname").val().trim(); 
    var email = $("#email").val().trim();
    var gender = $("#Gender option:selected").val();
    var mobileNo = $("#mobileNo").val().trim(); 
    
    var user = {
     "firstName" : firstName,
     "lastName" : lastName,
     "email" : email,
     "gender": gender,
     "mobileNo": mobileNo
    }
    console.log(user);
    return user;
}

const fetchEditedValues = () => {
    var firstName = $("#firstName").val().trim(); 
    var lastName = $("#lastName").val().trim(); 
    var email = $("#Email").val().trim();
    var gender = $("#gender option:selected").val();
    var mobileNo = $("#mobileNum").val().trim(); 
    
    var user = {
     "firstName" : firstName,
     "lastName" : lastName,
     "email" : email,
     "gender": gender,
     "mobileNo": mobileNo
    }
    console.log(user);
    return user;
}

const validateEditedUser = (id) => {
    var user = fetchEditedValues();
    var hasNumber = /\d/;
    var hasChar = /[a-z][A-Z]/;
    var checks = 0;
    if(user.firstName == ""){
        $("#fnameerror").html("First name cannot be empty");
       checks ++;
    }
    if(hasNumber.test(user.firstName)){
       $("#fnameerror").html("First name cannot contain numbers");
       checks ++;
   }

   if(user.lastName == ""){
        $("#lnameerror").html("Last name cannot be empty");
        checks ++;
    }
    if(hasNumber.test(user.lastName)){
        $("#lnameerror").html("Last name cannot contain numbers");
        checks ++;
    }

    if(user.email == ""){
        $("#eerror").html("Email Address cannot be empty");
        checks ++;
    }

   if(user.gender == ""){
       $("#gerror").html("Select Gender");
       checks ++;
   }

   if(user.mobileNo == ""){
    $("#mobileerror").html("Mobile No. cannot be empty");
    checks ++;
    }

    if(user.mobileNo !== "" && user.mobileNo.toString().length !== 10){
       $("#mobileerror").append(" Mobile No. should be 10 digits");
       checks ++;
    }

    if(hasChar.test(user.mobileNo)){
       $("#mobileerror").html("Mobile No. cannot contain characters");
       checks ++;
    }

   console.log("Validation Failed: " + checks);
    if(checks > 0 ) {
       
    }
    else{
       $(".alert").addClass("alert-success").html("Success!").css("margin","3%");
       editModalToggle();
       UsersList[id] = user;
       displayUsersList(UsersList);
       setTimeout(()=>{
        $(".alert").hide();
       }, 3000);
    }   
}

const validateUser = () => {
    var user = fetchValues();
    var hasNumber = /\d/;
    var hasChar = /[a-z][A-Z]/;
    var checks = 0;
    if(user.firstName == ""){
        $("#firstnameerror").html("First name cannot be empty");
       checks ++;
    }
    if(hasNumber.test(user.firstName)){
       $("#firstnameerror").html("First name cannot contain numbers");
       checks ++;
   }

   if(user.lastName == ""){
        $("#lastnameerror").html("Last name cannot be empty");
        checks ++;
    }
    if(hasNumber.test(user.lastName)){
        $("#lastnameerror").html("First name cannot contain numbers");
        checks ++;
    }

    if(user.email == ""){
        $("#emailerror").html("Email Address cannot be empty");
        checks ++;
    }

   if(user.gender == ""){
       $("#gendererror").html("Select Gender");
       checks ++;
   }

   if(user.mobileNo == ""){
    $("#mobileNoerror").html("Mobile No. cannot be empty");
    checks ++;
    }

    if(user.mobileNo !== "" && user.mobileNo.toString().length !== 10){
       $("#mobileNoerror").append(" Mobile No. should be 10 digits");
       checks ++;
    }

    if(hasChar.test(user.mobileNo)){
       $("#ageerror").html("Mobile No. cannot contain characters");
       checks ++;
    }

   console.log("Validation Failed: " + checks);
    if(checks > 0 ) {
       
    }
    else{
       $(".alert").addClass("alert-success").html("Success!").css("margin","3%").show();
       UsersList.push(user);
       addModalToggle();
       displayUsersList(UsersList);
       setTimeout(()=>{
        $(".alert").hide();
       }, 3000);
    }   
}

const addModalToggle = () => {
    $(".add-modal").toggle();
}

const editModalToggle = () => {
    $(".edit-modal").toggle();
}

const editIcon = `<span id="edit" class="material-symbols-outlined me-2">edit</span>`;
const deleteIcon = `<span class="material-symbols-outlined text-danger delete" data-bs-toggle="modal" data-bs-target="#delete-modal">delete</span>`;


