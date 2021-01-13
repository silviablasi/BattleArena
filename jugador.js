class jugador {
    constructor (token, code, jugador) {
        this.identificador = token;
        this.code = code;
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
    girar (opcion) {
        switch (opcion) {
            //girar hacia la izquierda
            case 1:
                if (this.direccion == "N") {
                    this.direccion = "O"; 
                }
                else if (this.direccion == "S") {
                    this.direccion = "E"; 
                }
                else if (this.direccion == "E") {
                    this.direccion = "N";  
                }
                else if (this.direccion == "O") {
                    this.direccion = "S";  
                }
                console.log ("S'ha girat cap a l'esquerra");
                break;
            //girar hacia la derecha
            case 2:
                if (this.direccion == "N") {
                    this.direccion = "E"; 
                }
                else if (this.direccion == "S") {
                    this.direccion = "O"; 
                }
                else if (this.direccion == "E") {
                    this.direccion = "S";  
                }
                else if (this.direccion == "O") {
                    this.direccion = "N";  
                }
                console.log ("S'ha girat cap a la dreta");
                break;
        }
    }
    move () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://battlearena.danielamo.info/api/move/" + group_token + "/" + this.identificador + "/" + this.direccion, false);
        xhr.send();
        var status = xhr.status;
        if (status == 200) {
            this.foto_Nav();
        }
        else {
            console.warn("Error! No te puedes mover hacia esa dirección");
        }
                    //avanzar
                    switch (this.direccion) {
                        case "N":
                            this.pos_y ++;  
                        break;
                        case "S":
                            this.pos_y --;  
                        break;
                        case "E":
                            this.pos_x ++;  
                        break;
                        case "O":
                            this.pos_x --;  
                        break;
                    }
                    console.log ("S'ha mogut el jugador");
        return status;
    }

    attack () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://battlearena.danielamo.info/api/attack/" + group_token + "/" + this.identificador + "/" + this.direccion, false);
        xhr.send();
        var status = xhr.status;
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
        if ((this.pos_x == 39 && this.direccion == "E") || (this.pos_x == 0 && this.direccion == "O") || (this.pos_y == 39 && this.direccion == "N") || (this.pos_y == 0 && this.direccion == "S")) {
            var foto = document.getElementById("img-nav");
            foto.setAttribute("src", "img/pared.jpg");
        }
        else {
            var foto2 = document.getElementById("img-nav");
            foto2.setAttribute("src", "img/suelo.jpg");
        }
    }

    changes_Respawn (obj) {
        this.pos_x = obj.pos_x;
        this.pos_y = obj.pos_y;
        this.puntos = obj.puntos;
        this.imagen = obj.imagen;
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
