import { myCanvas } from "./index.js"; 

export default class Ground{
    public static ground_height: number = window.innerHeight * 0.9;

    constructor(){
    }



    draw(ctx:any): void{
        ctx.save();
        ctx.beginPath();

        ctx.rect(0, Ground.ground_height , myCanvas.width, myCanvas.height);
        ctx.fillStyle = "#deb066";
        ctx.fill();
    }
}