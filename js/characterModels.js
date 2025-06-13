export const CharacterModels = {
    casual: {
        modelPath: 'assets/models/lego/casual.glb',
        scale: 0.5,
        offset: { y: 0 }
    },
    farmer: {
        modelPath: 'assets/models/lego/farmer.glb',
        scale: 0.5,
        offset: { y: 0 }
    },
    adventurer: {
        modelPath: 'assets/models/lego/adventurer.glb',
        scale: 0.5,
        offset: { y: 0 }
    },
    student: {
        modelPath: 'assets/models/lego/student.glb',
        scale: 0.5,
        offset: { y: 0 }
    },
    professional: {
        modelPath: 'assets/models/lego/professional.glb',
        scale: 0.5,
        offset: { y: 0 }
    }
};

export class LegoCharacter {
    static createCharacter(type) {
        const group = new THREE.Group();

        // Colors for different character types
        const colors = {
            casual: {
                shirt: 0xff0000,    // Red shirt
                pants: 0x0000ff,    // Blue pants
                skin: 0xffcc99      // Skin tone
            },
            farmer: {
                shirt: 0x00ff00,    // Green shirt
                pants: 0x964B00,    // Brown pants
                skin: 0xffcc99
            },
            adventurer: {
                shirt: 0x964B00,    // Brown shirt
                pants: 0x333333,    // Dark gray pants
                skin: 0xffcc99
            },
            student: {
                shirt: 0xff69b4,    // Pink shirt
                pants: 0x0000ff,    // Blue pants
                skin: 0xffcc99
            },
            professional: {
                shirt: 0x000000,    // Black shirt
                pants: 0x333333,    // Dark gray pants
                skin: 0xffcc99
            }
        };

        const color = colors[type];

        // Head
        const head = new THREE.Mesh(
            new THREE.BoxGeometry(0.3, 0.3, 0.3),
            new THREE.MeshPhongMaterial({ color: color.skin })
        );
        head.position.y = 0.65;

        // Body
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(0.4, 0.4, 0.2),
            new THREE.MeshPhongMaterial({ color: color.shirt })
        );
        body.position.y = 0.3;

        // Legs
        const leftLeg = new THREE.Mesh(
            new THREE.BoxGeometry(0.15, 0.3, 0.2),
            new THREE.MeshPhongMaterial({ color: color.pants })
        );
        leftLeg.position.set(-0.1, 0, 0);

        const rightLeg = new THREE.Mesh(
            new THREE.BoxGeometry(0.15, 0.3, 0.2),
            new THREE.MeshPhongMaterial({ color: color.pants })
        );
        rightLeg.position.set(0.1, 0, 0);

        // Arms
        const leftArm = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 0.3, 0.1),
            new THREE.MeshPhongMaterial({ color: color.shirt })
        );
        leftArm.position.set(-0.25, 0.3, 0);

        const rightArm = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 0.3, 0.1),
            new THREE.MeshPhongMaterial({ color: color.shirt })
        );
        rightArm.position.set(0.25, 0.3, 0);

        // Add all parts to the group
        group.add(head);
        group.add(body);
        group.add(leftLeg);
        group.add(rightLeg);
        group.add(leftArm);
        group.add(rightArm);

        // Add shadows
        group.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
            }
        });

        return group;
    }
}
