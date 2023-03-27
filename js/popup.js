$(document).ready(function () {
    $(".my-modal").hide();
    $("#btn-submit").click(()=>{
        $(".my-modal").toggle();
    })
});