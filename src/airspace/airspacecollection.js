import Airspace from './airspace';

class AirspaceCollection {
    constructor(fir, airspaces= new Map(), color="#000000", is_metropolitan=true, drawingManager, secondary_mode){
        this.fir = fir;
        this.airspaces = airspaces;
        this.color = color;
        this.is_metropolitan = is_metropolitan;
        this.drawingManager = drawingManager;
        this.secondary_mode = secondary_mode;
    }
    add(airspace){
        this.airspaces.set(airspace.callsign, airspace);
    }
    createAirspace(options){
        // if(this.hasAirspace(options.callsign));
        this.add(new Airspace(...options));
    }

    hasAirspace(airspace){
        if(typeof airspace === 'string'){
            return this.findAirspace(airspace) !== null;
        }else{
            return this.findAirspace(airspace.callsign) !== null;
        }
    }

    findAirspace(callsign){
        return this.airspaces.get(callsign);
    }

    drawAirspaces () {
        for(let airspace of this.airspaces.values()){
            this.drawAirspace(airspace);
        }
    }

    drawAirspace(airspace){
        airspace.drawAirspace();
    }

    hide () {
        this.airspaces.forEach(value => value.hide());
    }

    show () {
        if(this.secondary_mode === true){
            this.showSecondary();
        }else{
            this.showPrimary();
        }
    }

    showPrimary () {
        for(let airspace of this.airspaces.values()){
            if(airspace.is_secondary === false)
                airspace.show();
            else
                airspace.hide();
        }
    }

    showSecondary () {
        for(let airspace of this.airspaces.values()){
            if(airspace.is_secondary === true)
                airspace.show();
            else
                airspace.hide();
        }
    }


    set drawingManager(value){
        this._drawingManager = value;
    }

    get drawingManager(){
        return this._drawingManager;
    }
    set secondary_mode(value){
        this._secondary_mode = value;
    }

    get secondary_mode(){
        return this._secondary_mode;
    }

    get is_metropolitan (){
        return this._is_metropolitan;
    }
    get color (){
        return this._color;
    }
    get airspaces () {
        return this._airspaces;
    }
    get fir () {
        return this._fir;
    }
    get type (){
        return "AirspaceCollection"
    }

    set is_metropolitan (value){
        this._is_metropolitan = value;
    }
    set color (value){
        this._color = value;
    }
    set airspaces (value) {
        this._airspaces = value;
    }
    set fir (value) {
        this._fir = value;
    }
}

module.exports = AirspaceCollection;
