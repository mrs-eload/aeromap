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

const FR_COORD = {
    center: {lat: 46.403, lng: 2.784},
    boundaries: {
        min: {lat: 40.61, lng: -4.2365406},
        max: {lat:50.923644 , lng: 12.007655}
    }
};
const SECONDARY = ["LFFF_F_CTR", "LFFF_N_CTR", "LFFF_S_CTR", "LFBB_E_CTR", "LFBB_W_CTR", "LFRR_N_CTR", "LFRR_S_CTR", "LFEE_E_CTR", "LFFF_W_CTR"];
import colorssheet from './map/style';
import * as firs from './firs';
import DrawingTools from './map/drawing_tools';
import AirspaceCollection from './airspace/airspacecollection';

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
        this.initAirspaces();
        this.drawAirspaces();
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
        for (let fir in FIRS) {
            let airspacecollection = new AirspaceCollection(
                fir,
                new Map(),
                FIRS[fir].color,
                FIRS[fir].is_metropolitan,
                this.drawing_manager,
                false
            );
            for (let f in firs) {
                if (f.search("SOOO") > -1 || f.search("TTZP") > -1) {

                } else if (f.search(fir) > -1) {
                    airspacecollection.createAirspace({
                        name: "",
                        callsign: f,
                        is_secondary: this.setSecondary(f),
                        fir,
                        color: airspacecollection.color,
                        coordinates: firs[f],
                        drawingManager: this.drawing_manager,
                        parent : airspacecollection
                });
                }
            }
            this.airspace_collections.set(fir, airspacecollection);
        }
    }
    setSecondary (callsign) {
        return SECONDARY.indexOf(callsign) > -1
    }
    drawAirspaces(){
        for(let collection of this.airspace_collections.values()){
            collection.drawAirspaces();
        }
        console.log(this.airspace_collections);
    }
}

module.exports = AeroMap;