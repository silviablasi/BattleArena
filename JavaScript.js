var matrix = [];
var group_token = "b89f9647";
var code;
var token;
var jugadorAux, jugador;
var aux;

function remove () {
    var status;
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://battlearena.danielamo.info/api/spawn/" + group_token + "/" + token + "/" + code, true);
    xhr.onload = function() {
        status =  xhr.status;
    }
    xhr.send();
    if (status == 200) {
        console.log ("S'ha esborrat el jugador");
    }
    return status;
}

/*function remove () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://battlearena.danielamo.info/api/remove/" + group_token + "/" + token + "/" + code, false);
    xhr.send();
    var status =  xhr.status;
    if (status == 200) {
        console.log ("S'ha esborrat el jugador");
    }
    return status;
}*/

/*function spawn () {
    var nombre = prompt("Escribe el nombre de tu personaje: ");
    fetch("http://battlearena.danielamo.info/api/spawn/" + group_token + "/" + nombre)
        .then(response => {
            if (response.status != 200) {
                console.log ("No s'ha creat el jugador");
                return;
            }
            response.json()})
        .then(data => {
            token = data.token;
            code = data.code;}
        )
        .catch((error) => {
            console.error('Error:', error);
        });
}*/

/*function spawn () {
    var status;
    var xhr = new XMLHttpRequest();
    var nombre = prompt("Escribe el nombre de tu personaje: ");
    xhr.open("GET", "http://battlearena.danielamo.info/api/spawn/" + group_token + "/" + nombre, true);
    xhr.onload = function () {
        status = xhr.status;
        if (status == 200) {
            aux = JSON.parse(this.responseText);
            token = aux.token;
            code = aux.code;
            console.log ("S'ha creat el jugador");
            // crear_Taulell ();
        }
        else {
            console.error(xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error(xhr.statusText);
    };
    xhr.send();
    return status;
}*/


function spawn () {
    function reqListener () {
        aux = JSON.parse(this.responseText);
        token = aux.token;
        code = aux.code;
        status = xhr.status;
    }
    var status;
    var xhr = new XMLHttpRequest();
    var nombre = prompt("Escribe el nombre de tu personaje: ");
    xhr.addEventListener("load", reqListener);
    xhr.open("GET", "http://battlearena.danielamo.info/api/spawn/" + group_token + "/" + nombre, true);
    xhr.send();
    if (status == 200) {
        console.log ("S'ha creat el jugador");
        // crear_Taulell ();
    }
    else {
        console.log(status);
    }
    return status;
}

/*function spawn () {
    var xhr = new XMLHttpRequest();
    var nombre = prompt("Escribe el nombre de tu personaje: ");
    //`http://battlearena.danielamo.info/api/spawn/${group_token}/${nombre}`
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
}*/

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