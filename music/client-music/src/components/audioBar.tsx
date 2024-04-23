import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import shuffle from "../images/shuffle.jpg";
import singleLoop from "../images/singleLoop.jpg";
import loop from "../images/loop.jpg";

import ActiveSong from '../types/active.song';
import { memo, useState } from 'react';
import PlayList from '../types/playlist';

type Props = {
    activeSong: ActiveSong;
    activeIndex: number;
    setActiveIndex: (num: number) => void;
    playList: PlayList[];
    playSong: (index: number) => void;
};

function MusicPlayer(props: Props) {
    const { activeSong, activeIndex, setActiveIndex, playList, playSong } = props;
    const [ image, setImage ] = useState(shuffle);
    const [ mode, setMode ] = useState('shuffle');

    const changeImage = () => {
        switch (mode) {
            case 'shuffle':
                setMode('single-loop');
                setImage(singleLoop);

                break;
            case 'single-loop':
                setMode('loop');
                setImage(loop);
                break;

            case 'loop':
                setMode('shuffle');
                setImage(shuffle);
                break;
        };
        console.log("current mode is: ", mode);
    };

    const previousSong = () => {
        switch (mode) {
            case "shuffle":
                setActiveIndex(Math.floor(Math.random() * playList.length));
                playSong(Math.floor(Math.random() * playList.length));
                break;
            case 'single-loop':
                break;

            case 'loop':
                setActiveIndex((activeIndex + 1) % playList.length);
                playSong((activeIndex + 1) % playList.length);
                break;
        }
    };

    const nextSong = () => {
        switch (mode) {
            case "shuffle":
                setActiveIndex(Math.floor(Math.random() * playList.length));
                playSong(Math.floor(Math.random() * playList.length));
                break;
            case 'single-loop':
                break;

            case 'loop':
                setActiveIndex((activeIndex + 1) % playList.length);
                playSong((activeIndex + 1) % playList.length);
                break;
        }

    };

    return (
        <div className='mt-10' style={ { marginLeft: "280px", width: "815px" } }>
            <AudioPlayer
                src={ activeSong.songUrl }
                preload='auto'
                autoPlay={ true }
                volume={ 0.8 }
                loop={ true }
                // onPlay={  }
                // onPause={ }
                className='player'
                header={ activeSong.header }
                showSkipControls={ true }
                showFilledVolume={ true }
                autoPlayAfterSrcChange={ true }
                onClickPrevious={ previousSong }
                onClickNext={ nextSong }
                customControlsSection={
                    [
                        <div
                            onClick={ () => changeImage() }
                            style={ { marginLeft: "10px", marginRight: "230px" } }>
                            <img src={ image } style={ { width: "20px" } } />
                        </div>,
                        RHAP_UI.MAIN_CONTROLS,
                        RHAP_UI.VOLUME_CONTROLS, ]
                }
            />
        </div>
    );
};

export default memo(MusicPlayer);