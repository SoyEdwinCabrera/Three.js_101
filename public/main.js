// public/main.js
const socket = io();

// Configuración de la escena de Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game-container').appendChild(renderer.domElement);

// Pista de carreras
const trackGeometry = new THREE.PlaneGeometry(100, 5);
const trackMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 });
const track = new THREE.Mesh(trackGeometry, trackMaterial);
track.rotation.x = -Math.PI / 2;
scene.add(track);

// Crear coche
function createCar(color) {
    const carGeometry = new THREE.BoxGeometry(1, 0.5, 2);
    const carMaterial = new THREE.MeshBasicMaterial({ color });
    const car = new THREE.Mesh(carGeometry, carMaterial);
    return car;
}

const playerCar = createCar(0xff0000);
scene.add(playerCar);

// Posicionar la cámara
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

let speed = 0;
let direction = 0;

document.addEventListener('keydown', (event) => {
    switch(event.code) {
        case 'ArrowUp':
            speed = 0.1;
            break;
        case 'ArrowDown':
            speed = -0.1;
            break;
        case 'ArrowLeft':
            direction = 0.1;
            break;
        case 'ArrowRight':
            direction = -0.1;
            break;
        case 'Space':
            speed += 0.05; // Acelerar
            break;
    }

    // Emitir el movimiento del coche al servidor
    socket.emit('move', { speed, direction });
});

document.addEventListener('keyup', (event) => {
    switch(event.code) {
        case 'ArrowUp':
        case 'ArrowDown':
            speed = 0;
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
            direction = 0;
            break;
    }

    // Emitir el movimiento del coche al servidor
    socket.emit('move', { speed, direction });
});
