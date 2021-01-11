class jugador {
    constructor (token, jugador) {
        this.identificador = token;
        this.name = jugador.name;
        this.pos_x = jugador.x;
        this.pos_y = jugador.y;
        this.direccion = jugador.direction;
        this.attack = jugador.attack;
        this.defensa = jugador.defense;
        this.puntos = jugador.vitalpoints;
        this.imagen = jugador.image;
        this.Objeto = jugador.object;
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
        if ((this.pos_x == 40 && this.direccion == "N") || (this.pos_x == 0 && this.direccion == "S") || (this.pos_y == 40 && this.direccion == "E") || (this.pos_y == 0 && this.direccion == "O")) {
            var foto = document.getElementById("img-nav");
            foto.setAttribute("src", "img/pared.jpg");
        }
        else {
            var foto2 = document.getElementById("img-nav");
            foto2.setAttribute("src", "img/suelo.jpg");
        }
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
