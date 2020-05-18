import React, {useRef, useEffect} from 'react';
import {ConvertNotesToText, ConvertTextToNotes} from './Utils';
import * as musicActions from '../../actions/musicActions';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import {connect} from 'react-redux';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

const codeMirrorOptions = {
  mode: 'javascript',
  theme: 'xq-light',
  lineNumbers: true,
  lineWrapping: false,
  viewportMargin: Infinity,
  indentUnit: 0
};

const NoteEditor = ({id, originalNotes, updateScoreNotes}) => {
  const codemirrorContainerRef = useRef();
  const codemirrorRef = useRef();
  const editorChange = (editor, data, value) => {
    try {
      const origNotes = ConvertTextToNotes(value);
      updateScoreNotes(origNotes);
    } catch (e) {
      if (e.name != 'NOTE_EVAL_ERROR') {
        throw e;
      }
      // do nothing
    }
  };
  useEffect(() => {
    if (codemirrorRef.current && codemirrorContainerRef.current) {
      const height = window.innerHeight - codemirrorContainerRef.current.offsetTop -10;
      codemirrorRef.current.editor.setSize('100%',height);
    }
  });
  return (
  <div ref={codemirrorContainerRef} className="code-mirror-container">
    <CodeMirror ref={codemirrorRef} value={ConvertNotesToText(originalNotes)} 
      options={codeMirrorOptions} onChange={editorChange} />
  </div>
  );
}

const mapStateToProps = (state) => {
  const {id, originalNotes} = state.music;
  return {id, originalNotes};
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateScoreNotes: (notes) => {
      dispatch(musicActions.updateScoreNotes(notes));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteEditor)
