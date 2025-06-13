import { LegoCharacter } from './LegoCharacter.js';

export class CharacterPreview {
    constructor(containerId, characterType) {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        
        this.setup();
        this.createCharacter(characterType);
        this.animate();
    }

    setup() {
        this.renderer.setSize(150, 150);
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);
        
        this.camera.position.z = 5;
        this.camera.position.y = 1;
        
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        this.scene.add(light);
        
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
    }

    createCharacter(type) {
        const character = LegoCharacter.createCharacter(type);
        character.rotation.y = Math.PI / 4;
        this.scene.add(character);
        this.character = character;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.character) {
            this.character.rotation.y += 0.01;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}
