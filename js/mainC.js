const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;

/* ========================== CLASE CIRCLE ========================== */
class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.dx = (Math.random() - 0.5) * speed;
        this.dy = (Math.random() - 0.5) * speed;
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        context.stroke();

        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillStyle = "white";
        context.fillText(this.text, this.posX, this.posY);

        context.closePath();
    }

    update(context) {

        // Rebote contra bordes (CORREGIDO)
        if (this.posX + this.radius > canvas.width) {
            this.posX = canvas.width - this.radius;
            this.dx *= -1;
        }

        if (this.posX - this.radius < 0) {
            this.posX = this.radius;
            this.dx *= -1;
        }

        if (this.posY + this.radius > canvas.height) {
            this.posY = canvas.height - this.radius;
            this.dy *= -1;
        }

        if (this.posY - this.radius < 0) {
            this.posY = this.radius;
            this.dy *= -1;
        }

        this.posX += this.dx;
        this.posY += this.dy;

        this.draw(context);
    }
}

/* ========================== CONFIGURACIÓN ========================== */
const NUM_CIRCULOS = 8;
const VELOCIDAD = 8;
let circles = [];

/* ========================== CREAR CÍRCULOS ========================== */
for (let i = 0; i < NUM_CIRCULOS; i++) {
    let radius = Math.random() * 30 + 20;
    let x = Math.random() * (canvas.width - radius * 2) + radius;
    let y = Math.random() * (canvas.height - radius * 2) + radius;

    circles.push(
        new Circle(x, y, radius, "blue", i + 1, VELOCIDAD)
    );
}

/* ========================== COLISIÓN ========================== */
function resolveCollision(c1, c2) {

    let dx = c2.posX - c1.posX;
    let dy = c2.posY - c1.posY;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) return; // Evita división por cero

    if (distance < c1.radius + c2.radius) {

        let nx = dx / distance;
        let ny = dy / distance;

        let tx = -ny;
        let ty = nx;

        let dpTan1 = c1.dx * tx + c1.dy * ty;
        let dpTan2 = c2.dx * tx + c2.dy * ty;

        let dpNorm1 = c1.dx * nx + c1.dy * ny;
        let dpNorm2 = c2.dx * nx + c2.dy * ny;

        let m1 = dpNorm2;
        let m2 = dpNorm1;

        c1.dx = tx * dpTan1 + nx * m1;
        c1.dy = ty * dpTan1 + ny * m1;
        c2.dx = tx * dpTan2 + nx * m2;
        c2.dy = ty * dpTan2 + ny * m2;

        let overlap = (c1.radius + c2.radius - distance) / 2;

        c1.posX -= overlap * nx;
        c1.posY -= overlap * ny;
        c2.posX += overlap * nx;
        c2.posY += overlap * ny;
    }
}

/* ========================== DETECTAR COLISIONES ========================== */
function checkCollisions() {
    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            resolveCollision(circles[i], circles[j]);
        }
    }
}

/* ========================== ANIMACIÓN ========================== */
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circles.forEach(circle => {
        circle.update(ctx);
    });

    checkCollisions();
}

animate();

