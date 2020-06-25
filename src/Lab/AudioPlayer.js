import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const AudioPlayer = () => {
    return (
        <ReactAudioPlayer
            src="https://firebasestorage.googleapis.com/v0/b/dialetton.appspot.com/o/audio%2Fnisint45_vacaciones_espana.mp3?alt=media&token=21499df7-74cb-425f-b5e6-5c6b3b5c905e"
            autoPlay
            controls
        />
    );
}
 
export default AudioPlayer;