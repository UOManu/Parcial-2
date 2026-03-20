class Inicio extends Phaser.Scene{

constructor(){
super("Inicio");
}

preload(){
    this.load.image("fondo","/img/Fonde.png");
    this.load.image("bird1","/img/Kiwi1.png");
    this.load.image("bird2","/img/Kiwi2.png");
    this.load.image("bird3","/img/Kiwi3.png");
    this.load.image("pipe","/img/Pipe.png");
}

create(){

// ACTIVIDAD:

// Cambiar estas posiciones fijas para que se adapten al tamaño del celular

// usando this.scale.width y this.scale.height

this.add.image(this.scale.width / 2,this.scale.height / 2 ,"fondo")
.setDisplaySize(this.scale.width,this.scale.height);

this.add.text(140,150,"Kiwi",{
    fontSize:"30px",
    fill:"#f5dc00",
        fontStyle: "bold",
        stroke: "#e41f1f",
        strokeThickness: 6,
    backgroundColor: "rgba(19, 92, 175, 0.5)"
});
this.add.text(30,250,"Aprender a volar",{
    fontSize:"32px",
    fill:"#f5dc00",
        fontStyle: "bold",
        stroke: "#e41f1f",
        strokeThickness: 6,
    backgroundColor: "rgba(19, 92, 175, 0.5)"
});
    let boton = this.add.text(
        this.scale.width / 2,
        this.scale.height / 2 + 80,
        "Enseñale como",
            {
                fontSize: "32px",
                color: "#e6eb45",
                backgroundColor: "#2b1984a6",
                stroke: "#ff5e23",
                fontStyle: "bold",
                strokeThickness: 3,
                padding: { x: 20, y: 10 }
            }
        ).setOrigin(0.5);

        boton.setInteractive();
        boton.on("pointerdown", () => {
            this.scene.start("Juego");
        });
    }
}