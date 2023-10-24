block_button_without_check = false;


function enable_contact_form() {
    contact_full_name = document.getElementById('contact_full_name').value;
    contact_email = document.getElementById('contact_email').value;
    button = document.getElementById('send_contact_button');
    if(!block_button_without_check && validate_names(contact_full_name) && validate_email(contact_email)) {
        button.classList.remove("button-disabled");
        button.disabled = false;
    } else {
        button.classList.add("button-disabled");
        button.disabled = true;
    }
}


function show_success_popup() {
    popup_success = document.getElementById('popup_success');
    popup_success.classList.add("contact-open-popup");
    block_button_without_check = true;
}


function hide_success_popup() {
    popup_success = document.getElementById('popup_success');
    popup_success.classList.remove("contact-open-popup");
    block_button_without_check = false;
}


var update = setInterval(function () {
    enable_contact_form();
}, 10);
