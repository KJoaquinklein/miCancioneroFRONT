import axios from "axios";
import React from "react";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getSongs } from "../redux/reducer";
// import { useNavigate } from "react-router-dom";

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

const Card: React.FC<{ song: ISong }> = ({ song }) => {
    // const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleDelete = () => {
        Swal.fire({
            title: `Estas seguro de que quieres eliminar ${song.title} de ${song.author}`,
            icon: "warning",
            showDenyButton: true,
            confirmButtonText: "No",
            denyButtonText: "Si",
            confirmButtonColor: "#335c67",
            denyButtonColor: "#9e2a2b",
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                return;
            } else {
                // navigate("/");
                axios
                    .post(`https://micancioneroback-production.up.railway.app/user/delete/${song.id}`)
                    .then(({ data }) => {
                        // location.reload()
                        axios
                            .get("https://micancioneroback-production.up.railway.app/user/allsongs")
                            .then(({ data }) => {
                                dispatch(getSongs(data));
                            });
                    });
            }
        });
    };

    return (
        <div className="text-black flex justify-between items-center border-[3px] border-[#264653] px-8 py-1 rounded-full w-[600px] h-20 hover:border-[#e76f51] hover:scale-105 hover:text-[#e76f51] duration-200">
            <Link to={`/song/${song.id}`} className="flex flex-col cursor-pointer">
                <h2 className="text-3xl text-[#e76f51]">{song.title}</h2>
                <div className="flex text-xl">
                    <p>
                        {song.author} | {song.genre}
                    </p>
                </div>
            </Link>
            <div>
                <MdOutlineDelete
                    className="text-3xl text-[#264653] hover:text-[#e76f51] cursor-pointer duration-100 "
                    onClick={handleDelete}
                />
            </div>
        </div>
    );
};

export default Card;
