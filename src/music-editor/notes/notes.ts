import * as d3 from 'd3';
import {ellipse, stem, hook} from '../svgs/base-paths';
import {SymbolType} from '../types';

export class Note {
  type: SymbolType;
  constructor(type: SymbolType) {
    this.type = type;
  }
  getPath(): string {
    const path = d3.create('path');
    switch(this.type) {
      case SymbolType.NOTE_WHOLE:
        path.attr('d', ellipse);
        path.style('fill', 'none');
        path.style('stroke','black');
        path.style('stroke-width', 2);
        break;
      default:
        break;
    }
    return path.node().outerHTML;
  }
  getCenter():[number, number] {
    switch(this.type) {
      case SymbolType.NOTE_WHOLE:
        return [8, 10];
      default:
        break;  
    }
    return [0, 0];
  }
}
