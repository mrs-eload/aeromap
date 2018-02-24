const polygonOptions = {
    clickable: true,
    draggable: true,
    editable: true,
    zIndex: 1
};

class DrawingTools {
    constructor() {
        this.gmap = null;
        this.gDrawingManager = null;
    }
    init (map, enable_tools) {
        this.gmap = map;
        this.gDrawingManager = new google.maps.drawing.DrawingManager({
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['polygon']
            },
            polygonOptions: polygonOptions
        });

        if(enable_tools === true) this.gDrawingManager.setMap(this.gmap);

        this.initEvents();
    }
    disable(){
        this.gDrawingManager.setMap(null);
    }
    enable(){
        this.gDrawingManager.setMap(this.gmap);
    }
    drawPolygon(polygon, is_visible){
        if(!this.gmap) return console.error("DrawingTools is not ready!");
        let drawn = new google.maps.Polygon(polygon);
        if(is_visible) drawn.setMap(this.gmap);
        return drawn;
    }
    initEvents(){
        google.maps.event.addListener(this.gDrawingManager, 'overlaycomplete', (event) => {
            if (event.type === 'polygon') {
            }
        });
        //google.maps.event.addListener(myPolygon, "dragend", getPolygonCoords);
        // google.maps.event.addListener(myPolygon.getPath(), "insert_at", this.getPolygonCoords);
        //google.maps.event.addListener(myPolygon.getPath(), "remove_at", getPolygonCoords);
        // google.maps.event.addListener(myPolygon.getPath(), "set_at", this.getPolygonCoords);
    }
    getPolygonCoords() {
        var len = myPolygon.getPath().getLength();
        var htmlStr = "";
        htmlStr += "new google.maps.LatLng(" + myPolygon.getPath().getAt(i).toUrlValue(5) + "), ";
        for (var i = 0; i < len; i++) {
            //Use this one instead if you want to get rid of the wrap > new google.maps.LatLng(),
            //htmlStr += "" + myPolygon.getPath().getAt(i).toUrlValue(5);
        }
    }
}
module.exports = DrawingTools;