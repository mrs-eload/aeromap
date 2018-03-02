module.exports = Airport;

class Airport{
    constructor(params){
        const {name, icao, lat, lng, fir, is_fictive, drawingManager, parent, icon_url} = params;
        this.name = name;
        this.icao = icao;
        this.lat = lat;
        this.lng = lng;
        this.fir = fir;
        this.parent = parent;
        this.is_fictive = is_fictive;
        this.drawingManager = drawingManager;
        this.icon_url = icon_url;
        this.marker = null;
        this.visible = false;

        this.infoWindow = new google.maps.InfoWindow();
    }

    show () {
        this.marker.setVisible(true);
        this.visible = true;
    }

    hide() {
        this.marker.setVisible(false);
        this.visible = false;
    }

    drawAirport(){
        this.marker = new google.maps.Marker({
            map: this.drawingManager.gmap,
            draggable: false,
            position: {lat: this.lat, lng: this.lng},
            icon: this.icon_url
        });
        this.marker.setVisible(false);
    }

    set name (value){this._name = value;}
    get name (){return this._name;}

    set icao (value){this._icao = value;}
    get icao (){return this._icao;}

    set lat (value){this._lat = value;}
    get lat (){return this._lat;}

    set lng (value){this._lng = value;}
    get lng (){return this._lng;}

    set fir (value){this._fir = value;}
    get fir (){return this._fir;}

    set is_fictive (value){this._is_fictive = value;}
    get is_fictive (){return this._is_fictive;}

    set parent (value){this._parent = value;}
    get parent (){return this._parent;}

    set drawingManager (value){this._drawingManager = value;}
    get drawingManager (){return this._drawingManager;}

    set marker (value){this._marker = value;}
    get marker (){return this._marker;}

    set visible (value){this._visible = value;}
    get visible (){return this._visible;}

}
module.exports = Airport;