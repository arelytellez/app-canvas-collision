# 🎯 Simulación de Colisiones en Canvas (HTML, CSS y JavaScript)

## 📌 Descripción

Este proyecto es una simulación de colisiones elásticas entre múltiples círculos utilizando **HTML5 Canvas y JavaScript puro**.

Los círculos:
- Se mueven con velocidad aleatoria.
- Rebotan contra los bordes del canvas.
- Colisionan entre sí aplicando física básica de colisión elástica.
- Nunca se salen del área visible.

---

## 🛠 Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (ES6)
- API Canvas 2D

---

## ⚙️ Funcionamiento del proyecto

### 1️⃣ Inicialización del Canvas

El canvas ocupa la mitad del ancho y alto de la ventana del navegador:

```javascript
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;
