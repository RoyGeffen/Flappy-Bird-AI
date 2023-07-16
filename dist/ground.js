import { myCanvas } from "./index.js";
export default class Ground {
    static ground_height = window.innerHeight * 0.9;
    constructor() {
    }
    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, Ground.ground_height, myCanvas.width, myCanvas.height);
        ctx.fillStyle = "#deb066";
        ctx.fill();
    }
}
//# sourceMappingURL=ground.js.map