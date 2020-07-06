import React, {useState,useEffect} from 'react';
import {fetchDataWithAccessToken} from '../../api/utils';

const forceDownload = (blob, filename) => {
  let url = (window.URL || window.webkitURL).createObjectURL(blob);
  let link = window.document.createElement('a');
  link.href = url;
  link.download = filename || 'output.wav';
  document.body.append(link);
  link.click();
  link.remove();
}

const MusicAnalyticsPage = () => {
  const [audioList, setAudioList] = useState([]);
  useEffect(() => {
    const fetchAccount = async () => {
      const {err, audios} = await fetchDataWithAccessToken('/api/audio', 'GET');
      if (err) {
        setAudioList([]);
      } else {
        console.log(12, audios);
        setAudioList(audios);
      }
    }
    fetchAccount();
  }, []);

  const clickScoreDownload = async (evt, id) => {
    console.log(21, id);
    const response = await fetch(`/api/audio/${id}`);
    const wavBlob = await response.blob();
    const fileTime = new Date().toISOString().replace(/:/g, '_');
    forceDownload(wavBlob, `record_${fileTime}.wav`);
  }
  return (
    <div>
      MusicAnalyticsPage
      <ul>
        {audioList.map(audio => <li key={audio._id} onClick={(evt) => clickScoreDownload(evt, audio._id)}>{audio.title}</li>)}
      </ul>
    </div>
  )
}

export default MusicAnalyticsPage;