//Entry point
import AeroMap from './aeromap';
var $elem = document.getElementById('map');
var mapeditor = null;
window.initMap = ($elem) => {
    mapeditor = new AeroMap();
};