class Airspace{
    constructor(params){
        const {name, callsign, fir, color, is_secondary, positions, visible, coordinates, drawingManager, parent} = params;
        this.name = name || "";
        this.callsign = callsign;
        this.fir = fir;
        this.color = color || "#000000";
        this.is_secondary = is_secondary || false;
        this.positions = positions || new Map();
        this.visible = !is_secondary;
        this.coordinates = coordinates || [];
        this.polygon = null;
        this.drawingManager = drawingManager;
        this.parent = parent;
    }

    hide () {
        this.polygon.setMap(null);
        this.visible = false;
        console.log(this, 'hide');
    }

    show () {
        this.polygon.setMap(this.drawingManager.gmap);
        this.visible = true;
        console.log(this,'show');
    }

    get drawingManager (){
        return this._drawingManager;
    }
    set drawingManager(value){
        this._drawingManager = value;
    }
    get name (){
        return this._name;
    }
    get callsign (){
        return this._callsign;
    }
    get fir (){
        return this._fir;
    }
    get color (){
        return this._color;
    }
    get is_secondary(){
        return this._is_secondary;
    }
    get positions(){
        return this._positions;
    }
    get visible(){
        return this._visible;
    }
    get coordinates () {
        return this._coordinates;
    }

    get polygon () {
        return this._polygon;
    }


    set polygon(value){
        this._polygon = value;
    }
    set name (value){
        this._name = value;
    }
    set callsign (value){
        this._callsign = value;
    }
    set fir (value){
        this._fir = value;
    }
    set color (value){
        this._color = value;
    }
    set is_secondary(value){
        this._is_secondary = value;
    }
    set positions(value){
        this._positions = value;
    }
    set visible(value){
        this._visible = value;
    }
    set coordinates (value) {
        this._coordinates = value;
    }
}

module.exports = Airspace;