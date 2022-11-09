class Ground{
    constructor(groundHeight){
        this.ground_height = groundHeight;
    }
    draw(ctx){
        ctx.save();
        ctx.beginPath();

        ctx.rect(0, this.ground_height , myCanvas.width, myCanvas.height);
        ctx.fillStyle = "#deb066";
        ctx.fill();
    }
}