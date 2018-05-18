const buttonRipple = new mdc.ripple.MDCRipple(document.querySelector('#goBack'));
$(document).ready(() => {
    if (Cookies.get("hasAccepted") == "true") {
        $("#cookie-consent").hide();
        $("#cookie-info").hide();
        return;
    }    
    $("#cookie-consent").show();
    $("#cookie-info").show();   
});
$("#cookie-consent").click(e => {
    Cookies.set("hasAccepted", "true");
    if (Cookies.get("hasAccepted") == "true") {
        console.log("hide");
        $("#cookie-consent").hide();
        $("#cookie-info").hide();
    }
    e.preventDefault();
});