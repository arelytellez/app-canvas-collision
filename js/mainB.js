const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const window_height = window.innerHeight/2;
const window_width = window.innerWidth/2;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

/* ==========================
   CLASE CIRCLE
   ========================== */

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.originalColor = color;
        this.text = text;

        // Velocidad real
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
        context.fillText(this.text, this.posX, this.posY);

        context.closePath();
    }

    update(context) {

        // Rebote contra bordes
        if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
            this.dx *= -1;
        }

        if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
            this.dy *= -1;
        }

        this.posX += this.dx;
        this.posY += this.dy;

        this.draw(context);
    }
}

/* ==========================
   CONFIGURACIÓN GENERAL
   ========================== */

const NUM_CIRCULOS = 12;  // 🔥 Cambia aquí la cantidad
const VELOCIDAD = 10;     // 🔥 Cambia aquí la velocidad

let circles = [];

/* ==========================
   CREAR CÍRCULOS
   ========================== */

for (let i = 0; i < NUM_CIRCULOS; i++) {

    let radius = Math.random() * 30 + 20;

    let x = Math.random() * (window_width - radius * 2) + radius;
    let y = Math.random() * (window_height - radius * 2) + radius;

    let circle = new Circle(
        x,
        y,
        radius,
        "blue",
        i + 1,
        VELOCIDAD
    );

    circles.push(circle);
}

/* ==========================
   DETECCIÓN DE COLISIONES
   ========================== */

function checkCollisions() {

    // Reiniciar colores
    circles.forEach(circle => {
        circle.color = circle.originalColor;
    });

    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {

            let dx = circles[j].posX - circles[i].posX;
            let dy = circles[j].posY - circles[i].posY;

            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= circles[i].radius + circles[j].radius) {
                circles[i].color = "red";
                circles[j].color = "red";
            }
        }
    }
}

/* ==========================
   ANIMACIÓN
   ========================== */

function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, window_width, window_height);

    circles.forEach(circle => {
        circle.update(ctx);
    });

    checkCollisions();
}

animate();
