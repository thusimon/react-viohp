/**
 * Created by Lu on 8/12/2018.
 */
import React from 'react';
import {fabric} from 'fabric';
import Note from './Note';

class MusicStaffPage extends React.Component {
  constructor(props, context){
    super(props, context);
  }

  render(){
    const canvasDom = (<canvas id="canvas" width="800" height="300" />);
    const note1 = Note({fill:'#000', cords: [21.8,0,21.8,-60]});
    const canvas = new fabric.Canvas('canvas');
    canvas.on('object:moving', (event)=>{
      //console.log(event.target);
      var note = event.target;
      var noteHead = note.item(0);
      console.log(noteHead.left + ", " + noteHead.top);
      //console.log(noteHead);
      console.log(note.left + ", " + note.top);
    });

    note1.set({left:50, top:50})
    canvas.add(note1);
    //canvas.renderAll();
    return(canvasDom);
  }
}

export default MusicStaffPage;
