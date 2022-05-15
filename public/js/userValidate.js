function validateOrder() {
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;
    var phone = document.getElementById("phone").value;
    var note = document.getElementById("note").value;
    if (!name || !address || !phone) {
        return false;
    }
    return true;
}
function validatePhone() {
    var phone = document.getElementById("phone").value;
    if (phone.length != 10) {
        return false;
    }
    for (var i = 0; i < phone.length; i++) {
        if (phone.charCodeAt(i) < 48 || phone.charCodeAt(i) > 58) {
            return false;
        }
    }
    // if (phone.charAt(0) != '0') {
    //     return false;
    // }
    // if (phone.charAt(1) != '3' || phone.charAt(1) != '5' || phone.charAt(1) != '7' || phone.charAt(1) != '8' || phone.charAt(1) != '9') {
    //     return false;
    // }
    return true;
}
function isNumber(price) {
    for (var i = 0; i < price.length; i++) {
        if (price.charCodeAt(i) < 48 || price.charCodeAt(i) > 58) {
            return false;
        }
    }
    if (price <= 0) {
        return false;
    }
    return true;
}