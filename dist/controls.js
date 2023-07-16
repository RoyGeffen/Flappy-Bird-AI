export default class Controls {
    jump = false;
    beginGame = false;
    last_jump = 0;
    constructor(User) {
        if (User === "HUMAN") {
            this.#addkeyboradlisteners();
        }
    }
    #addkeyboradlisteners() {
        document.onkeydown = (event) => {
            switch (event.key) {
                case "ArrowUp":
                    if (this.beginGame) {
                        this.jump = true;
                    }
                    else {
                        this.beginGame = true;
                    }
                    break;
                case " ":
                    if (this.beginGame) {
                        this.jump = true;
                    }
                    else {
                        this.beginGame = true;
                    }
                    break;
            }
        };
        window.addEventListener('click', (event) => {
            if (event.button == 0) {
                if (this.beginGame) {
                    this.jump = true;
                }
                else {
                    this.beginGame = true;
                }
            }
        });
    }
}
//# sourceMappingURL=controls.js.map