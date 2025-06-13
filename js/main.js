import { World } from './world.js';
import { Character } from './character.js';
import { CharacterPreview } from './CharacterPreview.js';

export class Game {
    constructor() {
        this.world = null;
        this.character = null;
        this.characterPreviews = {};
        this.setupCharacterSelection();
    }

    setupCharacterSelection() {
        // Create preview for each character type
        const characterTypes = ['casual', 'farmer', 'adventurer', 'student', 'professional'];
        characterTypes.forEach(type => {
            this.characterPreviews[type] = new CharacterPreview(`preview-${type}`, type);
        });

        const characterOptions = document.querySelectorAll('.character-option');
        const startButton = document.getElementById('start-game');
        let selectedCharacter = null;

        characterOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove selected class from all options
                characterOptions.forEach(opt => opt.classList.remove('selected'));
                // Add selected class to clicked option
                option.classList.add('selected');
                selectedCharacter = option.dataset.character;
                startButton.disabled = false;
            });
        });

        startButton.addEventListener('click', () => {
            if (selectedCharacter) {
                document.getElementById('character-selection').style.display = 'none';
                this.startGame(selectedCharacter);
            }
        });
    }

    startGame(characterType) {
        this.world = new World();
        this.character = new Character(this.world.scene, this.world.camera, characterType);
        
        // Start animation loop
        this.animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            this.world.onWindowResize();
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        if (this.character) this.character.update();
        if (this.world) this.world.render();
    }
}

// Start the application when the window loads
window.addEventListener('load', () => {
    new Game();
});
