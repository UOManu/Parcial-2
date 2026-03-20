class Juego extends Phaser.Scene {

constructor(){
    super("Juego");
}

create(){

    // ---------------- PANTALLA ----------------
    this.ancho = this.scale.width;
    this.alto = this.scale.height;

    // ---------------- FONDO ----------------
    //this.add.image(this.ancho/2, this.alto/2, "fondo");
 this.fondo = this.add.tileSprite(
    this.ancho / 2,
    this.alto / 2,
    this.ancho,
    this.alto,
    "fondo"
);

// escalar proporcionalmente basado en altura
let escala = this.alto / this.textures.get("fondo").getSourceImage().height;
this.fondo.setScale(escala);



this.anims.create({
    key: "volar",
    frames: [
        { key: "bird2" },
        { key: "bird3" }
    ],
    frameRate: 8,
    repeat: -1
});

    // ---------------- PAJARO ----------------
    //this.bird = this.physics.add.sprite(100, this.alto/2, "bird")
    //.setScale(1.15); //escala el pajaro por si lo requieres
    this.bird = this.physics.add.sprite(this.ancho * 0.2, this.alto/2, "bird1")
.setScale(1.00);

this.bird.setTexture("bird1");
    this.bird.body.gravity.y = 900;

    // hitbox del pajaro
    this.bird.body.setSize(this.bird.width * 0.6, this.bird.height * 0.6);

    // ---------------- GRUPO DE TUBOS ----------------
    this.pipes = this.physics.add.group();

    // ---------------- PUNTOS ----------------
    this.puntos = 0;
    this.textoPuntos = this.add.text(20,20,"0",{
        fontSize:"40px",
        fill:"#704d0c",
        fontStyle: "bold",
        stroke: "#352805",
        strokeThickness: 6
    });

    // ---------------- CONTROLES ----------------
    this.input.on("pointerdown", this.saltar, this);
    this.input.keyboard.on("keydown-SPACE", this.saltar, this);

    // ---------------- GENERADOR DE TUBOS ----------------
    this.time.addEvent({
        delay: 2500, //Temporizador que Aumenta o Disminulle el tiempo en el que se generan los tubos
        callback:this.crearTubos,
        callbackScope:this,
        loop:true
    });

    // ---------------- COLISION ----------------
    this.physics.add.collider(this.bird,this.pipes,this.gameOver,null,this);

    // ---------------- DEBUG HITBOX ----------------
    //this.debugGraphics = this.add.graphics();
    //this.physics.world.createDebugGraphic();

}

update(){
    // movimiento infinito del fondo
    this.fondo.tilePositionX += 1;

    this.verificarCaida();
    this.verificarPuntos();

    if(this.bird.body.velocity.y > 0){
    // está cayendo
    this.bird.stop();
    this.bird.setTexture("bird1");
}

}

// ---------------- SALTO ----------------
saltar(){
    this.bird.setVelocityY(-350);

    // activar animación de vuelo
    this.bird.play("volar", true);
}

// ---------------- VERIFICAR CAIDA ----------------
verificarCaida(){

    if(this.bird.y > this.alto){
        this.gameOver();
    }
    // si sale por arriba
    if(this.bird.y < 0){
        this.gameOver();
    }

}


// ---------------- CONTAR PUNTOS ----------------
verificarPuntos(){

    this.pipes.getChildren().forEach(pipe=>{

        if(pipe.getData("tipo") == "arriba"){

            if(pipe.x < this.bird.x && !pipe.getData("pasado")){

                pipe.setData("pasado",true);
                this.puntos++;
                this.textoPuntos.setText(this.puntos);
            }
        }
    });
    //this.debugGraphics.clear();
    //this.physics.world.drawDebug = true;
}

// ---------------- CREAR TUBOS ----------------
crearTubos(){

    // espacio adaptable al tamaño de pantalla
    let espacio = this.alto * (0.28 - this.puntos * 0.005);

    // posicion aleatoria pero segura
    let posicion = Phaser.Math.Between(this.alto * 0.25, this.alto * 0.75);

    // velocidad adaptable
    let velocidad = -this.ancho * 0.25;

    // tubo arriba
    let arriba = this.pipes.create(this.ancho, posicion - espacio/2, "pipe");

    arriba.setOrigin(0,1);
    arriba.body.allowGravity = false;
    arriba.setVelocityX(velocidad);

    arriba.setData("tipo","arriba");
    arriba.setData("pasado",false);

    arriba.body.setSize(arriba.width * 0.7, arriba.height);
    arriba.body.setOffset(arriba.width * 0.10, 0);

    // tubo abajo
    let abajo = this.pipes.create(this.ancho, posicion + espacio/2, "pipe");

    abajo.setOrigin(0,0);
    abajo.body.allowGravity = false;
    abajo.setVelocityX(velocidad);

    abajo.setData("tipo","abajo");

    abajo.body.setSize(abajo.width * 0.7, abajo.height);
    abajo.body.setOffset(abajo.width * 0.10, 0);

    // destruir tubos fuera de pantalla
    this.pipes.getChildren().forEach(pipe=>{
        if(pipe.x < -pipe.width){
            pipe.destroy();
        }
    });

}

// ---------------- GAME OVER ----------------
gameOver(){
        this.scene.start("GameOver",{puntos:this.puntos});
    }
}