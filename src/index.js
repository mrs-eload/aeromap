//Entry point
import * as firs from '../data/firs';
import * as airports from '../data/airports';
import * as positions from '../data/positions';
import AeroMap from './aeromap';
let $elem = document.getElementById('map');
let aeromap = null;

window.parseData = () => {
    let data = {airspaces: [], positions: [], airports: []};
    for(let index in airports){
        if( index !== "default") {
            data.airports.push(airports[index]);
            for(let p in positions){
                if( p !== "default"){
                    let position = positions[p];
                    let terrain = position.callsign.split('_');
                    terrain = terrain [0];
                    if(terrain === airports[index].fir){
                        data.positions.push(position);
                    }else if(position.position_type === 'ctr'){
                        for(let fir in firs){
                            if(position.callsign === fir){
                                position.coordinates = firs[fir];
                            }
                        }
                        data.airspaces.push(position);
                    }
                }
            }
        }
    }
    return data;
};

window.initMap = ($elem) => {
    aeromap = new AeroMap($elem);
    aeromap.setData(parseData());
    aeromap.drawAirspaces();
    aeromap.drawAirports();

    aeromap.initEvents();
};