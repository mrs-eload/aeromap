//Entry point
import * as firs from '../data/firs';
import * as airports from '../data/airports';
import * as positions from '../data/positions';
import AeroMap from './aeromap';
let $elem = document.getElementById('map');
let aeromap = null;

window.parseData = () => {
    let data = {airspaces: [], positions: [], airports: []};
    for(let index in positions){
        let position = positions[index];
       if(position.position_type === 'ctr'){
           for(let fir in firs){
               if(position.callsign === fir){
                    position.coordinates = firs[fir];
               }
           }
           data.airspaces.push(position);
       }
       data.positions.push(position);
    }
    data.airports = airports;
    return data;
};

window.initMap = ($elem) => {
    aeromap = new AeroMap($elem);
    aeromap.setData(parseData());
    aeromap.drawAirspaces();
};