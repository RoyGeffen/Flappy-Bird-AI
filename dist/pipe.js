import { myCanvas } from './index.js';
export default class Pipe {
    gap = 150;
    width;
    x;
    y;
    topPipeY;
    static pipe_Velocity = 5;
    constructor(width = 70) {
        this.width = width;
        this.x = myCanvas.width;
        this.y = this.#Generate_y();
        this.topPipeY = this.y - this.gap;
    }
    update() {
        this.#move();
    }
    #move() {
        this.x -= Pipe.pipe_Velocity;
    }
    #Generate_y() {
        return Math.floor(Math.floor(Math.random() * (window.innerHeight * 0.8 - window.innerHeight * 0.4 + 1))
            + window.innerHeight * 0.4);
    }
    draw(ctx, X = this.x) {
        this.x = X;
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, myCanvas.height - this.y);
        ctx.fillStyle = "#20c204";
        ctx.fill();
        ctx.beginPath();
        ctx.rect(this.x, this.y - this.gap, this.width, -(myCanvas.height + this.y + this.gap));
        ctx.fillStyle = "#20c204";
        ctx.fill();
    }
}
//# sourceMappingURL=pipe.js.map