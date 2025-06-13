import { ProjectPage } from './ProjectPage.js';
import { projectData } from './projectData.js';

export class Buildings {
    constructor(scene) {
        this.scene = scene;
        this.buildings = new Map();
        this.projectPages = new Map();
        console.log('Buildings initialized');
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

        // Use MeshStandardMaterial instead of ShaderMaterial
        const material = new THREE.MeshStandardMaterial({
            color: config.color,
            metalness: 0.3,
            roughness: 0.4
        });

        const building = new THREE.Mesh(geometry, material);
        building.position.set(
            config.position.x,
            config.position.y + config.size.height / 2,
            config.position.z
        );
        building.castShadow = true;
        building.receiveShadow = true;

        // Store building info
        this.buildings.set(name, {
            mesh: building,
            config: config
        });

        // Add to scene
        this.scene.add(building);

        // Add text label above building
        this.addBuildingLabel(name, building.position, config.size.height);
    }

    addBuildingLabel(name, position, height) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 64;

        context.fillStyle = 'white';
        context.font = '24px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(this.formatBuildingName(name), canvas.width/2, canvas.height/2);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ 
            map: texture,
            sizeAttenuation: true
        });
        const sprite = new THREE.Sprite(spriteMaterial);
        
        sprite.position.set(position.x, position.y + height/2 + 1, position.z);
        sprite.scale.set(2, 0.5, 1);
        
        this.scene.add(sprite);
    }

    formatBuildingName(name) {
        return name
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    }

    checkCollisions(characterPosition) {
        let nearestBuilding = null;
        let minDistance = Infinity;

        this.buildings.forEach((building, name) => {
            const distance = characterPosition.distanceTo(building.mesh.position);
            if (distance < 7) {
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestBuilding = name;
                }
            }
        });

        return nearestBuilding;
    }

    enterBuilding(buildingName) {
        console.log('Entering building:', buildingName);
        
        if (!this.projectPages.has(buildingName)) {
            console.log('Creating new project page for:', buildingName);
            const data = projectData[buildingName] || {};
            const projectPage = new ProjectPage(buildingName, data);
            this.projectPages.set(buildingName, projectPage);
        }
        
        const projectPage = this.projectPages.get(buildingName);
        if (projectPage) {
            console.log('Showing project page for:', buildingName);
            projectPage.show();
        }
    }

    exitBuilding(buildingName) {
        if (this.projectPages && this.projectPages[buildingName]) {
            this.projectPages[buildingName].hide();
        }
    }

    update(time) {
        // Simple update for buildings (can be expanded later)
        this.buildings.forEach((building) => {
            if (building.mesh.material.emissive) {
                building.mesh.material.emissive.setHex(building.mesh.material.color.getHex());
                building.mesh.material.emissiveIntensity = 0.2 + Math.sin(time * 2) * 0.1;
            }
        });
    }
}
