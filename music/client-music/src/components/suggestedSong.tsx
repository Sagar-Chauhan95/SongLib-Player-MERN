import { IoAddCircle } from "react-icons/io5";
import Song from '../types/song';
import { memo } from "react";

type Props = {
    songs: Song[],
    onAddToPlayList: (song: Song) => void;
};

function SuggestedSong(props: Props) {
    console.log("suggested songs");
    const { songs, onAddToPlayList } = props;
    return (
        <div className='mt-30' style={ { marginLeft: "280px" } }>
            <h3>Suggested Songs</h3>
            <table className="table table-hover" style={ { border: "1px solid black" } }>
                <thead className='table-bordered table-dark'>
                    <tr>
                        <th scope="col">SN</th>
                        <th scope="col">Title</th>
                        <th scope="col">Release Date</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                { songs.map((song, index) => <tbody key={ song.id }>
                    <tr >
                        <th scope="row" > { index + 1 }</th>
                        <td>{ song.title } </td>
                        <td> { song.releaseDate } </td>
                        <td> <IoAddCircle style={ { fontSize: "30px" } }
                            onClick={ () => onAddToPlayList(song) } />
                        </td>
                    </tr>
                </tbody>) }

            </table>
        </div>
    );
}


export default memo(SuggestedSong);