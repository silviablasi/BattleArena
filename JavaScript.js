var matrix = [];
var group_token = "b89f9647";
var code;
var token;
var jugadorAux, jugador;

function remove () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://battlearena.danielamo.info/api/remove/" + group_token + "/" + token + "/" + code, false);
    xhr.send();
    var status =  xhr.status;
    if (status == 200) {
        console.log ("S'ha esborrat el jugador");
    }
    return status;
}

function spawn () {
    var xhr = new XMLHttpRequest();
    var nombre = prompt("Escribe el nombre de tu personaje: ");
    xhr.open("GET", "http://battlearena.danielamo.info/api/spawn/" + group_token + "/" + nombre, false);
    xhr.send();
    var aux = JSON.parse(xhr.responseText);
    token = aux.token;
    code = aux.code;
    var status =  xhr.status;
    if (status == 200) {
        console.log ("S'ha creat el jugador");
        // crear_Taulell ();
    }
    return status;
}

function respawn () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://battlearena.danielamo.info/api/spawn/" + group_token + "/" + token, false);
    xhr.send();
    var status =  xhr.status;
    if (status == 200) {
        console.log ("S'ha actualitzat el jugador");
    }
    return status;
}

function players () {

}

function map () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://battlearena.danielamo.info/api/map/" + group_token + "/" + token, false);
    xhr.send();
    var aux = JSON.parse(xhr.responseText);
    console.log(aux);
    var status =  xhr.status;
    if (status == 200) {
        console.log ("S'ha consulat la informació");
    }
    return status;
}

function player () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://battlearena.danielamo.info/api/player/" + group_token + "/" + token, false);
    xhr.send();
    jugadorAux = JSON.parse(xhr.responseText);
    var status =  xhr.status;
    if (status == 200) {
        console.log ("S'ha rebut la informació del jugador");
        jugador = new Jugador (jugadorAux);
    }
    return status;
}

class object {
    constructor (nom_obj, img, valor_ataque, valor_defensa) {
        this.nom_obj = nom_obj;
        this.img = img;
        this.valor_ataque = valor_ataque;
        this.valor_defensa = valor_defensa;
    }
}



function crear_Taulell () {
    for(var i=0; i<40; i++) {
        matrix[i] = new Array(40);
    }
}