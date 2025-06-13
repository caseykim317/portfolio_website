import { LegoCharacter } from './LegoCharacter.js';

export class Character {
    constructor(scene, camera, characterType) {
        this.scene = scene;
        this.camera = camera;
        this.characterType = characterType;
        this.character = null;
        this.moveSpeed = 0.1;
        this.rotationSpeed = 0.05;
        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            interact: false
        };
        
        this.createCharacter();
        this.setupControls();
    }

    createCharacter() {
        this.character = LegoCharacter.createCharacter(this.characterType);
        this.character.position.y = 0.15; // Adjust to stand on ground
        this.scene.add(this.character);

        // Position camera behind character
        this.camera.position.set(0, 2, 5);
        this.camera.lookAt(this.character.position);
    }

    setupControls() {
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
        document.addEventListener('keyup', (e) => this.onKeyUp(e));
    }

    onKeyDown(event) {
        switch(event.key.toLowerCase()) {
            case 'w': this.keys.forward = true; break;
            case 's': this.keys.backward = true; break;
            case 'a': this.keys.left = true; break;
            case 'd': this.keys.right = true; break;
            case 'e': this.keys.interact = true; break;
        }
    }

    onKeyUp(event) {
        switch(event.key.toLowerCase()) {
            case 'w': this.keys.forward = false; break;
            case 's': this.keys.backward = false; break;
            case 'a': this.keys.left = false; break;
            case 'd': this.keys.right = false; break;
            case 'e': this.keys.interact = false; break;
        }
    }

    checkBuildingInteractions() {
        if (!this.scene.buildings) return;
        
        const nearestBuilding = this.scene.buildings.checkCollisions(this.character);
        if (nearestBuilding) {
            document.getElementById('project-info').textContent = `Press 'E' to enter ${nearestBuilding}`;
            document.getElementById('project-info').style.display = 'block';
            
            if (this.keys.interact) {
                // Handle building entry
                console.log(`Entering ${nearestBuilding}`);
                // Add building entry logic here
            }
        } else {
            document.getElementById('project-info').style.display = 'none';
        }
    }

    update() {
        if (this.character) {
            // Movement
            if (this.keys.forward) {
                this.character.position.z -= Math.cos(this.character.rotation.y) * this.moveSpeed;
                this.character.position.x -= Math.sin(this.character.rotation.y) * this.moveSpeed;
            }
            if (this.keys.backward) {
                this.character.position.z += Math.cos(this.character.rotation.y) * this.moveSpeed;
                this.character.position.x += Math.sin(this.character.rotation.y) * this.moveSpeed;
            }
            if (this.keys.left) {
                this.character.rotation.y += this.rotationSpeed;
            }
            if (this.keys.right) {
                this.character.rotation.y -= this.rotationSpeed;
            }

            // Update camera position
            const cameraOffset = new THREE.Vector3(
                Math.sin(this.character.rotation.y) * 5,
                2,
                Math.cos(this.character.rotation.y) * 5
            );
            
            this.camera.position.copy(this.character.position).add(cameraOffset);
            this.camera.lookAt(this.character.position);

            // Check building interactions
            this.checkBuildingInteractions();
        }
    }
}
