import * as d3 from 'd3';
import { Selection } from 'd3';
import {SYM_MAP} from '../constants'
import {ellipse, noteStem, noteStemRev, stem, hook, bar, staffSegment, arrow} from '../svgs/base-paths';
import {SymbolType, Descriptor} from '../types';
import {isSymbolNote} from './utils';

import './symbol-svg.scss';

const {
  NOTE_WHOLE
  , NOTE_HALF, NOTE_HALF_REVERSE
  , NOTE_QUARTER, NOTE_QUARTER_REVERSE
  , NOTE_EIGHTH, NOTE_EIGHTH_REVERSE
  , FLAT, SHARP, NATURAL
  , WHOLEREST, HALFREST, QUARTERREST, EIGTHREST
  , BAR, ARROW
} = SymbolType;

class SymbolSVG {
  type: SymbolType;
  desc?: Descriptor;
  nodes: Selection<SVGPathElement|SVGTextElement|SVGCircleElement, undefined, null, undefined>[];
  x?: number;
  sfIdx?: number;
  selected: boolean;
  name?: string;
  freq?: number;
  constructor(type: SymbolType, desc?: Descriptor, sfIdx?: number, name?: string, freq?: number) {
    this.type = type;
    this.desc = desc || {};
    this.nodes = [];
    this.sfIdx = sfIdx;
    this.selected = false;
    this.name = name;
    this.freq = freq;
  }
  getSymbolNodes(): void {
    switch(this.type) {
      case NOTE_WHOLE: {
        const path = d3.create('path');
        path.attr('d', ellipse);
        const classNames = `${this.selected ? 'selected-empty-sym' : 'normal-empty-sym'} double-stroke-sym`;
        path.attr('class', classNames);
        this.nodes.push(path);
        break;
      }
      case NOTE_HALF: {
        const path = d3.create('path');
        path.attr('d', noteStem);
        const classNames = `${this.selected ? 'selected-empty-sym' : 'normal-empty-sym'} double-stroke-sym`;
        path.attr('class', classNames);
        this.nodes.push(path);
        break;
      }
      case NOTE_HALF_REVERSE: {
        const path = d3.create('path');
        path.attr('d', noteStemRev);
        const classNames = `${this.selected ? 'selected-empty-sym' : 'normal-empty-sym'} double-stroke-sym`;
        path.attr('class', classNames);
        this.nodes.push(path);
        break;
      }
      case NOTE_QUARTER: {
        const path = d3.create('path');
        path.attr('d', noteStem);
        const classNames = `${this.selected ? 'selected-filled-sym' : 'normal-filled-sym'} double-stroke-sym`;
        path.attr('class', classNames);
        this.nodes.push(path);
        break;
      }
      case NOTE_QUARTER_REVERSE: {
        const path = d3.create('path');
        path.attr('d', noteStemRev);
        const classNames = `${this.selected ? 'selected-filled-sym' : 'normal-filled-sym'} double-stroke-sym`;
        path.attr('class', classNames);
        this.nodes.push(path);
        break;
      }
      case NOTE_EIGHTH: {
        const path1 = d3.create('path');
        path1.attr('d', noteStem);
        const classNames1 = `${this.selected ? 'selected-filled-sym' : 'normal-filled-sym'} double-stroke-sym`;
        path1.attr('class', classNames1);
        const path2 = d3.create('path');
        path2.attr('d', hook);
        const classNames2 = `${this.selected ? 'selected-filled-sym' : 'normal-filled-sym'} single-stroke-sym`;
        path2.attr('class', classNames2);
        path2.attr('transform', 'scale(1,-1) translate(8.2, 15.8)');
        this.nodes.push(path1, path2);
        break;
      }
      case NOTE_EIGHTH_REVERSE: {
        const path1 = d3.create('path');
        path1.attr('d', noteStemRev);
        const classNames1 = `${this.selected ? 'selected-filled-sym' : 'normal-filled-sym'} double-stroke-sym`;
        path1.attr('class', classNames1);
        const path2 = d3.create('path');
        path2.attr('d', hook);
        const classNames2 = `${this.selected ? 'selected-filled-sym' : 'normal-filled-sym'} single-stroke-sym`;
        path2.attr('class', classNames2);
        path2.attr('transform', 'translate(-7.8, 15)');
        this.nodes.push(path1, path2);
        break;
      }
      case WHOLEREST: {
        const rest = d3.create('text');
        rest.text(SYM_MAP[this.type]);
        rest.style('font-size', '40px');
        rest.attr('transform', 'translate(0, 6)');
        this.nodes.push(rest);
        break;
      }
      case HALFREST: {
        const rest = d3.create('text');
        rest.text(SYM_MAP[this.type]);
        rest.style('font-size', '40px');
        rest.attr('transform', 'translate(0, 18)');
        this.nodes.push(rest);
        break;
      }
      case QUARTERREST: {
        const rest = d3.create('text');
        rest.text(SYM_MAP[this.type]);
        rest.style('font-size', '40px');
        rest.attr('transform', 'translate(0, 14)');
        this.nodes.push(rest);
        break;
      }
      case EIGTHREST: {
        const rest = d3.create('text');
        rest.text(SYM_MAP[this.type]);
        rest.style('font-size', '40px');
        rest.attr('transform', 'translate(0,20)');
        this.nodes.push(rest);
        break;
      }
      case BAR: {
        const path = d3.create('path');
        path.attr('d', bar);
        path.attr('class', 'normal-filled-sym single-stroke-sym');
        this.nodes.push(path);
        break;
      }
      case ARROW: {
        const path = d3.create('path');
        path.attr('d', arrow);
        path.style('fill', 'red');
        this.nodes.push(path);
      }
      default:
        break;
    }
  }
  getAugumentDescriptor(): void {
    if (this.desc.augment) {
      // add dot
      const dot = d3.create('circle');
      dot.attr('r', 3)
      dot.attr('cx', 17);
      dot.attr('cy', -6);
      const classNames = this.selected ? 'selected-filled-no-stroke-sym' : 'normal-filled-no-stroke-sym';
      dot.attr('class', classNames);
      this.nodes.push(dot);
    }
  } 
  getScaleDescriptor(): void {
    if (this.desc.scale) {
      const scale = d3.create('text');
      scale.text(SYM_MAP[this.desc.scale]);
      scale.attr('x', -22);
      scale.attr('y', 6);
      const classNames = this.selected ? 'selected-filled-no-stroke-sym' : 'normal-filled-no-stroke-sym';
      scale.attr('class', classNames);
      scale.style('font-size', '22px');
      this.nodes.push(scale);
    }
  }
  getStaffSegment(): void {
    if (isSymbolNote(this.type) && Number.isInteger(this.sfIdx)) {
      let staffSegDirection;
      let staffSegCount;
      if (this.sfIdx < -1) {
        // should add staff line below the note center
        staffSegDirection = 1;
        staffSegCount = Math.floor((-this.sfIdx) / 2);
      } else if (this.sfIdx > 9) {
        // should add staff line above the note center
        staffSegDirection = -1;
        staffSegCount = Math.floor((this.sfIdx - 8) / 2);
      } else {
        staffSegDirection = 0;
      }

      if (staffSegDirection != 0) {
        for (let i = 0; i < staffSegCount; i++) {
          const staffSegNode = d3.create('path');
          staffSegNode.attr('d', staffSegment);
          staffSegNode.attr('class', 'normal-filled-sym single-stroke-sym');
          staffSegNode.attr('transform', `translate(0, ${staffSegDirection*i*20})`);
          this.nodes.push(staffSegNode);
        }
      }
    }
  }
  getHTML(): string {
    this.getSymbolNodes();
    this.getStaffSegment();
    this.getAugumentDescriptor();
    this.getScaleDescriptor();
    return this.nodes.reduce((acc, node) => acc + node.node().outerHTML, '');
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
      case WHOLEREST:
      case HALFREST:
        return [10.5, 0];
      case QUARTERREST:
      case EIGTHREST:
        return [7, 0];
      default:
        break;  
    }
    return [0, 0];
  }
}

export default SymbolSVG;
