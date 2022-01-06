var letters = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ,.0123456789";

function encryptText(isDecrypt) {
    var textarea = document.getElementById("inputArea");

    if (textarea && textarea.value) {
        var output = document.getElementById("outputArea");
        if (isDecrypt) {
            output.value = decrypt(clearText(textarea.value));    
        } else {
            output.value = encrypt(clearText(textarea.value));
        }        
    } else {
        alert("Wprowadź poprawny tekst");
    } 
} 

function clearText(text) {
    var result = text.split(' ').join('');
    return result.toUpperCase();
}

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

function encrypt(text) {
    var result = '';

    for(var i = 0; i < text.length; i++) {
        var index = letters.indexOf(text[i]);

        if (index > -1) {
            var rowIndex = Math.floor(index/6) + 1;
            var columnIndex = index % 6 + 1;
            
            result += rowIndex.toString() + columnIndex.toString();
        }
    }

    return result;
}

function decrypt(text) {
    var result = '';

    for (var a = 0; a < text.length; a = a + 2)
    {
        var key = text.substring(a, a + 2);
        
        if (key && key.length == 2 && isNumeric(key)) {
            var letterIdx = (parseInt(key[0]) * 6) + parseInt(key[1]) - 7;
            result += letters[letterIdx];
        }
    }

    return result;
}