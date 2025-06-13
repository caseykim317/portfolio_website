export class Buildings {
    constructor(scene) {
        this.scene = scene;
        this.buildings = new Map();
        this.createBuildings();
    }

    createBuildings() {
        // Define building configurations
        const buildingsConfig = {
            workExperiences: {
                position: { x: -20, y: 0, z: -20 },
                color: 0x2196F3,  // Blue
                size: { width: 5, height: 8, depth: 5 }
            },
            burden: {
                position: { x: -10, y: 0, z: -20 },
                color: 0x4CAF50,  // Green
                size: { width: 5, height: 6, depth: 5 }
            },
            deconstructedReality: {
                position: { x: 0, y: 0, z: -20 },
                color: 0xFF9800,  // Orange
                size: { width: 5, height: 7, depth: 5 }
            },
            cloningDNA: {
                position: { x: 10, y: 0, z: -20 },
                color: 0x9C27B0,  // Purple
                size: { width: 5, height: 9, depth: 5 }
            },
            concreteAsylum: {
                position: { x: 20, y: 0, z: -20 },
                color: 0x607D8B,  // Blue Grey
                size: { width: 5, height: 8, depth: 5 }
            },
            digitalSelf: {
                position: { x: -10, y: 0, z: -10 },
                color: 0xE91E63,  // Pink
                size: { width: 5, height: 7, depth: 5 }
            },
            fashionTrend: {
                position: { x: 0, y: 0, z: -10 },
                color: 0xFFC107,  // Amber
                size: { width: 5, height: 6, depth: 5 }
            },
            opus: {
                position: { x: 10, y: 0, z: -10 },
                color: 0xF44336,  // Red
                size: { width: 5, height: 8, depth: 5 }
            }
        };

        // Create each building
        for (const [name, config] of Object.entries(buildingsConfig)) {
            this.createBuilding(name, config);
        }
    }

    createBuilding(name, config) {
        // Create building geometry
        const geometry = new THREE.BoxGeometry(
            config.size.width,
            config.size.height,
            config.size.depth
        );

        // Create material with custom shader for glowing effect
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                baseColor: { value: new THREE.Color(config.color) }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 baseColor;
                varying vec2 vUv;
                
                void main() {
                    float glow = sin(time * 2.0) * 0.5 + 0.5;
                    vec3 color = baseColor * (1.0 + glow * 0.2);
                    gl_FragColor = vec4(color, 1.0);
                }
            `
        });

        const building = new THREE.Mesh(geometry, material);
        building.position.set(config.position.x, config.position.y + config.size.height / 2, config.position.z);
        building.castShadow = true;
        building.receiveShadow = true;

        // Add interaction box (slightly larger than the building)
        const interactionGeometry = new THREE.BoxGeometry(
            config.size.width + 2,
            config.size.height,
            config.size.depth + 2
        );
        const interactionMaterial = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0,
            visible: false
        });
        const interactionBox = new THREE.Mesh(interactionGeometry, interactionMaterial);
        interactionBox.position.copy(building.position);

        // Store building info
        this.buildings.set(name, {
            mesh: building,
            interactionBox: interactionBox,
            config: config
        });

        // Add to scene
        this.scene.add(building);
        this.scene.add(interactionBox);

        // Add floating text above building
        this.addBuildingLabel(name, building.position, config.size.height);
    }

    addBuildingLabel(name, position, height) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 64;

        context.fillStyle = '#ffffff';
        context.font = '32px Arial';
        context.textAlign = 'center';
        context.fillText(this.formatBuildingName(name), canvas.width/2, canvas.height/2);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        
        sprite.position.set(position.x, position.y + height/2 + 1, position.z);
        sprite.scale.set(5, 1.25, 1);
        
        this.scene.add(sprite);
    }

    formatBuildingName(name) {
        return name
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
    }

    update(time) {
        // Update building materials (for glow effect)
        this.buildings.forEach(building => {
            building.mesh.material.uniforms.time.value = time;
        });
    }

    checkCollisions(character) {
        let nearestBuilding = null;
        let minDistance = Infinity;

        this.buildings.forEach((building, name) => {
            const distance = character.position.distanceTo(building.mesh.position);
            if (distance < 7) { // Interaction radius
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestBuilding = name;
                }
            }
        });

        return nearestBuilding;
    }
}
