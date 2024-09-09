import React, { useState, useEffect } from "react";
import "./stopwatch.css";


import chords from '../../data/chords.json'


interface Chord extends React.Component {
    chord: string
    timestamp: number
}

const Stopwatch = () => {
    // state to store time
    const [time, setTime] = useState(0);

    // state to check stopwatch running or not
    const [isRunning, setIsRunning] = useState(false);

    // set current chord
    const [currentChordIndex, setCurrentChordIndex] = useState(0);

    useEffect(() => {
        var intervalId: any;
        if (isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time + 1), 10);
            if (msToSeconds(time) > (chords[currentChordIndex + 1])["timestamp"]) {
                setCurrentChordIndex(currentChordIndex + 1);
            }

        }

        return () => clearInterval(intervalId);
    }, [isRunning, time]);

    // Milliseconds calculation
    const milliseconds = time //% 100;

    const msToSeconds = (ms: number) => { return ms / 100 };

    // Method to start and stop stopwatch
    const startAndStop = () => {
        setIsRunning(!isRunning);
    };

    // Method to reset stopwatch back to 0
    const reset = () => {
        setTime(0);
        setCurrentChordIndex(0);
    };

    return (
        <div className="stopwatch-container">
            <p className="stopwatch-time">
                {msToSeconds(milliseconds).toString()}
            </p>
            <p>
                Chord: {(chords[currentChordIndex])["chord"]}
                <br />
                Next Chord: {(chords[currentChordIndex + 1])["chord"]}
            </p>
            <div className="stopwatch-buttons">
                <button className="stopwatch-button" onClick={startAndStop}>
                    {isRunning ? "Stop" : "Start"}
                </button>
                <button className="stopwatch-button" onClick={reset}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Stopwatch;
