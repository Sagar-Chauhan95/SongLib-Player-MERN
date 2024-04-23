import { FaMinusCircle } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { memo } from "react";

import PlayList from '../types/playlist';

type Props = {
    playList: PlayList[];
    onRemoveFromPlayList: (song: PlayList) => void;
    onPlaySong: (index: number) => void;


};

function YourPlayList(props: Props) {
    console.log("Playlist");

    const { playList, onRemoveFromPlayList, onPlaySong } = props;
    return (
        <div className='mt-20' style={ { marginLeft: "280px" } }>
            <h3  >Your Playlist</h3>
            <table className="table table-sm table-hover " style={ { border: "1px solid black" } }>
                <thead className='table-bordered table-dark'>
                    <tr >
                        <th scope="col">SN</th>
                        <th scope="col">Title</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                { playList.map((song, index) => <tbody key={ song.id }>
                    <tr >
                        <th scope="row" > { index + 1 }</th>
                        <td>{ song.title } </td>
                        <td> <FaMinusCircle style={ { fontSize: "30px" } } onClick={ () => onRemoveFromPlayList(song) } />
                            &nbsp; &nbsp;
                            < FaCirclePlay style={ { fontSize: "30px" } } onClick={ () => onPlaySong(index) } />
                        </td>
                    </tr>
                </tbody>) }

            </table>
        </div>
    );
}

export default memo(YourPlayList);