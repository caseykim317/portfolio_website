export class Character {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.character = null;
        this.moveSpeed = 0.1;
        this.rotationSpeed = 0.05;
        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false
        };
        
        this.init();
        this.setupControls();
    }

    init() {
        // Temporary character (cube)
        const geometry = new THREE.BoxGeometry(1, 2, 1);
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        this.character = new THREE.Mesh(geometry, material);
        this.character.position.y = 1;
        this.character.castShadow = true;
        this.scene.add(this.character);

        // Position camera behind character
        this.camera.position.set(0, 3, 5);
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
        }
    }

    onKeyUp(event) {
        switch(event.key.toLowerCase()) {
            case 'w': this.keys.forward = false; break;
            case 's': this.keys.backward = false; break;
            case 'a': this.keys.left = false; break;
            case 'd': this.keys.right = false; break;
        }
    }

    update() {
        if (this.character) {
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
                3,
                Math.cos(this.character.rotation.y) * 5
            );
            
            this.camera.position.copy(this.character.position).add(cameraOffset);
            this.camera.lookAt(this.character.position);
        }
    }
}
