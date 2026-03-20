class GameOver extends Phaser.Scene{

    constructor(){
        super("GameOver");
    }

create(data){

let ancho = this.scale.width;
let alto = this.scale.height;

this.add.image(ancho / 2, alto / 2,"fondo")
.setDisplaySize(this.scale.width,this.scale.height);

this.add.text(ancho / 2, alto * 0.35,"Mataste tu Kiwi 😢",{
    fontSize:"30px",
    fill:"#000000",
        fontStyle: "bold",
        stroke: "#ffffff",
        strokeThickness: 6,
    backgroundColor: "rgba(255,255,255,0.5)"
}).setOrigin(0.5);

this.add.text(ancho / 2, alto * 0.50,"Puntos: " + data.puntos,{ 
    fontSize:"30px",
    fill:"#ffffff",
        fontStyle: "bold",
        stroke: "#000000",
        strokeThickness: 6,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
}).setOrigin(0.5);

this.add.text(ancho / 2, alto * 0.65,"Prueba otro kiwi",{
    fontSize:"20px",
    fill:"#ffffff",
        fontStyle: "bold",
        stroke: "#000000",
        strokeThickness: 6,
        backgroundColor: "rgba(255, 255, 255, 0.5)"
}).setOrigin(0.5);

this.input.once("pointerdown",()=>{   
         this.scene.start("Juego");
        });
    }
}