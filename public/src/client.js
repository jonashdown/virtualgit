class Room {
    constructor() {
        this.scene = document.createElement('a-scene');

        this.assets = document.createElement('a-assets');
        this.scene.appendChild(this.assets);

        this.addImage('images/wood.jpg', 'wood');
        this.addImage('images/wallpaper.jpg', 'wallpaper');
        this.addModel('images/whiteboard/scene.gltf', 'whiteboard');
        this.addModel('images/sofa/scene.gltf', 'sofa');
        
        this.camera = document.createElement('a-entity');
        this.camera.setAttribute('position', '0 4 15');
        this.camera.appendChild(document.createElement('a-camera'));
        this.scene.appendChild(this.camera);
        
        const sky = document.createElement('a-sky');
        sky.setAttribute('color', '#666');
        this.scene.appendChild(sky);
        
        const wall1 = document.createElement('a-plane');
        wall1.setAttribute('position', '0 0 -29');
        wall1.setAttribute('width', '50');
        wall1.setAttribute('height', '50');
        wall1.setAttribute('color', '#fff');
        wall1.setAttribute('src', '#wallpaper');
        wall1.setAttribute('repeat', '20 20');
        wall1.setAttribute('id', 'wall1');
        this.scene.appendChild(wall1);
        
        const wall2 = document.createElement('a-plane');
        wall2.setAttribute('position', '0 0 21');
        wall2.setAttribute('rotation', '0 180 0');
        wall2.setAttribute('width', '50');
        wall2.setAttribute('height', '50');
        wall2.setAttribute('color', '#fff');
        wall2.setAttribute('src', '#wallpaper');
        wall2.setAttribute('repeat', '20 20');
        wall2.setAttribute('id', 'wall2');
        this.scene.appendChild(wall2);

        const wall3 = document.createElement('a-plane');
        wall3.setAttribute('position', '25 0 -4');
        wall3.setAttribute('rotation', '0 -90 0');
        wall3.setAttribute('width', '50');
        wall3.setAttribute('height', '50');
        wall3.setAttribute('color', '#fff');
        wall3.setAttribute('src', '#wallpaper');
        wall3.setAttribute('repeat', '20 20');
        wall3.setAttribute('id', 'wall3');
        this.scene.appendChild(wall3);

        const wall4 = document.createElement('a-plane');
        wall4.setAttribute('position', '-25 0 -4');
        wall4.setAttribute('rotation', '180 -90 0');
        wall4.setAttribute('width', '50');
        wall4.setAttribute('height', '50');
        wall4.setAttribute('color', '#fff');
        wall4.setAttribute('src', '#wallpaper');
        wall4.setAttribute('repeat', '20 20');
        wall4.setAttribute('id', 'wall4');
        this.scene.appendChild(wall4);

        const plane = document.createElement('a-plane');
        plane.setAttribute('position', '0 -5.5 -4');
        plane.setAttribute('rotation', '-90 0 0');
        plane.setAttribute('width', '50');
        plane.setAttribute('height', '50');
        plane.setAttribute('color', '#fff');
        plane.setAttribute('src', '#wood');
        plane.setAttribute('repeat', '20 20');
        this.scene.appendChild(plane);

        const whiteboard = document.createElement('a-entity');
        whiteboard.setAttribute('gltf-model', 'url(images/whiteboard/scene.gltf)');
        this.scene.appendChild(whiteboard);

        const sofa = document.createElement('a-entity');
        sofa.setAttribute('gltf-model', 'url(images/sofa/scene.gltf)');
        sofa.setAttribute('scale', '0.007 0.007 0.007');
        sofa.setAttribute('position', '15.7 -5.5 -33');
        sofa.setAttribute('rotation', '0 180 0');
        this.scene.appendChild(sofa);
    }

    getScene() {
        return this.scene;
    }

    addImage(img, id) {
        const image = document.createElement('img');
        image.setAttribute('src', img);
        image.setAttribute('id', id);

        this.assets.appendChild(image);
    }

    addModel(filename, id) {
        const model = document.createElement('a-asset-item');
        model.setAttribute('src', filename);
        model.setAttribute('id', id);

        this.assets.appendChild(model);
    }
}

class Project {
    constructor(room) {
            
    }
}

const room = new Room();
document.body.appendChild(room.getScene());
