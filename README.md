# Portfolio World - 3D Interactive Portfolio

## Project Structure
portfolio_website/
├── assets/
│   ├── models/         # 3D models (future use)
│   ├── textures/       # Textures for buildings
│   └── characters/     # Lego character assets
├── css/
│   ├── style.css      # Main styles
│   └── projects/      # Individual project page styles
├── js/
│   ├── main.js        # Entry point
│   ├── world.js       # 3D world setup
│   ├── character.js   # Character controls
│   ├── LegoCharacter.js # Character model creation
│   ├── CharacterPreview.js # Character selection preview
│   └── utils/         # Helper functions
├── pages/             # Individual project pages
└── index.html         # Main entry point

## Technical Stack
- Three.js (3D rendering)
- HTML5
- CSS3
- JavaScript (ES6+)

## Features Implemented
1. Character Selection System
   - 5 unique Lego-style characters
   - Interactive 3D preview
   - Different colors for each character type

2. 3D World
   - Sky background
   - Ground plane with shadows
   - Directional and ambient lighting

3. Character Controls
   - WASD movement
   - Third-person camera
   - Smooth rotation
   - Shadow casting

## Next Steps
1. Building Implementation
   - Create 8 unique buildings for projects:
     - Work Experiences
     - Burden
     - Deconstructed Reality
     - Cloning DNA
     - Concrete Asylum
     - Exploring the Digital Self
     - Fashion Trend VS Eco-Friendly
     - Opus

2. Project Pages
   - Individual detailed pages for each project
   - Smooth transitions from 3D world to project view
   - Interactive content display

3. Interaction System
   - Building entry/exit mechanics
   - Project information display
   - Collision detection

4. Polish Features
   - Loading screen with progress
   - Performance optimization
   - Mobile controls
   - Sound effects
   - Day/night cycle
   - Weather effects
   - Mini-map
   - Project preview tooltips

## Running the Project
1. Set up a local server (required for ES6 modules)
   ```bash
   # Using Python 3
   python -m http.server
   # Or using Python 2
   python -m SimpleHTTPServer
   ```
2. Open `http://localhost:8000` in your browser
3. Select a character and use WASD to move around

## Current Status
✅ Character Selection System
✅ Basic 3D World
✅ Character Controls
⏳ Buildings Implementation
⏳ Project Pages
⏳ Interaction System
⏳ Polish Features