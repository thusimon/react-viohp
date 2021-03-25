import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux'
import {Score, SymbolType, ScaleHead} from '../types';
import {CLEF_G_SYM, SHARP_SYM, FLAT_SYM} from '../symbols/symbol-unicode';
import {STAFF_SCALES_HEAD} from '../constants';
import SymbolSVG from '../symbols/symbol-svg';
import * as d3 from 'd3';

const {
  NOTE_WHOLE
  , NOTE_HALF, NOTE_HALF_REVERSE
  , NOTE_QUARTER, NOTE_QUARTER_REVERSE
  , NOTE_EIGHTH, NOTE_EIGHTH_REVERSE
  , FLAT, SHARP, NATURAL
  , WHOLEREST, HALFREST, QUARTERREST, EIGTHREST
  , BAR
} = SymbolType;
/** 
 * one music staff contains 3+4+3 gapps, and one gap is 20px now  
 * so one staff takes 200px 
 * - - - - -
 * - - - - -
 * - - - - -
 * ---------
 * ---------
 * ---------
 * ---------
 * ---------
 * - - - - -
 * - - - - -
 * - - - - -
 */

/**
 * draw staff lines, clef
 * @param score 
 * @param width 
 */
const drawStaffLinesAndClef = (score: Score, width: number) => {
  d3.select('.staff-container-svg').selectAll('.d3-staff')
    .data(new Array(score.notes.length))
    .join('g')
    .attr('class', 'd3-staff')
    .attr('id', (_, idx) => {
      return `staff-${idx}`
    })
    .attr('transform', (_, idx) => {
      return `translate(0,${200 * idx})`;
    });

    const line = d3.line().context(null)
    const staffs = d3.selectAll('.d3-staff');
    staffs.selectAll('.staff-line')
    .data([1,1,1,1,1])
    .join('path')
    .attr('class', 'staff-line')
    .attr('d', (_, idx) => {
      return line([[0, idx*20+60], [width, idx*20+60]]);
    })
    .style('stroke', 'black')
    .style('stroke-width', 1);

    staffs.selectAll('.staff-side-line')
    .data([0,1])
    .join('path')
    .attr('class', 'staff-side-line')
    .attr('d', d => {
      return line([[d*(width-1), 60], [d*(width-1), 140]]);
    })
    .style('stroke', 'black')
    .style('stroke-width', 1);

    staffs.selectAll('.staff-clef')
    .data([0])
    .join('text')
    .text(CLEF_G_SYM)
    .attr('transform', 'translate(2, 125)')
    .style('font-size', '96px');
}

/**
 * draw staff scale
 * @param score 
 */
const drawStaffScale = (score: Score) => {
  const {signature, scale} = score;
  const scalesHead: ScaleHead[] = STAFF_SCALES_HEAD[signature][scale];
  d3.selectAll('.d3-staff').selectAll('.d3-staff-scale-head')
  .data(scalesHead)
  .join('text')
  .text(d => d.type == SymbolType.FLAT ? FLAT_SYM : SHARP_SYM)
  .attr('transform', (d, idx) => {
    return `translate(${55+idx*12}, ${d.pos*10+66})`
  })
  .style('font-size', '36px');
}

const drawNotes = (score: Score) => {
  const {notes, signature, scale} = score;
  const scalesHeadLength = STAFF_SCALES_HEAD[signature][scale].length;
  const notesOffXSet = 80 + scalesHeadLength * 12
  const staff =  d3.selectAll('.d3-staff');
  const syms = [
    new SymbolSVG(NOTE_WHOLE)
    , new SymbolSVG(NOTE_HALF), new SymbolSVG(NOTE_HALF_REVERSE)
    , new SymbolSVG(NOTE_QUARTER), new SymbolSVG(NOTE_QUARTER_REVERSE)
    , new SymbolSVG(NOTE_EIGHTH), new SymbolSVG(NOTE_EIGHTH_REVERSE)
    , new SymbolSVG(NOTE_WHOLE, {augment: true, scale: FLAT})
    , new SymbolSVG(NOTE_HALF, {augment: true, scale: SHARP}), new SymbolSVG(NOTE_HALF_REVERSE, {augment: true, scale: NATURAL})
    , new SymbolSVG(NOTE_QUARTER, {augment: true, scale: FLAT}), new SymbolSVG(NOTE_QUARTER_REVERSE, {augment: true, scale: NATURAL})
    , new SymbolSVG(NOTE_EIGHTH, {augment: true, scale: SHARP}), new SymbolSVG(NOTE_EIGHTH_REVERSE, {augment: true, scale: FLAT})
    , new SymbolSVG(WHOLEREST), new SymbolSVG(HALFREST), new SymbolSVG(QUARTERREST), new SymbolSVG(EIGTHREST)
    , new SymbolSVG(BAR)
  ];
  staff.selectAll('.d3-staff-note')
  .data(syms)
  .join('g')
  .attr('class', 'd3-staff-note')
  .attr('transform', (d, idx) => {
    const noteCenter = d.getCenter();
    return `translate(${notesOffXSet-noteCenter[0] + idx*50},${100-noteCenter[1]})`
  })
  .html(d => d.getHTML());
}
export const StaffUnconnected = (score: Score) => {
  const divRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    divRef.current.style.height = `${score.notes.length * 200}px`;
    const staffWidth = divRef.current.offsetWidth;
    drawStaffLinesAndClef(score, staffWidth)
    drawStaffScale(score)
    drawNotes(score);
  }, [score]);

  return <div className='d3-staff-container' ref={divRef} style={{width:'99.8%'}}>
    <svg className='staff-container-svg' style={{width:'100%', height:'100%'}}></svg>
  </div>
}

const mapStateToProps = state => {
  return {
    signature: state.music.musicInfo.signature,
    scale: state.music.musicInfo.scale,
    notes: state.music.notes
  }
}

export const Staff = connect(mapStateToProps, null)(StaffUnconnected);
