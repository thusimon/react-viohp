import React, {useRef, useEffect, useState} from 'react';
import {ConvertNotesToText, ConvertTextToNotes} from './Utils';
import * as musicActions from '../../actions/musicActions';
import CodeMirror from '@uiw/react-codemirror';
import {javascript} from '@codemirror/lang-javascript';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../reducers/initialState';

const NoteEditor = () => {
  const codemirrorContainerRef = useRef<HTMLDivElement>();
  const originalNotes = useSelector((state: RootState) => state.score.originalNotes);
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState({
    height: 200
  })
  const editorChange = (value: string) => {
    try {
      const origNotes = ConvertTextToNotes(value);
      dispatch(musicActions.updateScoreNotes(origNotes));
    } catch (e) {
      if (e.name != 'NOTE_EVAL_ERROR') {
        throw e;
      }
      // do nothing
    }
  };
  useEffect(() => {
    if (codemirrorContainerRef.current) {
      const height = window.innerHeight - codemirrorContainerRef.current.offsetTop - 10;
      setEditorState(Object.assign({...editorState}, {height}));
    }
  }, []);
  return (
    <div ref={codemirrorContainerRef} className="code-mirror-container">
      <CodeMirror
        width="100%"
        height={`${editorState.height}px`}
        value={ConvertNotesToText(originalNotes)}
        extensions={[javascript()]}
        theme='light'
        onChange={editorChange}
      />
    </div>
  );
}

export default NoteEditor;
