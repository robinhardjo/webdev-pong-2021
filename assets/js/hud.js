class Hud {
    constructor(game) {
        this.parent = game;
        this.canvas = document.getElementById('hud');
        this.context = this.canvas.getContext('2d');

        this.edges = [
            new Edge(this.canvas.width/2, 5, this.canvas.width, 10),
            new Edge(this.canvas.width/2, this.canvas.height-5, this.canvas.width, 10)
        ];

        for(let i=0; i<=22; i++) {
            this.edges.push( new Edge(this.canvas.width/2, 20+(i*20), 10, 10) );
        }

        this.score1 = new Label(this.canvas.width/2 - 30, 60, 10, 'white', '0', 'left');
        this.score2 = new Label(this.canvas.width/2 + 30, 60, 10, 'white', '0', 'right');

        this.draw()
    }

    addScore(playerId) {
        const id = playerId===1 ? 0 : 1;

        this.parent.players[id].score++;

        if(id===0){
            this.score1.update(String(this.parent.players[id].score));
        }else if(id===1) {
            this.score2.update(String(this.parent.players[id].score));
        }
        this.draw();
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.edges.forEach(edge => this.parent.drawRectangle(this.context, edge, edge.color));

        for(let r=0; r<this.score1.rectangles.length; r++) {
            let rectangle = this.score1.rectangles[r];
            this.parent.drawRectangle(this.context, rectangle, rectangle.color)
        }

        for(let r=0; r<this.score2.rectangles.length; r++) {
            let rectangle = this.score2.rectangles[r];
            this.parent.drawRectangle(this.context, rectangle, rectangle.color)
        }
    }
}