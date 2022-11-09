class Pipe{
    constructor(width = 70){
        this.gap = 150;

        this.width = width;
        this.x = myCanvas.width;
        this.y = this.#Generate_y();
        this.topPipeY = this.y - this.gap;
        this.bottom=new Image();
        this.bottom.src="images\\botoompipe.png"      
        this.top=new Image();
        this.top.src="images\\toppipe.png"                         
    }

    update(){
        this.#move();
    }

    #move(){
        this.x -= pipe_Velocity;
    }

    #Generate_y(){
        return Math.floor(Math.floor(
            Math.random() * (window.innerHeight*0.8-window.innerHeight*0.4 + 1)) 
            + window.innerHeight*0.4);
    }

    draw(ctx,X=this.x){
        this.x = X;
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.width, myCanvas.height -this.y);
        ctx.fillStyle = "#20c204";
        ctx.fill();


        ctx.beginPath();
        ctx.rect(this.x,this.y - this.gap ,this.width, - (myCanvas.height + this.y + this.gap));
        ctx.fillStyle = "#20c204";
        ctx.fill();


        // ctx.drawImage(this.bottom,
        // this.x,this.y,this.width, myCanvas.height -this.y);
        // ctx.restore();

        // ctx.drawImage(this.top,
        //     this.x,this.y - this.gap ,this.width, - (myCanvas.height + this.y + this.gap));
        // ctx.restore();
    }
}