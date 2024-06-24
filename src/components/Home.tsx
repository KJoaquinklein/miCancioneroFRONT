import React, { useState } from "react";
// import { TiArrowShuffle } from "react-icons/ti";
// import { IoSearch } from "react-icons/io5";
// import { MdFileUpload } from "react-icons/md";
import Card from "./Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getSongs } from "../redux/reducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

interface ISections {
    type: string;
    verses: string[];
}

interface ISong {
    id: number;
    title: string;
    author: string;
    genre: string;
    sections: ISections[];
}

interface IFilters {
    genre: string;
    alpha: string;
}

const Home: React.FC = () => {
    const [genres, setGenres] = useState<string[]>([""]);

    const dispatch = useDispatch();
    useEffect(() => {
        axios.get("https://micancioneroback-production.up.railway.app/user/allsongs").then(({ data }) => {
            dispatch(getSongs(data));
        });
        axios.get("https://micancioneroback-production.up.railway.app/user/genres_authors").then(({ data }) => {
            let genres: string[] = [];
            data.genres.map((g: string) => {
                if (!genres.includes(g.toLowerCase())) {
                    genres.push(g.toLowerCase());
                }
            });

            let genresToUpper: string[] = [];
            genres.map((g: string) => {
                const toArray = g.split("");
                toArray[0] = toArray[0].toUpperCase();
                const toString = toArray.join("");

                if (!genresToUpper.includes(toString)) {
                    genresToUpper.push(toString);
                }
            });

            setGenres([...genresToUpper]);
        });
    }, []);

    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const [filters, setFilters] = useState<IFilters>({ genre: "", alpha: "" });

    const [existSongs, setExistSongs] = useState<boolean>(true);
    const message: string = existSongs ? "Cargando canciones ⌛" : "No tienes canciones cargadas ☹️";

    const songs: ISong[] = useSelector((state: { songs: ISong[] }) => state.songs);

    setTimeout(() => {
        if (!songs.length) setExistSongs(false);
    }, 10000);

    const handleShowSearch = () => {
        setShowSearch(!showSearch);
        setShowFilters(false);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = event.target.value;

        axios.get(`https://micancioneroback-production.up.railway.app/user/songname?title=${name}`).then(({ data }) => {
            dispatch(getSongs(data));
        });
    };

    const handleDeleteSearch = () => {
        const value = document.getElementById("input") as HTMLSelectElement;

        if (!value.value) {
            return setShowSearch(!showSearch);
        }

        axios.get("https://micancioneroback-production.up.railway.app/user/allsongs").then(({ data }) => {
            dispatch(getSongs(data));
        });
        value.value = "";
    };

    const handleshowFilter = () => {
        setShowSearch(false);
        setShowFilters(!showFilters);
    };

    const handleChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const type = event.target.name;
        const value = event.target.value;

        if (type === "genres") {
            setFilters({ ...filters, genre: value });
            axios
                .get(
                    `https://micancioneroback-production.up.railway.app/user/filters?author=&genre=${value}&order=${filters.alpha}`
                )
                .then(({ data }) => {
                    dispatch(getSongs(data));
                });
            return;
        }

        if (type === "alpha") {
            if (value === "A-Z") {
                setFilters({ ...filters, alpha: "ascendente" });
                axios
                    .get(
                        `https://micancioneroback-production.up.railway.app/user/filters?author=&genre=${filters.genre}&order=ascendente`
                    )
                    .then(({ data }) => {
                        dispatch(getSongs(data));
                    });
                return;
            }
            if (value === "Z-A") {
                setFilters({ ...filters, alpha: "ascendente" });
                axios
                    .get(
                        `https://micancioneroback-production.up.railway.app/user/filters?author=&genre=${filters.genre}&order=descendente`
                    )
                    .then(({ data }) => {
                        dispatch(getSongs(data));
                    });
                return;
            }
        }
    };

    const handleDeleteFilters = () => {
        setShowFilters(false);
        axios.get("https://micancioneroback-production.up.railway.app/user/allsongs").then(({ data }) => {
            dispatch(getSongs(data));
        });
        setFilters({ genre: "", alpha: "" });
    };

    return (
        <div className="bg-dibujo max-w-screen max-h-screen flex justify-center mv:overflow-hidden sm:overflow-auto">
            {/* <div className="bg-[#f4a261] max-w-screen min-h-screen flex justify-center"> */}
            {/* <div className="bg-[#2a9d8f] max-w-screen min-h-screen flex justify-center"> */}
            <div className="bg-gray-100 mv:min-w-screen sm:min-w-screen md:w-[768px] lg:min-w-[900px] max-h-screen flex justify-center items-center">
                <div className="w-full h-screen  flex flex-col items-center">
                    <h1 className="font-Outfit text-5xl text-center mt-[42px] underline  decoration-[#e76f51]">
                        Mi Cancionero
                    </h1>
                    {/* <h1 className="font-Outfit text-4xl text-center mt-9 bg-gray-100 border-[3px] border-black px-3 py-1 rounded-full">
                        Mi Cancionero
                    </h1> */}
                    <div className="flex mv:space-x-1 sm:space-x-4 md:space-x-8 mt-5 mv:scale-90 sm:scale-100">
                        {showFilters ? (
                            <div className="bg-gray-100 flex items-center text-2xl border-[3px] border-black px-3 py-1 rounded-full min-w-36 hover:text-[#2a9d8f] hover:border-[#2a9d8f] duration-100 cursor-pointer">
                                <p onClick={handleshowFilter} className="cursor-pointer mv:hidden sm:flex">
                                    🔃
                                </p>
                                <select
                                    name="genres"
                                    className="rounded-full h-8 px-2 mx-2"
                                    onChange={handleChangeFilter}
                                >
                                    <option selected disabled>
                                        Genero
                                    </option>
                                    {genres.map((gen) => (
                                        <option key={gen}>{gen}</option>
                                    ))}
                                </select>
                                <select
                                    name="alpha"
                                    className="rounded-full h-8 px-2 mx-2"
                                    onChange={handleChangeFilter}
                                >
                                    <option selected disabled>
                                        Titulo
                                    </option>
                                    <option>A-Z</option>
                                    <option>Z-A</option>
                                </select>
                                <p className="cursor-pointer" onClick={handleDeleteFilters}>
                                    ❌
                                </p>
                            </div>
                        ) : (
                            <div
                                onClick={handleshowFilter}
                                className={
                                    showSearch
                                        ? "bg-gray-100 flex items-center text-2xl border-[3px] border-black px-3 py-1 rounded-full hover:text-[#2a9d8f] hover:border-[#2a9d8f] duration-100 cursor-pointer"
                                        : "bg-gray-100 flex items-center text-2xl border-[3px] border-black px-3 py-1 rounded-full w-36 hover:text-[#2a9d8f] hover:border-[#2a9d8f] duration-100 cursor-pointer"
                                }
                            >
                                🔃 {showSearch ? null : <>Filtrar</>}
                            </div>
                        )}

                        {showSearch ? (
                            <div className="bg-gray-100 flex items-center text-2xl border-[3px] border-black px-3 py-1 rounded-full min-w-36 hover:text-[#2a9d8f] hover:border-[#2a9d8f] duration-100 cursor-pointer">
                                {/* <IoSearch className="mr-2 text-[#335c67]" /> */}
                                <p onClick={handleShowSearch} className="cursor-pointer mv:hidden sm:flex">
                                    🔍
                                </p>
                                <input
                                    id="input"
                                    type="text"
                                    placeholder="Buscar por nombre"
                                    className="mx-2 px-2 rounded-full"
                                    onChange={handleSearch}
                                />
                                <p onClick={handleDeleteSearch} className="cursor-pointer">
                                    ❌
                                </p>
                            </div>
                        ) : (
                            <div
                                onClick={handleShowSearch}
                                className={
                                    showFilters
                                        ? "bg-gray-100 flex items-center text-2xl border-[3px] border-black px-3 py-1 rounded-full hover:text-[#2a9d8f] hover:border-[#2a9d8f] duration-100 cursor-pointer"
                                        : "bg-gray-100 flex items-center text-2xl border-[3px] border-black px-3 py-1 rounded-full w-36 hover:text-[#2a9d8f] hover:border-[#2a9d8f] duration-100 cursor-pointer"
                                }
                            >
                                🔍 {showFilters ? null : <>Buscar</>}
                            </div>
                        )}

                        <Link
                            to="/create"
                            className={
                                showSearch || showFilters
                                    ? "bg-gray-100 flex items-center text-2xl border-[3px] border-black px-3 py-1 rounded-full hover:text-[#2a9d8f] hover:border-[#2a9d8f] duration-100 cursor-pointer"
                                    : "bg-gray-100 flex items-center text-2xl border-[3px] border-black px-3 py-1 rounded-full w-36 hover:text-[#2a9d8f] hover:border-[#2a9d8f] duration-100 cursor-pointer"
                            }
                        >
                            {/* <MdFileUpload className="mr-2 text-[#335c67]" /> */}
                            ✏️ {showSearch || showFilters ? null : <>Cargar</>}
                        </Link>
                    </div>
                    <div className="bg-black w-4/5 h-[3px] mt-3"></div>
                    <div className="pt-4 flex flex-col space-y-4 overflow-auto mv:h-[665px] sm:h-[565px] mv:w-[390px] sm:w-[670px] md:w-[700px] items-center">
                        {songs.length ? (
                            songs.map((song) => <Card key={song.id} song={song} />)
                        ) : (
                            <p className="text-xl">{message}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
