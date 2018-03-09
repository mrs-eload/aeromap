class Position{
    constructor(params){
        const{id, name, callsign, position_type, frequency, afis, airport, primary, exam_possible, parent, children} = params;
        this.id = id;
        this.name = name;
        this.callsign = callsign;
        this.type = position_type;
        this.frequency = frequency;
        this.afis = afis;
        this.airport = airport;
        this.primary = primary;
        this.exam_possible = exam_possible;
        this.parent = parent;
        this.children = children;
    }

    addParent(airport){
        this.parent = airport;
    }

    addChild(airport){
        this.children.set()
    }


    set id (value){this._id = value;}
    get id (){return this._id;}
    set name (value){this._name = value;}
    get name (){return this._name;}
    set callsign (value){this._callsign = value;}
    get callsign (){return this._callsign;}
    set type (value){this._type = value;}
    get type (){return this._type;}
    set frequency (value){this._frequency = value;}
    get frequency (){return this._frequency;}
    set afis (value){this._afis = value;}
    get afis (){return this._afis;}
    set airport (value){this._airport = value;}
    get airport (){return this._airport;}
    set primary (value){this._primary = value;}
    get primary (){return this._primary;}
    set exam_possible (value){this._exam_possible = value;}
    get exam_possible (){return this._exam_possible;}
    set parent (value){this._parent = value;}
    get parent (){return this._parent;}
    set children (value){this._children = value;}
    get children (){return this._children;}
}

module.exports = Position;