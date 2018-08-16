var request = require ('request');

class Room {
    constructor() {
        this.walls = [];
        this.whiteboards = {};
        this.scene = document.createElement('a-scene');
        this.scene.setAttribute('position', '0 -2.5 0');

        this.assets = document.createElement('a-assets');
        this.scene.appendChild(this.assets);

        this.addImage('images/wood.jpg', 'wood');
        this.addImage('images/wallpaper.jpg', 'wallpaper');
        this.addModel('images/whiteboard/scene.gltf', 'whiteboard');
        this.addModel('images/sofa/scene.gltf', 'sofa');
        
        this.camera = document.createElement('a-entity');
        this.camera.setAttribute('position', '0 -4 -4');
        this.camera.appendChild(document.createElement('a-camera'));
        this.scene.appendChild(this.camera);
        
        const sky = document.createElement('a-sky');
        sky.setAttribute('color', '#666');
        this.scene.appendChild(sky);
        
        this.addWall('-3 -2.5 -4', '180 -90 0');
        this.addWall('3 -2.5 -4', '0 -90 0');
        this.addWall('0 -2.5 -1', '0 180 0');
        this.addWall('0 -2.5 -7', '0 0 0');

        const plane = document.createElement('a-plane');
        plane.setAttribute('position', '0 -5.5 -4');
        plane.setAttribute('rotation', '-90 0 0');
        plane.setAttribute('width', '6');
        plane.setAttribute('height', '6');
        plane.setAttribute('color', '#fff');
        plane.setAttribute('src', '#wood');
        plane.setAttribute('repeat', '20 20');
        this.scene.appendChild(plane);

        //const sofa = document.createElement('a-entity');
        //sofa.setAttribute('gltf-model', 'url(images/sofa/scene.gltf)');
        //sofa.setAttribute('scale', '0.007 0.007 0.007');
        //sofa.setAttribute('position', '15.7 -5.5 -33');
        //sofa.setAttribute('rotation', '0 180 0');
        //this.scene.appendChild(sofa);

        this.addProjectBoard(1);
        //this.addTicketToProject(1, 'test', 0);
        //this.addTicketToProject(1, 'test2', 0);
        //this.addTicketToProject(1, 'test2', 0);
        //this.addTicketToProject(1, 'test2', 0);
        //this.addTicketToProject(1, 'test2', 0);
        //this.addTicketToProject(1, 'test3', 1);
        //this.addTicketToProject(1, 'test3', 1);
        //this.addTicketToProject(1, 'test3', 1);
        //this.addTicketToProject(1, 'test3', 1);
        //this.addTicketToProject(1, 'test4', 2);
        //this.addTicketToProject(1, 'test5', 2);
        //this.addTicketToProject(1, 'test6', 2);
        //this.addTicketToProject(1, 'test6', 2);
        //this.addTicketToProject(1, 'test6', 2);
        //this.addTicketToProject(1, 'test7', 2);
    }

    addWall(position, rotation) {
        const wall = document.createElement('a-plane');
        wall.setAttribute('position', position);
        wall.setAttribute('rotation', rotation);
        wall.setAttribute('width', '6');
        wall.setAttribute('height', '6');
        wall.setAttribute('color', '#fff');
        wall.setAttribute('src', '#wallpaper');
        wall.setAttribute('repeat', '20 20');
        wall.setAttribute('id', 'wall' + this.walls.length);
        this.scene.appendChild(wall);
        this.walls.push(wall);

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

    addProjectBoard(project_id) {
        const whiteboard = document.createElement('a-entity');
        whiteboard.setAttribute('gltf-model', 'url(images/whiteboard/scene.gltf)');
        whiteboard.setAttribute('id', 'project-' + project_id);
        whiteboard.setAttribute('scale', '0.25 0.25 0.25');
        whiteboard.setAttribute('position', '0 -4 -5');
        this.scene.appendChild(whiteboard);

        this.whiteboards[project_id] = {
            model: whiteboard,
            tickets: [[],[],[]],
            columns: []
        }
    }

    addColumnToProject(project_id, column_title) {
        const start_position_x = -0.8;
        const width_of_board = 8;
        const y = 6.9;
        const d = -0.15; 

        let whiteboard = this.whiteboards[project_id];

        const x = start_position_x + ((width_of_board/3)*whiteboard.columns.length);

        const column = document.createElement('a-text');
        column.setAttribute('value', column_title);
        column.setAttribute('position', [x, y, d].join(' '));
        column.setAttribute('color', '#000');

        whiteboard.model.appendChild(column);

        whiteboard.columns.push(column);

    }

    addTicketToProject(project_id, ticket_title, col) {
        const post_it_note_colours = ['#ff7eb9', '#ff65a3', '#7afcff', '#feff9c', '#fff740'];
        const start_position_x = -0.8;
        const start_position_y = 6;
        const start_position_d = -0.15; 
        const width_of_board = 8;

        const ticket_width = 1;
        const ticket_height = 1;

        let whiteboard = this.whiteboards[project_id];
        const ticket = document.createElement('a-entity');

        ticket.setAttribute('geometry', "primitive: plane; width: "+ticket_width+"; height: "+ticket_height);
        ticket.setAttribute('click-drag', true);

        
        //how many lines do we have?
        const num_of_tickets = whiteboard.tickets[col].length;
        const total_width = num_of_tickets * ticket_width;
        const offset_height = Math.random()*0.1;
        const total_lines = Math.ceil(total_width / (width_of_board/3));
        const y = start_position_y - (total_lines*(ticket_height + 0.1)) - offset_height;
        
        const offset_width = Math.random()*0.1;
        const col_pos = width_of_board/3 * col;
        const tickets_per_row = (width_of_board/3)/ticket_width;
        const offset_to_remove = Math.floor(total_lines*(tickets_per_row-1)*ticket_width);
        const x = start_position_x + ((ticket_width + 0.1) * whiteboard.tickets[col].length) - offset_width + col_pos - offset_to_remove;
        
        const rotate = this.random(-10, 10);
        const d = start_position_d;

        ticket.setAttribute('position', x + " " + y + " " + d);
        ticket.setAttribute('rotation', '0 0 ' + rotate);

        ticket.setAttribute('material', 'color: ' + post_it_note_colours[Math.floor(Math.random() * post_it_note_colours.length)]); 
        ticket.setAttribute('id', 'ticket-' + col + '-' + whiteboard.tickets[col].length + '-' + project_id);

        const text = document.createElement('a-text');
        text.setAttribute("value", ticket_title);
        text.setAttribute("color", '#000');
        text.setAttribute('align', 'center');
        text.setAttribute('wrap-count', 7);
        text.setAttribute('width', 1);

        ticket.appendChild(text);

        //text.setAttribute("value", 'value: ' + ticket_title + '; width: 1; color: #000');
        whiteboard.model.appendChild(ticket); 
        whiteboard.tickets[col].push(ticket);
    }

    random(min, max) {
        return Math.floor(min + Math.random()*(max+1 - min));
    }

}

function renderProjectBoard (room, data) {
    data.columns.forEach((col) => {
        room.addColumnToProject(1, col.name);
        request(window.location + 'column/' + col.id + '/cards', (err, res, body) => {
            JSON.parse(body).cards.forEach((card, i) => {
                let issue = card.content_url.split('/');
                let issue_id = issue[issue.length-1];

                request(window.location + 'issue/' + issue_id, function(err, res, body) {
                    let b = JSON.parse(body);
                    console.log(b);
                    room.addTicketToProject(1, b.issue.title, i);
                });
            });
        });
    });
}; 

function getProjectBoard (room) {
    request(window.location + 'project/1712999/columns', function (error, response, body) {
        if (error) {
            console.error(error);
        }
        else {
            renderProjectBoard(room, JSON.parse(body));
        }
    });
};

const room = new Room();
document.body.appendChild(room.getScene());
getProjectBoard(room);
