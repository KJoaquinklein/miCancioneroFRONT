import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRef } from "react";
import "./ScrollableText.css";

const Song: React.FC = () => {
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

    const [song, setSong] = useState<ISong>({ id: 0, title: "", author: "", genre: "", sections: [] });
    const [scroll, setScroll] = useState(false);
    const localStorageScroll = localStorage.getItem("velocity");
    console.log(localStorageScroll);

    const [scrollVel, setScrollVel] = useState(localStorageScroll ? Number(localStorageScroll) : 150);
    // let scrollVel: number = localStorageScroll ? Number(localStorageScroll) : 150;

    const { id } = useParams();
    useEffect(() => {
        axios.get(`https://micancioneroback-production.up.railway.app/user/song/${id}`).then(({ data }) => {
            setSong({ ...data });
        });

        // return () => {
        //     localStorage.setItem("velocity", scrollVel.toString());
        // };
    }, []);

    const textContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (textContainerRef.current) {
            textContainerRef.current.style.animation = `scrollText ${scrollVel}s linear infinite`;
        }
        setScroll(true);
    };

    const handleStopScroll = () => {
        if (textContainerRef.current) {
            textContainerRef.current.style.animation = "";
        }
        setScroll(false);
    };

    const toggleScroll = () => {
        if (scroll) {
            handleStopScroll();
        } else {
            handleScroll();
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === "Space") {
                event.preventDefault(); // Prevenir el scroll de la página al presionar espacio
                toggleScroll();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [scroll]);

    const handleChangeVel = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: number = Number(event.target.value);
        // scrollVel = value;
        setScrollVel(value);
        localStorage.setItem("velocity", value.toString());
    };

    const handleChangeButton = (event: any) => {
        // scrollVel = Number(event.target.name);
        setScrollVel(Number(event.target.name));
        localStorage.setItem("velocity", Number(event.target.name).toString());
    };

    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/");
    };

    return song.title ? (
        <div className="bg-gray-100 max-w-screen min-h-screen flex flex-col items-center">
            <div className="flex flex-col items-center pt-5">
                <h1 className="text-4xl text-[#335c67]">{song.title}</h1>
                <p className="text-xl">
                    {song.author} | {song.genre}
                </p>
                <div className="flex space-x-3">
                    <button
                        name="100"
                        className={
                            scrollVel === 100
                                ? "border-[3px] border-[#e76f51] px-3 rounded-full hover:border-[#e76f51] duration-200"
                                : "border-[3px] border-black px-3 rounded-full hover:border-[#e76f51] duration-200"
                        }
                        onClick={handleChangeButton}
                    >
                        100
                    </button>
                    <button
                        name="120"
                        className={
                            scrollVel === 120
                                ? "border-[3px] border-[#e76f51] px-3 rounded-full hover:border-[#e76f51] duration-200"
                                : "border-[3px] border-black px-3 rounded-full hover:border-[#e76f51] duration-200"
                        }
                        onClick={handleChangeButton}
                    >
                        120
                    </button>
                    <button
                        name="140"
                        className={
                            scrollVel === 140
                                ? "border-[3px] border-[#e76f51] px-3 rounded-full hover:border-[#e76f51] duration-200"
                                : "border-[3px] border-black px-3 rounded-full hover:border-[#e76f51] duration-200"
                        }
                        onClick={handleChangeButton}
                    >
                        140
                    </button>
                    <button
                        name="160"
                        className={
                            scrollVel === 160
                                ? "border-[3px] border-[#e76f51] px-3 rounded-full hover:border-[#e76f51] duration-200"
                                : "border-[3px] border-black px-3 rounded-full hover:border-[#e76f51] duration-200"
                        }
                        onClick={handleChangeButton}
                    >
                        160
                    </button>
                    <button
                        name="180"
                        className={
                            scrollVel === 180
                                ? "border-[3px] border-[#e76f51] px-3 rounded-full hover:border-[#e76f51] duration-200"
                                : "border-[3px] border-black px-3 rounded-full hover:border-[#e76f51] duration-200"
                        }
                        onClick={handleChangeButton}
                    >
                        180
                    </button>
                    <label htmlFor="vel" className="mv:hidden sm:flex">
                        Otra:
                    </label>
                    <input
                        type="text"
                        name="vel"
                        onChange={handleChangeVel}
                        className="w-14 border-[3px] border-black px-3 rounded-full hover:border-[#e76f51] duration-200 appearance-none"
                    />
                </div>
            </div>
            <div className="bg-black w-4/5 h-[3px] mt-5"></div>

            <button
                className={
                    scroll
                        ? "absolute mv:bottom-5 sm:bottom-auto sm:top-5 right-10 p-5 bg-[#e76f51] rounded-full flex justify-center items-center"
                        : "absolute mv:bottom-5 sm:bottom-auto sm:top-5 right-10 p-5 bg-[#84a59d] rounded-full flex justify-center items-center"
                }
                onClick={scroll ? handleStopScroll : handleScroll}
            >
                {scroll ? <FaPause className={"text-4xl"} /> : <FaPlay className={"text-4xl"} />}
            </button>
            <button
                className="mv:hidden sm:flex absolute top-5 left-10 p-5 bg-[#e76f51] rounded-full flex justify-center items-center"
                onClick={handleBack}
            >
                <IoMdArrowRoundBack className={"text-4xl"} />
            </button>

            {/* <button
                className="p-5 bg-[#84a59d] rounded-full absolute sticky top-4 right-4"
                onClick={scroll ? handleStopScroll : handleScroll}
            >
                <FaPlay className=" text-5xl" />
            </button> */}
            <div className="w-full mv:h-[665px] sm:h-[600px] w-screen pt-10 mv:overflow-hidden sm:overflow-auto relative flex justify-center">
                <div className="absolute whitespace-nowrap mt-10" ref={textContainerRef}>
                    {song.sections &&
                        song.sections.map((sec: ISections) => (
                            <div
                                className={
                                    sec.type === "Estribillo"
                                        ? "my-10 text-[#9e2a2b] mv:text-xl md:text-5xl text-center"
                                        : "my-10 mv:text-xl md:text-5xl text-center"
                                }
                            >
                                {sec.verses.map((ver: string, i) =>
                                    ver ? (
                                        <p key={i}>{ver}</p>
                                    ) : (
                                        <p className="mt-14" key={i}>
                                            {ver}
                                        </p>
                                    )
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    ) : (
        <div className="bg-gray-100 max-w-screen min-h-screen flex flex-col items-center">
            <p className="text-4xl mt-40">Cargando...</p>
        </div>
    );
};

export default Song;
