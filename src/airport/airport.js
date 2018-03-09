import Position from "../position/position";

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
        this.positions = new Map();
    }

    show () {
        this.marker.setVisible(true);
        this.visible = true;
    }

    hide() {
        this.marker.setVisible(false);
        this.visible = false;
    }

    addPositions(position){
        this.positions.set(position.id, position);
    }

    createPosition (opts){
        this.addPositions(new Position(...opts));
    }

    initEvents(){
        this.marker.addListener('click', () => {
            let content = '<b>' + this.icao +' - ' + this.name + '</b><br/>';
            for(let position of this.positions.values()){
                if(position.primary === true){
                    content += '<button>' + position.callsign +' </button>';
                }
            }
            this.drawingManager.displayPopin(content, this.marker);
        });
    }

    drawAirport(){

        let image = {
            url: this.icon_url,
            size: new google.maps.Size(36, 48),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 48)
        };

        if(this.positions.size === 0){
            this.icon_url = 'http://pichoster.net/images/2018/03/09/d3acf9f59b35745dbdde89c0cc73f73d.png';
            image = {
                url: this.icon_url,
                size: new google.maps.Size(26, 35),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 35)
            };
        }

        this.marker = new google.maps.Marker({
            map: this.drawingManager.gmap,
            draggable: false,
            position: {lat: this.lat, lng: this.lng},
            icon: image
        });
        this.marker.setVisible(false);
        this.initEvents();
    }

    set name (value){this._name = value;}
    get name (){return this._name;}

    set positions (value){this._positions = value;}
    get positions (){return this._positions;}

    set icao (value){this._icao = value;}
    get icao (){return this._icao;}

    set lat (value){this._lat = value;}
    get lat (){return this._lat;}

    set lng (value){this._lng = value;}
    get lng (){return this._lng;}

    set fir (value){this._fir = value;}
    get fir (){return this._fir;}

    set icon_url (value){this._icon_url = value;}
    get icon_url (){return this._icon_url;}

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