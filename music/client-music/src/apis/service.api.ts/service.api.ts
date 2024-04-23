import PlayList from '../../types/playlist';
import Song from '../../types/song';
import User from '../../types/user.login';
import axios from '../axios';
import http from '../axios';

let token = sessionStorage.getItem("token") as string;
let authorization = {
    headers: {
        "Authorization": `Bearer ${token}`
    }
};

function setToken() {
    token = sessionStorage.getItem("token") as string;
    authorization = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };
}

function loginUser(user: User) {
    return http.post("/api/auth/login", user);
}

function getUserDetails() {
    return http.get("/api/users", authorization);
}

function getAllsongs() {
    return http.get("/api/music", authorization);
}

function getPlayList() {
    return http.get("/api/playlist/", authorization);
}


function addToPlayList(song: Song) {
    return http.post(`/api/playlist/add`, { songId: song.id }, authorization);
}

function removeFromPlayList(song: PlayList) {
    return http.post("/api/playlist/remove", { songId: song.songId }, authorization);
}

function getSong(songName: string) {
    return http.get(`api/music?search=${songName}`, authorization);
}

function getSongToPlay(songUrl: string) {
    return `${axios.defaults.baseURL}/${songUrl}`;
}

export default {
    loginUser,
    getUserDetails,
    getAllsongs,
    getPlayList,
    addToPlayList,
    removeFromPlayList,
    getSong,
    getSongToPlay,
    setToken
};