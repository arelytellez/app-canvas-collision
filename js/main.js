const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const window_height = window.innerHeight/2;
const window_width = window.innerWidth/2;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

class Circle {

    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.originalColor = color;
        this.text = text;
        this.speed = speed;

        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    draw(context) {
        context.beginPath();

        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";

        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();

        context.fillText(this.text, this.posX, this.posY);

        context.closePath();
    }

    update(context) {
        this.draw(context);

        if ((this.posX + this.radius) > window_width || (this.posX - this.radius) < 0) {
            this.dx = -this.dx;
        }

        if ((this.posY + this.radius) > window_height || (this.posY - this.radius) < 0) {
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;
    }
}

/* ==========================
   FUNCIÓN DE COLISIÓN
   ========================== */

function checkCollision(circle1, circle2) {

    let dx = circle2.posX - circle1.posX;
    let dy = circle2.posY - circle1.posY;

    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= circle1.radius + circle2.radius) {
        circle1.color = "red";
        circle2.color = "red";
    } else {
        circle1.color = circle1.originalColor;
        circle2.color = circle2.originalColor;
    }
}

/* ==========================
   CREACIÓN DE CÍRCULOS
   ========================== */

let miCirculo = new Circle(100, 100, 50, "blue", "1", 3);
let miCirculo2 = new Circle(450, 150, 80, "green", "2", 3);

/* ==========================
   ANIMACIÓN
   ========================== */

function updateCircle() {

    requestAnimationFrame(updateCircle);

    ctx.clearRect(0, 0, window_width, window_height);

    miCirculo.update(ctx);
    miCirculo2.update(ctx);

    checkCollision(miCirculo, miCirculo2);
}

updateCircle();
