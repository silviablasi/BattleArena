var matrix = [];
var group_token = "b89f9647";
var code;
var token;
var jugadorAux;
var jugador1;

function remove () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://battlearena.danielamo.info/api/remove/" + group_token + "/" + token + "/" + code, false);
    xhr.send();
    var status =  xhr.status;
    if (status == 200) {
        console.log ("S'ha esborrat el jugador");
    }
    if (confirm("Quieres crear otro jugador?")) {
        // si
        console.log("Nuevo jugador creado");
        spawn();
    } else {
        // no
        console.log("Salir del juego");
    }
    return status;
}

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

/*function spawn () {
    function reqListener () {
        aux = JSON.parse(this.responseText);
        token = aux.token;
        code = aux.code;
    }
    var status;
    var xhr = new XMLHttpRequest();
    var nombre = prompt("Escribe el nombre de tu personaje: ");
    xhr.addEventListener("load", reqListener);
    xhr.open("GET", "http://battlearena.danielamo.info/api/spawn/" + group_token + "/" + nombre, true);
    xhr.send();
    status = xhr.status;
    if (status == 200) {
        console.log ("S'ha creat el jugador");
        player();
        // crear_Taulell ();
    }
    else {
        console.log(status);
    }
    return status;
}*/

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
        player();
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
        var num = localStorage.length - 1;
        var jugador1_re = localStorage.getItem('spawn_' + num);
        var obj = JSON.parse(jugador1_re);
        jugador1.changes_Respawn(obj);
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
        console.log ("S'ha consultat la informació");
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
        jugador1 = new jugador (token, code, jugadorAux);
        var jugador_local = JSON.stringify(jugador1);
        localStorage.setItem("spawn_" + localStorage.length, jugador_local);
        jugador1.foto_Nav();
    }
    return status;
}

document.addEventListener('keydown', pulsarTecla);

function pulsarTecla (event) {
    var direccion;
    switch(event.keyCode){
        case 37: // Izquierda
            direccion = "O";   
            jugador1.move(direccion);   
            break;
        case 38: // Arriba
            direccion = "N";
            jugador1.move(direccion);    
            break;
        case 39: // Derecha
            direccion = "E";
            jugador1.move(direccion);  
            break;
        case 40: // Bajar
            direccion = "S";
            jugador1.move(direccion);  
            break;
        //no està bé encara
        case 32: // Doble salto hacia adelante
            if (this.pos_x <= 38 || this.pos_y <= 38) {
                switch(direccion) {
                    case "E":
                        this.pos_y = this.pos_y - 2;  
                        jugador1.move(direccion);  
                        break;
                    case "N":
                        this.pos_x = this.pos_x + 2;  
                        jugador1.move(direccion);  
                        break;
                    case "O":
                        this.pos_y = this.pos_y + 2; 
                        jugador1.move(direccion);  
                        break;
                    case "S":
                        this.pos_x = this.pos_x - 2;  
                        jugador1.move(direccion);  
                        break;
                }
            }
            else {
                console.warn("Error! No puedes hacer un salto doble");
            }
            break;
        case 13: // Lucha
            attack();
            break;
    }
}



function crear_Taulell () {
    for(var i=0; i<40; i++) {
        matrix[i] = new Array(40);
    }
}

