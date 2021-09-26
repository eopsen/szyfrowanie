var letters = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ";

function encryptText(isDecrypt) {
    var textarea = document.getElementById("inputArea");
    var keyValue = document.getElementById("key");

    if (textarea && textarea.value && isKeyCorrect(keyValue)) {
        var output = document.getElementById("outputArea");
        if (isDecrypt) {
            output.value = decrypt(clearText(textarea.value), keyValue.value);    
        } else {
            output.value = encrypt(clearText(textarea.value), keyValue.value);
        }        
    } else if (!textarea || !textarea.value) {
        alert("Wprowadź poprawny tekst");
    } else {
        alert("Wprowadź poprawny klucz"); 
    }
} 

function isKeyCorrect(keyValue) {
    if (!keyValue || !keyValue.value) {
        return false;
    }

    if (keyValue.value < 1 || keyValue.value > 34) {
        return false;
    }

    return true;
}

function clearText(text) {
    var result = '';

    for(var i = 0; i < text.length; i++) {
        var c = text[i].toUpperCase();
        if (letters.indexOf(c) > -1) {
            result += c;
        }
    }

    return result;
}

function encrypt(text, key) {
    var result = '';

    for(var i = 0; i < text.length; i++) {
        var index = letters.indexOf(text[i]);
        var newIndex = (index + parseInt(key)) % 35;

        if (newIndex > 34) {
            newIndex -= 35;
        }

        result += letters[newIndex];
    }

    return result;
}

function decrypt(text, key) {
    var result = '';

    for(var i = 0; i < text.length; i++) {
        var index = letters.indexOf(text[i]);
        var newIndex = (index - parseInt(key)) % 35;

        if (newIndex < 0) {
            newIndex += 35;
        }

        result += letters[newIndex];
    }

    return result;
}