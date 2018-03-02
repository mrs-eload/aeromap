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

        this.infoWindow = new google.maps.InfoWindow();

        this.bounds = null;

    }

    hide () {
        this.polygon.setVisible(false);
        this.visible = false;
    }

    show () {
        this.polygon.setVisible(true);
        this.visible = true;
    }

    drawAirspace () {
        this.polygon = this.drawingManager.drawPolygon({
            paths: this.coordinates,
            strokeColor: this.color,
            strokeOpacity: 0.8,
            strokeWeight: 3,
            fillColor: this.color,
            fillOpacity: 0.35
        }, !this.is_secondary);

        this.initEvents();
    }

    initEvents () {
        let that = this;
        this.polygon.addListener('click', (e) => {
            //TODO
            // this.bounds = new google.maps.LatLngBounds();
            // e.getGeometry().forEachLatLng(function(latlng){
            //     that.bounds.extend(latlng);
            // });
            // this.displayPopin();
        });
    }

    displayPopin () {
        let ne = this.bounds.getNorthEast();
        let contentString = `<b>${this.callsign} - ${this.name}</b>`;
        // Set the info window's content and position.
        this.infoWindow.setContent(contentString);
        this.infoWindow.setPosition(ne);

        this.infoWindow.open(this.drawingManager.gmap);
    }

    hidePopin () {
        this.infoWindow.open(null);
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

    set bounds (value) { this._bounds = value;}
    get bounds () { return this._bounds;}
    set infoWindow (value) { this._infoWindow = value;}
    get infoWindow () { return this._infoWindow;}
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