var dictionary = {
    'A': ['009','037','061','083','095','104','111','115'],
    'Ą': ['025'],
    'B': ['017','055'],
    'C': ['031','059','070','084'],
    'Ć': ['005'],
    'D': ['022','058','069','090'],
    'E': ['011','039','040','080','094','105','108','112'],
    'Ę': ['024','043'],
    'F': ['034'],
    'G': ['004','060'],
    'H': ['015','036'],
    'I': ['021','049','064','085','093','102','110','114'],
    'J': ['010','048','071'],
    'K': ['029','042','063','079'],
    'L': ['006','046'],
    'Ł': ['035','056'],
    'M': ['019','050','077'],
    'N': ['030','057','062','081','096','106'],
    'Ń': ['003'],
    'O': ['026','038','075','091','100','103','109','113'],
    'Ó': ['012'],
    'P': ['016','044','076','078'],
    'Q': ['023'],
    'R': ['007','054','066','087','099'],
    'S': ['020','047','068','082','097'],
    'Ś': ['032'],
    'T': ['013','053','065','086'],
    'U': ['014','045','072'],
    'V': ['002'],
    'W': ['027','051','074','092','101'],
    'X': ['018'],
    'Y': ['033','052','067','088'],
    'Z': ['008','041','073','089','098','107'],
    'Ź': ['028'],
    'Ż': ['001']
};

function getDictionaryForDecrypt() {
    var result = {};

    for (const [key, value] of Object.entries(dictionary)) {
        if (value) {
            for (var index = 0; index < value.length; index++) {
                result[value[index]] = key;
            }
        }
    }

    return result;
}

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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

function encrypt(text) {
    var result = '';

    for(var i = 0; i < text.length; i++) {
        var codes = dictionary[text[i]];
        if (codes && codes.length > 0) {
            result += codes[getRandomInt(0, codes.length)];
        }
    }

    return result;
}

function decrypt(text) {
    var result = '';
    var data = getDictionaryForDecrypt();

    for (var a = 0; a < text.length; a = a + 3)
    {
        var key = text.substring(a, a + 3);
        if (key && key.length == 3 && isNumeric(key)) {
            result += data[key];
        }
    }

    return result;
}