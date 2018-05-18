const aboutButtonRipple = new mdc.ripple.MDCRipple(document.querySelector('#about'));
const submitButtonRipple = new mdc.ripple.MDCRipple(document.querySelector('#submitForm'));
const floatingLabel = new mdc.floatingLabel.MDCFloatingLabel(document.querySelector('#floatLabel'));
const textField = new mdc.textField.MDCTextField(document.querySelector('.mdc-text-field'));

$(document).ready(() => {
    $("#inputError").hide();
    $("#loader").hide();
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
    $("#cookie-consent").hide();
    $("#cookie-info").hide();
    e.preventDefault();
});

$("#form").submit(e => {
    $("#inputError").hide();
    $("#results").empty();
    let getUrl = window.location;
    let baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
    let address = document.getElementById("package").value; //get grlc address
    $("#loader").show();
    $.post(`${baseUrl}getpackages?package=${address}`, resp => { // to avoid cors errors we're getting the balance server-side
        resp = JSON.parse(resp);
        console.log(resp);
        if (resp.results.length === 0) {
            $("#inputError").show();
            $("#inputError").html("No packages were found.");

        }
        for (const result of resp.results) {
            $("#results").append(`<li onclick="loadPackagePage(this.id)" id="${result.name}" class="mdc-list-item">
            <span class="mdc-list-item__text">
              ${result.display}
              <span class="mdc-list-item__secondary-text">
                ${result.name}
              </span>
            </span>
          </li>`);
          new mdc.ripple.MDCRipple(document.getElementById(`${result.name}`));
        }
        $("#loader").hide();
        if (resp.error) {
            $("#balance").html(resp.error); //show error, most probably unknown address
        } else if (resp.inputError) {
            $("#inputError").show(); //show error 
            $("#inputError").html(resp.inputError); //show error 
        }
        $("#logo").attr("class", "logo"); // stop spinning logo
        
    });
    e.preventDefault();
});

function loadPackagePage(packageID) {
    location.replace(`/package?packageid=${packageID}`);
}