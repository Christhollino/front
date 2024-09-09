import React, { useState } from 'react';
import { Decoder } from '../decoder';
import styles from './SpeechToText.module.css';


const SpeechToText: React.FC = () => {
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState<string | null>('');
	const allKey = ["salut", "acceuille"];
	const closerData = ["exit", "fermeture", "modèle"]
	const clickableData = ["acceuil", "service", "centre", "footer"]

    const runSpeechRecognition = () => {
        setListening(true);
        // @ts-ignore
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.onstart = () => {
            setListening(true);
        };

        recognition.onspeechend = () => {
            setListening(false);
            recognition.stop();
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
			const decoder = new Decoder(transcript, clickableData, closerData);
			const decodedText = decoder.decode()
			console.log(decodedText)
			console.log(transcript)

            setTranscript(decodedText.action);
        };

        recognition.start();
    };

    return (
        <div>
            <h2>JavaScript Speech to Text</h2>
            <p>Click on the below button and speak something...</p>
            <p>
                <button type="button" onClick={runSpeechRecognition}>Speech to Text</button> &nbsp; 
                <span>{listening ? <small>listening, please speak...</small> : <small>stopped listening, hope you are done...</small>}</span>
            </p>
            <div id="output" className={!transcript ? styles.hide : styles.show}>
                {transcript && (
                    <div>
                        <b>Text:</b> {transcript} <br />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpeechToText;
