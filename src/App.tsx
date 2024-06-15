import React from "react";
import { Routes, Route } from "react-router-dom";

//* Componentes:
import Home from "./components/Home";
import SongDesp from "./components/SongDesp";
import CreateSong from "./components/CreateSong";

const App: React.FC = () => {
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     axios.get("https://micancioneroback-production.up.railway.app/user/allsongs").then(({ data }) => {
    //         dispatch(getSongs(data));
    //     });
    // }, []);

    // const songs: ISong[] = useSelector((state: { songs: ISong[] }) => state.songs);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/song/:id" element={<SongDesp />} />
                <Route path="/create" element={<CreateSong />} />
            </Routes>
        </div>
    );
};

export default App;
