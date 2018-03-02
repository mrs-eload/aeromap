import Airport from './airport';

class AirportCollection{
    constructor(airports=new Map(), fir=""){
        this.airports = airports;
        this.fir = fir;
    }

    add (airport) {
        this.airports.set(airport.icao, airport);
    }
    createAirport (opts){
        this.add(new Airport(...opts));
    }

    show (){
        this.airports.forEach(airport => airport.show());
    }
    hide (){
        this.airports.forEach(airport => airport.hide());
    }
    drawAirports (){
        for(let airport of this.airports.values()){
            airport.drawAirport();
        }
    }
    find(icao){
        for(let airport of this.airports){
            if(airport.icao === icao){
                return airport;
            }
        }
    }

    set airports(value){this._airports = value;}
    get airports(){return this._airports;}
    set fir (value){this._fir = value;}
    get fir (){return this._fir;}
}

module.exports = AirportCollection;