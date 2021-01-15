var aux4;

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
        document.getElementById("namePlayer").textContent = jugador1.name;
        document.getElementById("playerPositionX").textContent = jugador1.pos_x;
        document.getElementById("playerPositionY").textContent = jugador1.pos_y;
        document.getElementById("playerOrientation").textContent = jugador1.direccion;
        document.getElementById("playerPoints").textContent = jugador1.puntos;
    }

    move () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://battlearena.danielamo.info/api/move/" + group_token + "/" + this.identificador + "/" + this.direccion, false);
        xhr.send();
        var status = xhr.status;
        if (status == 200) {}
        else {
            console.warn("Error! No te puedes mover hacia esa dirección");
        }
        player();
        console.log ("S'ha mogut el jugador");
        return status;
    }

    attack () {
        var status;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://battlearena.danielamo.info/api/attack/" + group_token + "/" + this.identificador + "/" + this.direccion, true);
        xhr.onload = function () {
            status = xhr.status;
            if (status == 200) {
                var puntos_menos = JSON.parse(xhr.responseText);
                this.puntos = this.puntos - puntos_menos;
                console.log ("S'ha lluitat contra algun jugador");
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
    }

    /*attack () {
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
    }*/

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
}

class object {
    constructor (nom_obj, img, valor_ataque, valor_defensa) {
        this.nom_obj = nom_obj;
        this.img = img;
        this.valor_ataque = valor_ataque;
        this.valor_defensa = valor_defensa;
    }
}
