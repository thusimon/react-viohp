import * as d3 from 'd3';
import { path } from 'd3';
import {ellipse, noteStem, noteStemRev, stem, hook} from '../svgs/base-paths';
import {SymbolType} from '../types';

const {NOTE_WHOLE, NOTE_HALF, NOTE_HALF_REVERSE, NOTE_QUARTER, NOTE_QUARTER_REVERSE
  , NOTE_EIGHTH, NOTE_EIGHTH_REVERSE} = SymbolType;

class SymbolSVG {
  type: SymbolType;
  constructor(type: SymbolType) {
    this.type = type;
  }
  getPath(): string {
    let paths = [];
    switch(this.type) {
      case NOTE_WHOLE: {
        const path = d3.create('path');
        path.attr('d', ellipse);
        path.style('fill', 'none');
        path.style('stroke','black');
        path.style('stroke-width', 2);
        paths = [path];
        break;
      }
      case NOTE_HALF: {
        const path = d3.create('path');
        path.attr('d', noteStem);
        path.style('fill', 'none');
        path.style('stroke','black');
        path.style('stroke-width', 2);
        paths = [path];
        break;
      }
      case NOTE_HALF_REVERSE: {
        const path = d3.create('path');
        path.attr('d', noteStemRev);
        path.style('fill', 'none');
        path.style('stroke','black');
        path.style('stroke-width', 2);
        paths = [path];
        break;
      }
      case NOTE_QUARTER: {
        const path = d3.create('path');
        path.attr('d', noteStem);
        path.style('fill', 'black');
        path.style('stroke','black');
        path.style('stroke-width', 2);
        paths = [path];
        break;
      }
      case NOTE_QUARTER_REVERSE: {
        const path = d3.create('path');
        path.attr('d', noteStemRev);
        path.style('fill', 'black');
        path.style('stroke','black');
        path.style('stroke-width', 2);
        paths = [path];
        break;
      }
      case NOTE_EIGHTH: {
        const path1 = d3.create('path');
        path1.attr('d', noteStem);
        path1.style('fill', 'black');
        path1.style('stroke','black');
        path1.style('stroke-width', 2);
        const path2 = d3.create('path');
        path2.attr('d', hook);
        path2.style('fill', 'black');
        path2.attr('transform', 'scale(1,-1) translate(8.2, 15.8)');
        path2.style('stroke','black');
        path2.style('stroke-width', 1);
        paths = [path1, path2];
        break;
      }
      case NOTE_EIGHTH_REVERSE: {
        const path1 = d3.create('path');
        path1.attr('d', noteStemRev);
        path1.style('fill', 'black');
        path1.style('stroke','black');
        path1.style('stroke-width', 2);
        const path2 = d3.create('path');
        path2.attr('d', hook);
        path2.style('fill', 'black');
        path2.attr('transform', 'translate(-7.8, 15)');
        path2.style('stroke','black');
        path2.style('stroke-width', 1);
        paths = [path1, path2];
        break;
      }
      default:
        break;
    }
    return paths.reduce((acc, path) => acc + path.node().outerHTML, '');
  }
  getCenter():[number, number] {
    switch(this.type) {
      case NOTE_WHOLE:
      case NOTE_HALF:
      case NOTE_HALF_REVERSE:
      case NOTE_QUARTER:
      case NOTE_QUARTER_REVERSE:
      case NOTE_EIGHTH:
      case NOTE_EIGHTH_REVERSE:
        return [8, 0];
      default:
        break;  
    }
    return [0, 0];
  }
}

export default SymbolSVG;
