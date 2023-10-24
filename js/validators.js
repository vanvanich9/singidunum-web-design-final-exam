function validate_names(names) {
    var validRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    return validRegex.test(names)
}


function validate_email(email) {
    var validRegex = /\S+@\S+\.\S+/;
    return validRegex.test(email);
}


function validate_phone_number(number) {
    return number.length > 0 && number.length <= 15;
}


function validate_date_more_today(date) {
    if (date === "")
        return false;
     let cur_date = new Date().getTime();
     let user_date = new Date(date).getTime();

     return user_date > cur_date
}


function validate_date_less_today(date) {
    if (date === "")
        return false;
    let cur_date = new Date().getTime();
    let user_date = new Date(date).getTime();

    return user_date < cur_date
}


function validate_document_type(type) {
    return ["passport", "id_card"].includes(type);
}


function validate_row_in_plane(row) {
    return ["front", "middle", "end", "no_matter"].includes(row);
}


function validate_side_in_row(side) {
    return ["left", "right", "no_matter"].includes(side);
}


function validate_seat_in_row(seat) {
    return ["window", "middle", "passage", "no_matter"].includes(seat);
}
