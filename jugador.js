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
            console.log ("S'ha lluitat contra algun jugador");
        }
        else {
            console.warn("Error! No te puedes atacar");
        }
        return status;
    }
}

function pulsarTecla (event) {
    switch(event.keyCode){
        case 37: // Izquierda
            this.direccion = "E";
            this.pos_y = this.pos_y - 1;    
            move();   
            break;
        case 38: // Arriba
            this.direccion = "N";
            this.pos_x = this.pos_x + 1;  
            move();   
            break;
        case 39: // Derecha
            this.direccion = "O";
            this.pos_y = this.pos_y + 1; 
            move();  
            break;
        case 40: // Bajar
            this.direccion = "S";
            this.pos_x = this.pos_x - 1; 
            move();  
            break;
        case 32: // Doble salto hacia adelante
            if (this.pos_x <= 38 || this.pos_y <= 38) {
                switch(this.direccion) {
                    case "E":
                        this.pos_y = this.pos_y - 2;  
                        move();
                        break;
                    case "N":
                        this.pos_x = this.pos_x + 2;  
                        move();
                        break;
                    case "O":
                        this.pos_y = this.pos_y + 2; 
                        move(); 
                        break;
                    case "S":
                        this.pos_x = this.pos_x - 2;  
                        move();
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
document.onkeydown = pulsarTecla();