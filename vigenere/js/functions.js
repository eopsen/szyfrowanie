var letters = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ";

function encryptText(isDecrypt) {
    var textarea = document.getElementById("inputArea");
    var keyValue = document.getElementById("key");
    
    if (textarea && textarea.value && isKeyCorrect(keyValue)) {
        var key = clearText(keyValue.value);
        var output = document.getElementById("outputArea");
        if (isDecrypt) {
            output.value = decrypt(clearText(textarea.value), key);    
        } else {
            output.value = encrypt(clearText(textarea.value), key);
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
    var keyIdx = 0;

    for(var i = 0; i < text.length; i++) {
        var keyIndex = letters.indexOf(key[keyIdx]) + 1;
        var index = letters.indexOf(text[i]);
        var newIndex = (index + parseInt(keyIndex)) % 35;
        
        if (newIndex > 34) {
            newIndex -= 35;
        }
        
        result += letters[newIndex];

        if (keyIdx + 1 == key.length) {
            keyIdx = 0;
        } else {
            keyIdx++;
        }
    }

    return result;
}

function decrypt(text, key) {
    var result = '';
    var keyIdx = 0;

    for(var i = 0; i < text.length; i++) {
        var keyIndex = letters.indexOf(key[keyIdx]) + 1;
        var index = letters.indexOf(text[i]);
        var newIndex = (index - parseInt(keyIndex)) % 35;

        if (newIndex < 0) {
            newIndex += 35;
        }

        result += letters[newIndex];
        
        if (keyIdx + 1 == key.length) {
            keyIdx = 0;
        } else {
            keyIdx++;
        }
    }

    return result;
}