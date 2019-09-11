import delay from './delay';

import * as AudioFilters from '../data/audioFilters/filters';

class AudioApi {
    static getAllFilters(){
        return new Promise((resolve, reject)=>{
            setTimeout(function(){
                let audioFilters = Object.assign({}, AudioFilters);
                resolve(audioFilters);
            }, delay);
        });
    }
}

export default AudioApi;