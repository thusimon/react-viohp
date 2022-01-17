import React, {useState,useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchDataWithAccessToken} from '../../api/utils';
import {getNoteIterator, getTimeoutFromNoteType} from '../musicStaff/NoteIterator';
import MusicStaff from '../musicStaff/MusicStaff';
import * as musicActions from '../../actions/musicActions';
import { RootState } from '../../reducers/initialState';

import './music-analytics-page.scss';

const forceDownload = (blob, filename) => {
  let url = (window.URL || window.webkitURL).createObjectURL(blob);
  let link = window.document.createElement('a');
  link.href = url;
  link.download = filename || 'output.wav';
  document.body.append(link);
  link.click();
  link.remove();
}

const getElapsedTime = (time, now) => {
  const elapsedSeconds = (now - time) / 1000;
  if (elapsedSeconds < 60) {
    return elapsedSeconds+'s';
  } else if (elapsedSeconds < 3600) {
    return Math.round(elapsedSeconds/60) + 'm';
  } else if (elapsedSeconds < 3600 * 24) {
    return Math.round(elapsedSeconds/3600) + 'h';
  } else {
    return Math.round(elapsedSeconds/3600/24) + 'd'
  }
}

const average = (arr) => {
  if (arr.length == 0) {
    return 0;
  }
  const sum = arr.reduce((a, b) => a + b, 0);
  const avg = (sum / arr.length) || 0;
  return avg;
}

const MusicAnalyticsPage = ({score={}, setScore}) => {
  const [audioList, setAudioList] = useState([]);
  const [audioAnalyze, setAudioAnalyze] = useState({});
  const scoreProps = useSelector((state: RootState) => state.score);
  const dispatch = useDispatch();
  
  const analyze = (audioAnalyse, notes) => {
    const {analyzeFrames, analyzeIncTime, noteBaseTime, prepareTime} = audioAnalyse;
    if (!analyzeFrames || !analyzeIncTime || !noteBaseTime || !prepareTime || !notes) {
      return;
    }
    //console.log(analyzeFrames, analyzeIncTime, noteBaseTime, prepareTime, notes);
    const noteIter = new getNoteIterator(notes).getNextNoteInfo();
    let note;
    let noteTimeline = prepareTime;
    do {
      note = noteIter.next().value;
      if (!note) {
        break;
      }
      const time = getTimeoutFromNoteType(note.note, noteBaseTime);
      if (note.note.type.startsWith('NOTE')) {
        const audioFrameIdx = Math.round(noteTimeline / analyzeIncTime);
        const audioFrameIdxSpan = Math.round(time/analyzeIncTime);
        const audioFrames = analyzeFrames.slice(audioFrameIdx, audioFrameIdx+audioFrameIdxSpan);
        const avg = average(audioFrames)
        console.log(`${note.note.label}-${note.note.freq} diff: ${avg - note.note.freq}, ${JSON.stringify(audioFrames)}`);
      }
      noteTimeline += time;
    } while(!!note);
  }

  useEffect(() => {
    const fetchAudioAnalyses = async () => {
      const {err, audioAnalyses} = await fetchDataWithAccessToken('/api/audioanalyses', 'GET');
      if (err) {
        setAudioList([]);
      } else {
        setAudioList(audioAnalyses);
      }
    }
    fetchAudioAnalyses();
    analyze(audioAnalyze, scoreProps.notes);
  }, [score]);

  const clickScoreDownload = async (evt, id) => {
    const audioAnalyseRes = await fetchDataWithAccessToken(`/api/audioanalyse/${id}`, 'GET');
    //const wavBlob = await response.blob();
    //const fileTime = new Date().toISOString().replace(/:/g, '_');
    //forceDownload(wavBlob, `record_${fileTime}.wav`);
    if (audioAnalyseRes.err) {
      console.log('err:' + audioAnalyseRes.err)
      return;
    }
    const {scoreId} = audioAnalyseRes.audioAnalyse;
    setAudioAnalyze(audioAnalyseRes.audioAnalyse);
    const scoreRes = await fetchDataWithAccessToken(`/api/score/${scoreId}`, 'GET');
    if (scoreRes.err) {
      console.log('err:' + scoreRes.err)
      return;
    }
    dispatch(musicActions.setScoreRaw(scoreRes.score));
  }
  return (
    <div className='music-analytics-page'>
      <div className='music-analytics-list'>
        <ul>
          {audioList.map(audio => {
            return <li key={audio._id} onClick={(evt) => clickScoreDownload(evt, audio._id)}>
              <div>
                <span className='score-title'>{audio.scoreTitle}</span>
                <span className='score-time'>{new Date(audio.updatedAt).toISOString()}</span>
              </div>
            </li>
          })}
        </ul>
      </div>
      <div className='music-analytics-staff'>
        <MusicStaff />
      </div>
    </div>
  )
}

export default MusicAnalyticsPage;
