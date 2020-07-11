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
      const {err, audioAnalyses} = await fetchDataWithAccessToken('/api/audioanalyses', 'GET');
      if (err) {
        setAudioList([]);
      } else {
        console.log(12, audioAnalyses);
        setAudioList(audioAnalyses);
      }
    }
    fetchAccount();
  }, []);

  const clickScoreDownload = async (evt, id) => {
    const response = await fetchDataWithAccessToken(`/api/audioanalyse/${id}`, 'GET');
    //const wavBlob = await response.blob();
    //const fileTime = new Date().toISOString().replace(/:/g, '_');
    //forceDownload(wavBlob, `record_${fileTime}.wav`);
    
  }
  return (
    <div class="music-analytics-page">
      <div class="music-analytics-list">
        <ul>
          {audioList.map(audio => <li key={audio._id} onClick={(evt) => clickScoreDownload(evt, audio._id)}>{audio.scoreTitle}</li>)}
        </ul>
      </div>
      <div class="music-analytics-staff">

      </div>
    </div>
  )
}

export default MusicAnalyticsPage;