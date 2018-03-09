import Position from "../position/position";

class PositionCollection{
    constructor(positions = new Map(), airport){
        this.positions = positions;
        this.airport = airport;
    }

    add (position) {
        this.positions.set(position.id, position);
    }


    set positions(value){this._positions = value;}
    get positions(){return this._positions;}
    set airport(value){this._airport = value;}
    get airport(){return this._airport;}
}

module.exports = PositionCollection;