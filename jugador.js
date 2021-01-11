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
    move (direccion) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://battlearena.danielamo.info/api/move/" + group_token + "/" + this.identificador + "/" + direccion, false);
        xhr.send();
        var status =  xhr.status;
        if (status == 200) {
            switch (direccion) {
                case "E":
                    this.pos_y = this.pos_y - 1; 
                    break;
                case "N":
                    this.pos_x = this.pos_x + 1;  
                    break;
                case "O":
                    this.pos_y = this.pos_y + 1; 
                    break;
                case "S":
                    this.pos_x = this.pos_x - 1; 
                    break;
            }
            this.foto_Nav();
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
            console.log ("S'ha lluitat contra algun jugador");
        }
        else {
            console.warn("Error! No te puedes atacar");
        }
        return status;
    }

    foto_Nav () {
        if (this.pos_x == 40 || this.pos_x == 0) {
            document.getElementsByClassName("img-nav").setAttribute("src", "img/pared.jpg");
        }
        else {
            document.getElementsByClassName("img-nav").setAttribute("src", "img/suelo.jpg");
        }
    }
}

function pulsarTecla (event) {
    var direccion;
    switch(event.keyCode){
        case 37: // Izquierda
            direccion = "E";   
            move(direccion);   
            break;
        case 38: // Arriba
            direccion = "N";
            move(direccion);    
            break;
        case 39: // Derecha
            direccion = "O";
            move(direccion);  
            break;
        case 40: // Bajar
            direccion = "S";
            move(direccion);  
            break;
        //no està bé encara
        case 32: // Doble salto hacia adelante
            if (this.pos_x <= 38 || this.pos_y <= 38) {
                switch(direccion) {
                    case "E":
                        this.pos_y = this.pos_y - 2;  
                        move(direccion);  
                        break;
                    case "N":
                        this.pos_x = this.pos_x + 2;  
                        move(direccion);  
                        break;
                    case "O":
                        this.pos_y = this.pos_y + 2; 
                        move(direccion);  
                        break;
                    case "S":
                        this.pos_x = this.pos_x - 2;  
                        move(direccion);  
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

class object {
    constructor (nom_obj, img, valor_ataque, valor_defensa) {
        this.nom_obj = nom_obj;
        this.img = img;
        this.valor_ataque = valor_ataque;
        this.valor_defensa = valor_defensa;
    }
}

document.onkeydown = pulsarTecla();
