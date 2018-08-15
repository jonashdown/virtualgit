class Room {
    constructor() {
        this.scene = document.createElement('a-scene');

        this.assets = document.createElement('a-assets');
        this.scene.appendChild(this.assets);

        this.addImage('images/wood.jpg', 'wood');
        
        const sky = document.createElement('a-sky');
        sky.setAttribute('color', '#666');
        this.scene.appendChild(sky);
        
        const plane = document.createElement('a-plane');
        plane.setAttribute('position', '0 0 -4');
        plane.setAttribute('rotation', '-90 0 0');
        plane.setAttribute('width', '50');
        plane.setAttribute('height', '50');
        plane.setAttribute('color', '#fff');
        plane.setAttribute('src', '#wood');
        plane.setAttribute('repeat', '20 20');
        this.scene.appendChild(plane);

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
}

class Project {
    constructor(project_name) {

    }
}

const room = new Room();
document.body.appendChild(room.getScene());
