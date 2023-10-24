let saved_cities = []
let saved_countries = []
let citizenship_filled = false;
let block_flight_button_without_check = false;


function load_cities() {
    var xhttp = new XMLHttpRequest();
    var previous_saved_country_index = 0;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText)["data"];
            var datalist = ""
            for(let i = 0; i < data.length - 2; i++) {
                saved_cities[i] = data[i]["city"];
                if(previous_saved_country_index === 0 || saved_countries[previous_saved_country_index - 1] !== data[i]["country"]) {
                    saved_countries[previous_saved_country_index] = data[i]["country"];
                    previous_saved_country_index++;
                }
                datalist += "<option value=\"" + data[i]["city"] + "\">" + data[i]["country"] + "</option>"
            }
            document.getElementById('city-datalist').innerHTML = datalist;
        }
    };
    xhttp.open("GET", "https://countriesnow.space/api/v0.1/countries/population/cities", true);
    xhttp.send();
}


function fill_citizenship_countries() {
    popup_citizenship = document.getElementById('popup_citizenship');
    for(let i = 0; i < saved_countries.length; i++) {
        popup_citizenship.innerHTML += "<option value=\"" + saved_countries[i] + "\">" + saved_countries[i] + "</option>"
    }
}


function set_empty_personal_data() {
    document.getElementById('popup_full_name').value = "";
    document.getElementById('popup_date_birth').value = "";
    document.getElementById('popup_number').value = "";
    document.getElementById('popup_email').value = "";
}


function set_empty_document_data() {
    document.getElementById('popup_document_type').value = "";
    document.getElementById('popup_document_number').value = "";
    document.getElementById('popup_date_of_expire').value = "";
    document.getElementById('popup_citizenship').value = "";
}

function set_empty_prefer_place() {
    document.getElementById('popup_row_in_plane').value = "";
    document.getElementById('popup_side_in_row').value = "";
    document.getElementById('popup_seat_in_row').value = "";
}


function set_empty_all_fields() {
    set_empty_personal_data();
    set_empty_document_data();
    set_empty_prefer_place();
}


function show_personal_data_popup() {
    popup_personal_data = document.getElementById('popup_personal_data');
    popup_personal_data.classList.add("homepage-open-popup");

    block_flight_button_without_check = true;
}


function hide_personal_data_popup() {
    if(!citizenship_filled) {
        fill_citizenship_countries();
        citizenship_filled = true;
    }
    popup_personal_data = document.getElementById('popup_personal_data');
    popup_personal_data.classList.remove("homepage-open-popup");

    popup_document_data = document.getElementById('popup_document_data');
    popup_document_data.classList.add("homepage-open-popup");
}


function hide_document_data_popup() {
    popup_document_data = document.getElementById('popup_document_data');
    popup_document_data.classList.remove("homepage-open-popup");

    popup_prefer_place = document.getElementById('popup_prefer_place');
    popup_prefer_place.classList.add("homepage-open-popup");
}


function hide_prefer_place_popup() {
    popup_prefer_place = document.getElementById('popup_prefer_place');
    popup_prefer_place.classList.remove("homepage-open-popup");

    popup_success = document.getElementById('popup_success');
    popup_success.classList.add("homepage-open-popup");
}


function hide_success_popup() {
    popup_success = document.getElementById('popup_success');
    popup_success.classList.remove("homepage-open-popup");

    block_flight_button_without_check = false;
    set_empty_all_fields();
}


function enable_flight_button() {
    arrival_city = document.getElementById('arrival_city').value;
    departure_city = document.getElementById('departure_city').value;
    button = document.getElementById('flight_button');
    if(!block_flight_button_without_check && saved_cities.includes(arrival_city) && saved_cities.includes(departure_city) && arrival_city !== departure_city) {
        button.classList.remove("button-disabled");
        button.disabled = false;
    } else {
        button.classList.add("button-disabled");
        button.disabled = true;
    }
}


function enable_personal_data_popup_button() {
    popup_full_name = document.getElementById('popup_full_name').value;
    popup_birth_date = document.getElementById('popup_date_birth').value;
    popup_number = document.getElementById('popup_number').value;
    popup_email = document.getElementById('popup_email').value;
    button = document.getElementById('send_personal_data_button');
    if(validate_names(popup_full_name) && validate_date_less_today(popup_birth_date) && validate_phone_number(popup_number) && validate_email(popup_email)) {
        button.classList.remove("button-disabled");
        button.disabled = false;
    } else {
        button.classList.add("button-disabled");
        button.disabled = true;
    }
}


function enable_document_data_popup_button() {
    popup_document_type = document.getElementById('popup_document_type').value;
    popup_document_number = document.getElementById('popup_document_number').value;
    popup_date_of_expire = document.getElementById('popup_date_of_expire').value;
    popup_citizenship = document.getElementById('popup_citizenship').value;
    button = document.getElementById('send_document_data_button');
    if(validate_document_type(popup_document_type) && popup_document_number !== "" && validate_date_more_today(popup_date_of_expire) && saved_countries.includes(popup_citizenship)) {
        button.classList.remove("button-disabled");
        button.disabled = false;
    } else {
        button.classList.add("button-disabled");
        button.disabled = true;
    }
}


function enable_prefer_place_popup_button() {
    popup_row_in_plane = document.getElementById('popup_row_in_plane').value;
    popup_side_in_row = document.getElementById('popup_side_in_row').value;
    popup_seat_in_row = document.getElementById('popup_seat_in_row').value;
    button = document.getElementById('send_prefer_place_button');
    if(validate_row_in_plane(popup_row_in_plane) && validate_side_in_row(popup_side_in_row) && validate_seat_in_row(popup_seat_in_row)) {
        button.classList.remove("button-disabled");
        button.disabled = false;
    } else {
        button.classList.add("button-disabled");
        button.disabled = true;
    }
}


function return_to_booking() {
    popup_personal_data = document.getElementById('popup_personal_data');
    popup_personal_data.classList.remove("homepage-open-popup");

    set_empty_personal_data();
    block_flight_button_without_check = false;
}


function return_to_personal_data() {
    popup_document_data = document.getElementById('popup_document_data');
    popup_document_data.classList.remove("homepage-open-popup");

    popup_personal_data = document.getElementById('popup_personal_data');
    popup_personal_data.classList.add("homepage-open-popup");

    set_empty_document_data();
}


function return_to_document_data() {
    popup_prefer_place = document.getElementById('popup_prefer_place');
    popup_prefer_place.classList.remove("homepage-open-popup");

    popup_document_data = document.getElementById('popup_document_data');
    popup_document_data.classList.add("homepage-open-popup");

    set_empty_prefer_place();
}


var update = setInterval(function () {
    enable_flight_button();
    enable_personal_data_popup_button();
    enable_document_data_popup_button();
    enable_prefer_place_popup_button();
}, 10);
