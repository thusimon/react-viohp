import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as musicActions from '../../actions/musicActions';
import {ScoreType, StaffType, PlayType, SymbolType, ScaleHead, ScoreSymbol, IteratorResponse, StaffOwnProps,
  AudioFreqData,
  NoteType} from '../types';
import {CLEF_G_SYM, SHARP_SYM, FLAT_SYM} from '../symbols/symbol-unicode';
import {isSymbolNote, isSymbolNoteUp, isSymbolNoteReverse} from '../symbols/utils';
import {getSymsInterval, getStaffNotesStartOffset, waitTime, getFreqLineXInc, getFreqLineYVal, generateStaffFreqLineD} from './utils';
import {STAFF_SCALES_HEAD} from '../staffData/staff-data';
import {getSetOfNoteFromSignatureScale} from '../staffData/staff-data-utils';
import {AUDIO_ANALYSE_INTERVAL} from '../../components/audio/constants';
import SymbolSVG from '../symbols/symbol-svg';
import SymbolIterator from '../symbols/symbol-iter';
import * as playerActions from '../../actions/playerActions';
import * as d3 from 'd3';

const {ARROW} = SymbolType;
/** 
 * one music staff contains 3+4+3 gapps, and one gap is 20px now  
 * so one staff takes 200px 
 * - - - - -  -6  0px
 * - - - - -  -4  20px
 * - - - - -  -2  40px
 * ---------  0   60px
 * ---------  2   80px
 * ---------  4   100px
 * ---------  6   120px
 * ---------  8   140px
 * - - - - - 10   160px
 * - - - - - 12   180px
 * - - - - - 14   200px
 */

/**
 * draw staff lines, clef
 * @param score 
 * @param width 
 */
const audioData: AudioFreqData[][] = [[]];

const drawStaffLinesAndClef = (score: ScoreType, width: number) => {
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
const drawStaffScale = (score: ScoreType) => {
  const {signature, scale} = score.scoreInfo;
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

const mapScoreNotesToSvg = (score: ScoreType, staffWidth: number): SymbolSVG[][] => {
  const notesXOffset = getStaffNotesStartOffset(score);
  const notes = score.notes;
  return notes.map(notesLine => {
    let barCount = 0;
    const xInterval = getSymsInterval(notesLine, notesXOffset, 30, staffWidth);
    return notesLine.map((note, idx) => {
      const symbolSVG = new SymbolSVG(note.type
        , {augment: note.desc.augment, scale: note.desc.scale}
        , note.sfIdx
        , note.name
        , note.freq);
      if (symbolSVG.type === SymbolType.BAR) {
        barCount++;
        symbolSVG.x = notesXOffset + xInterval * (idx - barCount + 0.5);
      } else {
        symbolSVG.x = notesXOffset + xInterval * (idx - barCount);
      }
      return symbolSVG;
    })
  });
}

const drawNotes = (notes: SymbolSVG[][], staff: StaffType, dispatch) => {
  const staffs =  d3.selectAll('.d3-staff');
  staffs.each(function(staffs, idx) {
    const notesLine = notes[idx];
    d3.select(this)
    .selectAll('.d3-staff-note')
    .data(notesLine)
    .join('g')
    .attr('class', 'd3-staff-note')
    .attr('transform', (d, idx) => {
      const noteCenter = d.getCenter();
      if (isSymbolNote(d.type)) {
        // it is a note, should put it in the correct y position according to the sfIdx
        return `translate(${d.x - noteCenter[0]}, ${60-noteCenter[1]+notesLine[idx].sfIdx*10})`;
      } else {
        // it is not a note, they are always at a fixed y position
        return `translate(${d.x - noteCenter[0]}, 100)`;
      }
    })
    .html(d => d.getHTML())
    .on('click', function(evt, ele) {
      const d3Select = d3.select(this);
      const selected = !d3Select.classed('selected-sym');
      d3Select.classed('selected-sym', selected);
      ele.selected = selected;
      d3Select.html(ele.getHTML());
      const markNote = {mark: selected, name: ele.name, sfIdx: ele.sfIdx};
      dispatch(musicActions.clickNote(markNote));
    })
    .on('mouseover', function(evt, ele) {
      d3.select(this)
      .style('cursor', 'pointer');
    })
    .on('mouseout', function(evt, ele) {
      d3.select(this)
      .style('cursor', 'default');
    });

    let noteNames: SymbolSVG[] = [];
    if (staff.config.showNoteName) {
      noteNames = notesLine;
    }
    d3.select(this)
    .selectAll('.d3-staff-note-name')
    .data(noteNames)
    .join('text')
    .attr('class', 'd3-staff-note-name')
    .attr('transform', (d, idx) => {
      const noteCenter = d.getCenter();
      if (isSymbolNoteUp(d.type)) {
        return `translate(${d.x - noteCenter[0] - 10}, ${60-noteCenter[1]+notesLine[idx].sfIdx*10 + 30})`;
      } else if (isSymbolNoteReverse(d.type)){
        return `translate(${d.x - noteCenter[0] - 10}, ${60-noteCenter[1]+notesLine[idx].sfIdx*10 - 30})`;
      } else {
        return '';
      }
    })
    .text(d => d.name ? d.name.toUpperCase() : '');
  });
}

const drawStaffIndicator = async (noteIterator: Generator<IteratorResponse, boolean>, playing: number, dispatch, sectionRef: React.RefObject<HTMLDivElement>) => {
  if (!noteIterator || !sectionRef.current) {
    return;
  }
  const arrowSelect = d3.select('.staff-container-svg').selectAll('.staff-indicator')
  let note = noteIterator.next().value;
  if (!note) {
    // clear the indicator
    arrowSelect.data([])
    .join('g')
    .attr('class', 'staff-indicator')
    .attr('transform', 'translate(0,0)')
    .html('');
    return;
  }
  let noteVal = note as IteratorResponse;
  const arrowSymbol = new SymbolSVG(ARROW);
  
  arrowSelect.data([noteVal])
  .join('g')
  .attr('class', 'staff-indicator')
  .attr('transform', d => {
    if (d) {
      return `translate(${d.symbol.x},${60+d.row*200})`;
    } else {
      return `translate(0,0)`;
    }
  })
  .html(arrowSymbol.getHTML());

  if (playing === -1) {
    return;
  }

  do {
    noteVal = note as IteratorResponse;
    arrowSelect.data([noteVal])
    .join('g')
    .attr('class', 'staff-indicator')
    .attr('transform', d => {
      if (d) {
        const symbolCenter = d.symbol.getCenter();
        const xPos = isSymbolNote(d.symbol.type) ? d.symbol.x - symbolCenter[0] : d.symbol.x;
        return `translate(${xPos},${60+d.row*200})`;
      } else {
        return `translate(0,0)`;
      }
    })
    .html(arrowSymbol.getHTML());
    const timeout = noteVal.symbol.timeout;
    if (noteVal.symbol.freq) {
      dispatch(playerActions.playNote('piano', noteVal.symbol.freq, timeout*3));
    }
    if (noteVal.row && noteVal.row % 3 == 0) {
      //it is time to scroll
      sectionRef.current.scroll(0, noteVal.row * 200);
    }
    await waitTime(timeout*1000);
    note = noteIterator.next().value;
  } while (note);
}

const drawFreqGraph = (symbolIter: SymbolIterator, playing: number, freq: number, notes: SymbolSVG[][], notesFullScale: NoteType[]) => {
  if (notesFullScale.length < 1) {
    return;
  }
  const currentNote = symbolIter.getCurrentSymbol()
  const nextNote = symbolIter.getNextSymbol()
  // TODO get the center line's note frequency
  if (!currentNote || !nextNote || playing != 1) {
    return;
  }
  const firstNoteInRow = symbolIter.getSymbolByIdx(currentNote.row, 0);
  const xInc = getFreqLineXInc(currentNote.symbol, nextNote.symbol, 0.1);
  const y = getFreqLineYVal(notesFullScale, freq)
  const staffs =  d3.selectAll('.d3-staff');
  audioData[firstNoteInRow.row] = audioData[firstNoteInRow.row] || [];
  audioData[firstNoteInRow.row].push({xInc, y});
  staffs.each(function(staff, idx) {
    if (idx != currentNote.row) {
      return;
    }
    // should handle this staff
    d3.select(this)
    .selectAll('.d3-staff-freq-line')
    .data([1])
    .join('path')
    .attr('d', generateStaffFreqLineD(audioData[firstNoteInRow.row]))
    .attr('class', 'd3-staff-freq-line')
    .style('transform', `translate(${firstNoteInRow.symbol.x}px, 0px)`)
    .style('stroke', 'blue')
    .style('fill', 'none')
    .style('stroke-width', 1);

  });
  //console.log(242, freq, currentNote, nextNote);
  console.log(276, audioData)
}
interface BaseStateType {
  score: ScoreType;
  staff: StaffType;
  player: PlayType;
  audio: any;
}

export const Staff = ({sectionRef}: StaffOwnProps) => {
  const signature = useSelector((state: BaseStateType) => state.score.scoreInfo.signature);
  const scale = useSelector((state: BaseStateType) => state.score.scoreInfo.scale);
  const notes = useSelector((state: BaseStateType) => state.score.notes);
  const staff = useSelector((state: BaseStateType) => state.staff);
  const player = useSelector((state: BaseStateType) => state.player);
  const audio = useSelector((state:BaseStateType) => state.audio);
  const dispatch = useDispatch();
  const divRef = useRef<HTMLDivElement>(null)
  const [notesSVG, setNotesSVG] = useState([]);
  const [notesFullScale, setNotesFullScale] = useState([]);
  const [symbolIter, setSymbolIter] = useState<SymbolIterator>(new SymbolIterator([[]]));
  const score = {
    notes,
    scoreInfo: {
      scale,
      signature
    } 
  }
  useEffect(() => {
    divRef.current.style.height = `${score.notes.length * 200}px`;
    const staffWidth = divRef.current.offsetWidth;
    const notesSVG = mapScoreNotesToSvg(score, staffWidth);
    setSymbolIter(new SymbolIterator(notesSVG));
    setNotesSVG(notesSVG);
    drawStaffLinesAndClef(score, staffWidth);
    drawStaffScale(score);
    drawNotes(notesSVG, staff, dispatch);
    const notesFullScale = getSetOfNoteFromSignatureScale(signature, scale);
    setNotesFullScale(notesFullScale);
    console.log(319, notesSVG);
  }, [signature, scale, notes, staff]);

  useEffect(() => {
    symbolIter.setState(player.playing);
    drawStaffIndicator(symbolIter.iter, player.playing, dispatch, sectionRef);
  }, [player, notesSVG]);

  useEffect(() => {
    drawFreqGraph(symbolIter, player.playing, audio.peakFreq, notesSVG, notesFullScale);
  }, [player, audio]);

  return <div className='d3-staff-container' ref={divRef} style={{width:'99.8%'}}>
    <svg className='staff-container-svg' style={{width:'100%', height:'100%'}}></svg>
  </div>
}
