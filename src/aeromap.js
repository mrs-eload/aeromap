import * as firs from "../data/firs";

const FR_COORD = {
    center: {lat: 46.403, lng: 2.784},
    boundaries: {
        min: {lat: 40.61, lng: -4.2365406},
        max: {lat:50.923644 , lng: 12.007655}
    }
};
const FIRS = {
    "LFFF": {
        color: "#e50a0a",
        is_metropolitan: true
    },
    "LFMM": {
        color: "#004b89",
        is_metropolitan: true
    },
    "LFBB": {
        color: "#ffe000",
        is_metropolitan: true
    },
    "LFEE": {
        color: "#2aba25",
        is_metropolitan: true
    },
    "LFRR": {
        color: "#ff7f00",
        is_metropolitan: true
    },
    "OutreMer": {
        color: "#9b6bcc",
        is_metropolitan: false
    }
};
//const SECONDARY = ["LFFF_F_CTR", "LFFF_N_CTR", "LFFF_S_CTR", "LFBB_E_CTR", "LFBB_W_CTR", "LFRR_N_CTR", "LFRR_S_CTR", "LFEE_E_CTR", "LFFF_W_CTR"];
import colorssheet from './map/style';

import DrawingTools from './map/drawing_tools';
import AirspaceCollection from './airspace/airspacecollection';
import AirportCollection from './airport/airportcollection';
import * as airports from "../data/airports";

class AeroMap{
    constructor($elem=null, opts={}){
        this.gmap = null;
        this.drawing_manager = null;
        this.element = $elem || document.getElementById("map");
        this.options = {
            map: {
                center: FR_COORD.center, //Default center on France
                zoom: 6,
                styles: colorssheet
            },
            boundaries: FR_COORD.boundaries,
            editor_mode: false,
            ...opts
        };
        this.editor_mode = this.options.editor_mode;
        this.create();
    }

    create () {
        this.gmap = new google.maps.Map(this.element, this.options.map);
        this.setBoundaries();
        this.drawing_manager = new DrawingTools();
        this.drawing_manager.init(this.gmap, this.editor_mode);
        this.airspace_collections = new Map();
        this.airport_collections = new Map();
        this.position_collections = new Map();
    }

    setBoundaries(){
        //**** BOUND MAP *****//
        // bounds of the desired area
        let allowedBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(this.options.boundaries.min.lat,this.options.boundaries.min.lng),
            new google.maps.LatLng(this.options.boundaries.max.lat,this.options.boundaries.max.lng),
        );
        let lastValidCenter = this.gmap.getCenter();

        let boundLimits = {
            maxLat : allowedBounds.getNorthEast().lat(),
            maxLng : allowedBounds.getNorthEast().lng(),
            minLat : allowedBounds.getSouthWest().lat(),
            minLng : allowedBounds.getSouthWest().lng()
        };

        let newLat, newLng;
        google.maps.event.addListener(this.gmap, 'center_changed', () => {
            let center = this.gmap.getCenter();
            if (allowedBounds.contains(center)) {
                // still within valid bounds, so save the last valid position
                lastValidCenter = this.gmap.getCenter();
                return;
            }
            newLat = lastValidCenter.lat();
            newLng = lastValidCenter.lng();

            if(center.lng() > boundLimits.minLng && center.lng() < boundLimits.maxLng){
                newLng = center.lng();
            }
            if(center.lat() > boundLimits.minLat && center.lat() < boundLimits.maxLat){
                newLat = center.lat();
            }
            this.gmap.panTo(new google.maps.LatLng(newLat, newLng));
        });
    }
    initAirspaces(){
        if(!this.data) throw new Error ("No data available!");
        for (let fir in FIRS) {
            let airspacecollection = new AirspaceCollection(
                fir,
                new Map(),
                FIRS[fir].color,
                FIRS[fir].is_metropolitan,
                this.drawing_manager,
                false
            );
            this.data.airspaces.forEach((airspace) => {
                if(airspace.callsign.search(fir) > -1){
                    airspacecollection.createAirspace({
                        name: airspace.name,
                        callsign: airspace.callsign,
                        is_secondary: !airspace.primary,
                        fir,
                        color: airspacecollection.color,
                        coordinates: airspace.coordinates,
                        drawingManager: this.drawing_manager,
                        parent : airspacecollection
                    });
                }
            });
            this.airspace_collections.set(fir, airspacecollection);
        }
    }
    initAirports(){
        for (let fir in FIRS) {
            let airport_collection = new AirportCollection(new Map(), fir);
            this.data.airports.forEach( (airport) => {
                if(airport.fir_icao !== null && airport.fir_icao.search(fir) > -1) {
                    airport_collection.createAirport({
                        name: airport.name,
                        icao: airport.icao,
                        fir: airport.fir_icao,
                        lat: airport.latitude,
                        lng: airport.longitude,
                        drawingManager: this.drawing_manager,
                        parent: airport_collection,
                        icon_url: 'http://pichoster.net/images/2018/02/28/a85819dc0002f3fe5100d0c4d39ef268.png'
                    });
                }
            });
            this.airport_collections.set(fir, airport_collection);
        }
    }
    initPositions(){
        this.airport_collections.forEach(collection => {
            collection.airports.forEach(airport => {
                this.data.positions.forEach( p => {
                    let terrain = p.callsign.split('_');
                    terrain = terrain [0];
                    if(terrain === airport.icao){
                        airport.createPosition({
                            id: p.id,
                            name: p.name,
                            callsign: p.callsign,
                            position_type: p.position_type,
                            frequency: p.frequency,
                            primary: p.primary,
                            afis: p.afis,
                            exam_possible: p.exam_possible
                        });
                    }
                });
            });
        });


    }
    setSecondary (callsign) {
        return SECONDARY.indexOf(callsign) > -1
    }
    drawAirspaces(){
        if(this.airspace_collections.size === 0){
            console.warn("No airspaces loaded, data loading tentative...");
            this.initAirspaces();
            if(this.airspace_collections.size === 0) throw new Error ("No airspaces data, set some airspaces first!");
        }
        for(let collection of this.airspace_collections.values()){
            collection.drawAirspaces();
        }
        console.log(this.airspace_collections);
    }
    drawAirports(){
        if(this.airport_collections.size === 0){
            console.warn("No airspaces loaded, data loading tentative...");
            this.initAirports();
            if(this.airport_collections.size === 0) throw new Error ("No airspaces data, set some airspaces first!");
        }
        for(let collection of this.airport_collections.values()){
            collection.drawAirports();
        }
        //http://pichoster.net/images/2018/02/28/a85819dc0002f3fe5100d0c4d39ef268.png

    }

    initEvents () {
        google.maps.event.addListener(this.drawing_manager.gmap, "zoom_changed", () => {
            if (this.drawing_manager.gmap.getZoom() > 8){
                //Hide airspace / show airports
                this.airspace_collections.forEach(value => value.hide());
                this.airport_collections.forEach(value => value.show());
                if(this.drawing_manager.infoWindow.type === "polygon") this.drawing_manager.hidePopin();
            }else{
                this.airspace_collections.forEach(value => value.show());
                this.airport_collections.forEach(value => value.hide());
                if(this.drawing_manager.infoWindow.type === "marker") this.drawing_manager.hidePopin();
            }
        });
    }


    setData (data){
        this.data = data;
    }

    set data (value){ this._data = value;}
    get data (){ return this._data;}

}

module.exports = AeroMap;