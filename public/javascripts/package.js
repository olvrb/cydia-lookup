const aboutButtonRipple = new mdc.ripple.MDCRipple(document.querySelector('#about'));
const backButtonRipple = new mdc.ripple.MDCRipple(document.querySelector('#goBack'));

$(document).ready(() => {    
    $("#spinner").show();
    $.get(`/downloadURL?packageid=${document.getElementById("packageid").innerText}`, data => {
        $("#download-url").html("Download");
        $("#download-url").attr("href", data);
        $("#spinner").hide();
    });
});