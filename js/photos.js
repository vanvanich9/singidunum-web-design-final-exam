let saved_cities = []
block_button_without_check = false;


function load_cities() {
    var xhttp = new XMLHttpRequest();
    var previous_saved_country_index = 0;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText)["data"];
            var datalist = ""
            for(let i = 0; i < data.length - 2; i++) {
                saved_cities[i] = data[i]["city"];
                datalist += "<option value=\"" + data[i]["city"] + "\">" + data[i]["country"] + "</option>"
            }
            document.getElementById('city-datalist').innerHTML = datalist;
        }
    };
    xhttp.open("GET", "https://countriesnow.space/api/v0.1/countries/population/cities", true);
    xhttp.send();
}


function enable_photos_form() {
    photos_full_name = document.getElementById('photos_full_name').value;
    photos_city = document.getElementById('photos_city').value;
    photos_email = document.getElementById('photos_email').value;
    button = document.getElementById('send_photos_button');
    if(!block_button_without_check && validate_names(photos_full_name) && saved_cities.includes(photos_city) && validate_email(photos_email)) {
        button.classList.remove("button-disabled");
        button.disabled = false;
    } else {
        button.classList.add("button-disabled");
        button.disabled = true;
    }
}


function show_success_popup() {
    popup_success = document.getElementById('popup_success');
    popup_success.classList.add("photos-open-popup");
    block_button_without_check = true;
}


function hide_success_popup() {
    popup_success = document.getElementById('popup_success');
    popup_success.classList.remove("photos-open-popup");
    block_button_without_check = false;
}


var update = setInterval(function () {
    enable_photos_form();
}, 10);
