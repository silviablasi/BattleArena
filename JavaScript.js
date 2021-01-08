var matrix = [];
var group_token = bwc;
var code = 0;
var nombre = "Silvia";

class jugador {
    constructor (token, name, x, y, d, attack, defense, vp, image, object) {
        this.identificador = token;
        this.name = name;
        this.pos_x = x;
        this.pos_y = y;
        this.direccion = d;
        this.attack = attack;
        this.defensa = defense;
        this.puntos = vp;
        this.imagen = image;
        this.Objeto = object;
    }
    remove () {
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", "http://battlearena.danielamo.info/api/remove/" + group_token + "/" + this.identificador + "/" + code, false);
        xhr.send();
        var status =  xhr.status;
        if (status == 200) {
            console.log ("S'ha esborrat el jugador");
        }
        return status;
    }

    spawn () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://battlearena.danielamo.info/api/spawn/" + group_token + "/" + nombre, false);
        xhr.send();
        var aux = JSON.parse(xhr.responseText);
        this.identificador = aux.token;
        code = aux.code;
        var status =  xhr.status;
        if (status == 200) {
            console.log ("S'ha creat el jugador");
            crear_Taulell ();
        }
        return status;
    }

    respawn () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://battlearena.danielamo.info/api/spawn/" + group_token + "/" + token, false);
        xhr.send();
        var status =  xhr.status;
        if (status == 200) {
            console.log ("S'ha actualitzat el jugador");
        }
        return status;
    }

    players () {

    }

    map () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://battlearena.danielamo.info/api/map/" + group_token + "/" + this.identificador, false);
        xhr.send();
        var aux = JSON.parse(xhr.responseText);
        console.log(aux);
        var status =  xhr.status;
        if (status == 200) {
            console.log ("S'ha consulat la informació");
        }
        return status;
    }
    
    player () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://battlearena.danielamo.info/api/player/" + group_token + "/" + this.identificador, false);
        xhr.send();
        jugador = JSON.parse(xhr.responseText);
        var status =  xhr.status;
        if (status == 200) {
            console.log ("S'ha rebut la informació del jugador");
        }
        return status;
    }

    move () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://battlearena.danielamo.info/api/move/" + group_token + "/" + this.identificador + "/" + this.direccion, false);
        xhr.send();
        var status =  xhr.status;
        if (status == 200) {
            console.log ("S'ha mogut el jugador");
        }
        else {
            console.warn("Error! No te puedes mover hacia esa dirección");
        }
        return status;
    }

    attack () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://battlearena.danielamo.info/api/attack/" + group_token + "/" + this.identificador + "/" + this.direccion, false);
        xhr.send();
        var status =  xhr.status;
        var puntos_menos = JSON.parse(xhr.responseText);
        this.puntos = this.puntos - puntos_menos;
        if (status == 200) {
            console.log ("S'ha mogut el jugador");
        }
        else {
            console.warn("Error! No te puedes atacar");
        }
        return status;
    }
}

class object {
    constructor (nom_obj, img, valor_ataque, valor_defensa) {
        this.nom_obj = nom_obj;
        this.img = img;
        this.valor_ataque = valor_ataque;
        this.valor_defensa = valor_defensa;
    }
}

function pulsarTecla () {
    switch(event.keyCode){
        case 37: // Izquierda
            this.direccion = "E";
            this.pos_y = this.pos_y - 1;       
            break;
        case 38: // Arriba
            this.direccion = "N";
            this.pos_x = this.pos_x + 1;   
            break;
        case 39: // Derecha
            this.direccion = "O";
            this.pos_y = this.pos_y + 1; 
            break;
        case 40: // Bajar
            this.direccion = "S";
            this.pos_x = this.pos_x - 1; 
            break;
    }
}
document.onkeydown = pulsarTecla;

function crear_Taulell () {
    for(var i=0; i<40; i++) {
        matrix[i] = new Array(40);
    }
}