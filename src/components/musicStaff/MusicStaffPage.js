/**
 * Created by Lu on 8/12/2018.
 */
import React from 'react';
import fabric from 'fabric';
import Note from './Note';

class MusicStaffPage extends React.Component {
  constructor(props, context){
    super(props, context);
  }

  render(){
    const canvasDom = (<canvas id="canvas" width="800" height="300" />);
    const note1 = Note();
    const canvas = new fabric.fabric.Canvas('canvas');
    canvas.on('object:moving', (event)=>{
      console.log("yoyoy");
      console.log(event);
    });

    canvas.add(note1);
    return(canvasDom);
  }
}

export default MusicStaffPage;
