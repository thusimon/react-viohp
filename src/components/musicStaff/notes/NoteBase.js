/**
 * Created by Lu on 8/31/2019.
 */
import React from 'react';
import * as Syms from '../Symbols';
import PropTypes from 'prop-types';
import {getSvgClassName} from "../Utils";

/**
 * NoteBase only renders the note view, such as is this note only a circle, or the note has pole and tail
 * It has no higher level logic such as the note name, staff index, descriptor, etc, it is just the pure view of a single note
 */
class NoteBase extends React.Component {
  constructor(props, context){
    super(props, context);
    this.components = this.props.components || [];
    this.center = this.props.center || [14, 70];
  }
  render() {
    return (
      <div className="note-base">
        {this.components.map(component => {
          const {type, rect} = component;
          // rect should define this components width, height, top, left
          const className = "note-component " + getSvgClassName(type);

          return <div className={className} style={{
            width:rect.width,
            height:rect.height,
            top:rect.top,
            left:rect.left}}></div>
        })}
      </div>
    )
  }
}

NoteBase.propTypes = {
  center: PropTypes.array,
  components:PropTypes.array
};

export default NoteBase;
