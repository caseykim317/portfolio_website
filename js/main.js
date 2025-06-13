import { World } from './world.js';
import { Character } from './character.js';

class Game {
    constructor() {
        this.init();
    }

    init() {
        this.world = new World();
        this.character = new Character(this.world.scene, this.world.camera);
        
        // Start animation loop
        this.animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            this.world.onWindowResize();
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Update character
        this.character.update();
        
        // Render scene
        this.world.render();
    }
}

// Start the application when the window loads
window.addEventListener('load', () => {
    new Game();
});
