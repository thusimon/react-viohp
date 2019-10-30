/**
 * Created by Lu on 8/31/2019.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as musicActions from '../../../actions/musicActions';
import noteComponents from '../../../resources/js/note-components';
import InlineSVG from 'svg-inline-react';

/**
 * NoteBase only renders the note view, such as is this note only a circle, or the note has pole and tail
 * It has no higher level logic such as the note name, staff index, descriptor, etc, it is just the pure view of a single note
 */
class NoteBase extends React.Component {
  constructor(props, context){
    super(props, context);
    this.components = this.props.components || [];
    this.center = this.props.center || [14, 70];
    let {mark,name,sfIdx} = this.props;
    this.state = {mark,name,sfIdx};
    this.noteClick = this.noteClick.bind(this);
  }
  noteClick() {
    let {mark,name,sfIdx} = this.state;
    mark = !mark;
    this.setState({mark});
    if (this.props.onNoteClicked) {
      this.props.onNoteClicked({mark, name, sfIdx});
    }
  }
  render() {
    let noteClass = this.state.mark ? "note-base noteSelected" : "note-base noteDeselected";
    return (<div className={noteClass} onClick={this.noteClick}>
        {this.components.map((component,idx) => {
          const {type, rect} = component;
          let svgSrc = noteComponents[type];
          return (<div className="note-component" key={type+idx} style={{
            width:rect.width,
            height:rect.height,
            top:rect.top,
            left:rect.left}}>
              <InlineSVG src={svgSrc()} />
            </div>);
        })}
      </div>);
  }
}

NoteBase.propTypes = {
  center: PropTypes.array,
  components:PropTypes.array,
  mark: PropTypes.bool,
  name: PropTypes.string,
  sfIdx: PropTypes.number,
  onNoteClicked: PropTypes.func
};


function mapDispatchToProps(dispatch) {
  return {
    onNoteClicked: (markNote) => {
      dispatch(musicActions.clickNote(markNote));
    }
  };
}

export default connect(null, mapDispatchToProps)(NoteBase);
