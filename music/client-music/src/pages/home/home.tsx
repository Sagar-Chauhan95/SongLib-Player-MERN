import { KeyboardEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

import logo from '../../images/musiclogo.jpg';
import './home.css';
import serviceProvider from '../../apis/service.api.ts/service.api';
import Song from '../../types/song';
import PlayList from '../../types/playlist';
import axios from '../../apis/axios';
import ActiveSong from '../../types/active.song';
import MusicPlayer from '../../components/audioBar';
import YourPlayList from '../../components/playList';
import SuggestedSong from '../../components/suggestedSong';

export default function Home() {
    const [ songs, setSongs ] = useState<Song[]>([]);
    const [ userName, setUserName ] = useState<string>("");
    const [ playList, setPlayList ] = useState<PlayList[]>([]);
    const [ activeSong, setActiveSong ] = useState<ActiveSong>({ songUrl: "", header: "" });
    const [ activeIndex, setActiveIndex ] = useState<number>(0);

    const token = sessionStorage.getItem("token") as string;
    const navigate = useNavigate();
    const isDesktopOrLaptop = useMediaQuery(
        { minDeviceWidth: 1224 },
        { deviceWidth: 1600 }
    );

    async function getSuggestedSongsList() {
        const response = await serviceProvider.getAllsongs();
        console.log(response);
        setSongs(response.data);
    }

    useEffect(() => {

        if (!sessionStorage.getItem('token')) {
            navigate('/login');
            return;
        }

        async function getUser() {
            const response = await serviceProvider.getUserDetails();
            setUserName(response.data.username);
        }

        async function getPlayList() {
            const response = await serviceProvider.getPlayList();
            setPlayList(response.data);

        }
        getUser();
        getSuggestedSongsList();
        getPlayList();


    }, []);


    const searchSong = async (e: KeyboardEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        if (e.key === "Enter" && value.length !== 0) {
            if (value.trim()) {
                const response = await serviceProvider.getSong(value);
                setSongs(response.data);
            } else if (value.length === 0) {
                alert("Search bar cannot be empty");
            }

        } else {
            getSuggestedSongsList();
        }
    };

    const addToPlayList = async (newSong: Song) => {
        try {
            const song_index = playList.findIndex(song => song.songId === newSong.id);
            if (song_index === -1) {
                const response = await serviceProvider.addToPlayList(newSong);
                setPlayList(response.data);
            }
        } catch (error) {
            console.log("Song already on playlist");
        }
    };

    const removeFromPlayList = async (song: PlayList) => {
        try {
            const response = await serviceProvider.removeFromPlayList(song);
            if (response.status === 200 && song.title === activeSong.header) {
                setActiveSong({ songUrl: "", header: "" });
                setPlayList(response.data);

            } else {
                setPlayList(response.data);

            }

        } catch (err) {
            console.log("Error removing song from playlist, error");
        }
    };

    const playSong = async (index: number) => {
        try {
            const songUrl = `${axios.defaults.baseURL}/${playList[ index ]!.urlPath}`;
            const header = playList[ index ]?.title;
            setActiveSong({ songUrl, header });
            setActiveIndex(index);

        } catch (error) {
            console.log("Error playing the song", error);
        }
    };

    const [ playListMode, setPlayListMode ] = useState<boolean>(false);

    const logout = () => {
        if (window.confirm("Sure wanna logout?")) {
            sessionStorage.clear();
            navigate("/login");
        }
    };

    return (
        <div style={ { fontSize: "12px", height: "500px" } }>
            <header className="d-flex flex-wrap align-items-center d-flex justify-content-around py-1 mb-1 border-bottom">
                <div className="col-md-3 mb-2 mb-md-0 d-flex flex-wrap align-items-center d-flex">
                    <img src={ logo } alt="Music-logo" style={ { width: "100px", height: "100px", borderRadius: "50px" } } />
                    <div style={ {
                        width: "80px",
                        border: "1px solid black",
                        padding: "10px", borderRadius: "7px",
                        textAlign: "center", backgroundColor: "#424649",
                        color: "white"
                    } }>{ userName }
                    </div>
                </div>
                <input className="form-control"
                    name="Enter"
                    placeholder="Search for Music"
                    aria-label="Search for Music"
                    style={ { width: '30%' } } onKeyUp={ searchSong }
                />

                <div className="col-md-3 text-end">
                    <button type="button" className="btn btn-dark mt"
                        onClick={ logout }>Logout</button>
                </div>

            </header >

            <SuggestedSong onAddToPlayList={ addToPlayList } songs={ songs } />

            <YourPlayList playList={ playList }
                onPlaySong={ playSong }
                onRemoveFromPlayList={ removeFromPlayList }
            />

            <MusicPlayer activeSong={ activeSong }
                activeIndex={ activeIndex }
                setActiveIndex={ setActiveIndex }
                playList={ playList }
                playSong={ playSong }
            />
        </div >
    );
}
