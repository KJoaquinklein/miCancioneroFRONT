import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IoMdArrowRoundBack } from "react-icons/io";

interface ISections {
    type: string;
    verses: string[];
}

interface ISong {
    id?: number;
    title: string;
    author: string;
    genre: string;
    sections: ISections[];
}

const CreateSong: React.FC = () => {
    const [form, setForm] = useState<ISong>({
        title: "",
        author: "",
        genre: "",
        sections: [],
    });

    // const [estr, setEstr] = useState<boolean>(false);

    // useEffect(() => {
    //     let cont = 0;
    //     form.sections.forEach((sec) => {
    //         if (sec.type === "Estribillo") {
    //             cont++;
    //         }
    //     });
    //     setEstr(cont > 0);
    // }, [form]);

    const [section, setSection] = useState<ISections>({ type: "", verses: [] });
    const [verses, setVerses] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const property: string = event.target.name;
        const value: string = event.target.value;
        setForm({ ...form, [property]: value });
    };

    const handleChangeSection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const type: string = event.target.value;
        setSection({ ...section, type });
    };

    const handlePasteVerses = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setVerses(event.target.value);
    };

    const handleAddSection = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!section.type) {
            return Swal.fire({
                title: "Tienes que aclarar que tipo de verso es",
                icon: "warning",
                confirmButtonText: "Ok",
            });
        }

        const splitVerses = verses.split("\n");

        setSection({ ...section, verses: splitVerses });
        setForm({ ...form, sections: [...form.sections, { ...section, verses: splitVerses }] });

        setSection({ type: "", verses: [] });
        setVerses("");

        const selectElement = document.getElementById("sectionType") as HTMLSelectElement;
        selectElement.value = "";
        const textarea = document.getElementById("textarea") as HTMLSelectElement;
        textarea.value = "";
    };

    const handlerRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (form.sections.length > 1) {
            const newSect = [...form.sections];
            newSect.pop();
            return setForm({ ...form, sections: newSect });
        }
        setForm({ ...form, sections: [] });
    };

    // const handleEstrib = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    //     let estribillo: ISections = { type: "", verses: [] };
    //     form.sections.forEach((sec) => {
    //         if (sec.type === "Estribillo") {
    //             estribillo = sec;
    //         }
    //     });
    //     setForm({ ...form, sections: [...form.sections, estribillo] });
    // };

    const navigate = useNavigate();

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!form.title || !form.author || !form.genre || !form.sections.length) {
            return Swal.fire({
                title: "Falta completar datos",
                text: "Revisa que todas las casillas estén completas para cargar la canción",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }

        axios
            .post("https://micancioneroback-production.up.railway.app/user/song", form)
            .then(({ data }) => {
                Swal.fire({
                    title: "¡Perfecto!",
                    text: data.message,
                    icon: "success",
                    showDenyButton: true,
                    confirmButtonText: "Ir al inicio",
                    denyButtonText: "Cargar otra canción",
                    confirmButtonColor: "#81B29A",
                    denyButtonColor: "#81B29A",
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/");
                    } else {
                        navigate("/create");
                    }
                    location.reload();
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error",
                    text: error,
                    icon: "warning",
                    showDenyButton: true,
                    confirmButtonText: "Ir al inicio",
                    denyButtonText: "Cargar otra canción",
                    confirmButtonColor: "#81B29A",
                    denyButtonColor: "#81B29A",
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/");
                    } else {
                        navigate("/create");
                    }
                    location.reload();
                });
            });
    };

    const handleBack = () => {
        navigate("/");
    };

    return (
        <div className="bg-gray-100">
            <div className="bg-gray-100 max-w-screen min-h-screen flex flex-col items-center font-Outfit scale-95">
                <h1 className="text-4xl text-center mt-1 border-[3px] border-black px-3 py-1 rounded-full">
                    Cargar Canción
                </h1>
                <p className="text-lg mt-2 text-center">
                    Completa las casillas para añadir una nueva canción a tu cancionero
                </p>
                <button
                    className="mv:hidden sm:flex absolute top-5 left-10 p-5 bg-[#e76f51] rounded-full flex justify-center items-center"
                    onClick={handleBack}
                >
                    <IoMdArrowRoundBack className={"text-4xl"} />
                </button>
                <div className="bg-black w-4/5 h-[3px] mt-5"></div>
                <div className="flex mv:space-x-0 sm:space-x-8 mv:flex-col sm:flex-row">
                    <form className=" mv:w-[390px] sm:w-[500px]">
                        <div className="mt-4 mv:w-[390px] sm:w-[500px] mv:flex-col sm:flex-row text-2xl">
                            <label htmlFor="title" className="w-20">
                                Título
                            </label>
                            <input
                                type="text"
                                name="title"
                                className="grow border-[3px] border-black rounded-full pl-2"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-4 mv:w-[390px] sm:w-[500px] mv:flex-col sm:flex-row text-2xl">
                            <label htmlFor="author" className="w-20">
                                Autor
                            </label>
                            <input
                                type="text"
                                name="author"
                                className="grow border-[3px] border-black rounded-full pl-2"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-4 mv:w-[390px] sm:w-[500px] mv:flex-col sm:flex-row text-2xl">
                            <label htmlFor="genre" className="w-24">
                                Género
                            </label>
                            <input
                                type="text"
                                name="genre"
                                className="grow border-[3px] border-black rounded-full pl-2"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-4 mv:w-[390px] sm:w-[500px] flex flex-col text-2xl">
                            <p className="px-2 border-[3px] border-black rounded-full w-24">Letra:</p>
                            <div className="flex flex-col mt-4">
                                <div className="flex space-x-3 w-40 mb-4">
                                    <select
                                        name="type"
                                        id="sectionType"
                                        className="w-40 h-9 mr-2 border-[3px] border-black rounded-full pl-2"
                                        onChange={handleChangeSection}
                                    >
                                        <option value="" disabled selected>
                                            Sección
                                        </option>
                                        <option value="Estrofa">Estrofa</option>
                                        <option value="Estribillo">Estribillo</option>
                                        <option value="Recitado">Recitado</option>
                                        <option value="Recitado">Letra completa</option>
                                    </select>
                                    <button
                                        className="w-40 bg-[#84a59d] px-3 rounded-full flex"
                                        onClick={handleAddSection}
                                    >
                                        <p>Añadir</p> ✅
                                    </button>
                                    <button
                                        className="w-40 bg-[#cf6e6f] px-3 rounded-full flex flex-row"
                                        onClick={handlerRemove}
                                    >
                                        <p className="mv:hidden sm:flex">Borrar</p> ❌
                                    </button>
                                    {/* {estr ? (
                                        <button
                                            className="w-40 bg-[#84a59d] px-3 rounded-2xl flex"
                                            onClick={handleEstrib}
                                        >
                                            Añadir Estribillo
                                        </button>
                                    ) : null} */}
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <textarea
                                        id="textarea"
                                        className="border-[3px] border-black rounded-xl pl-2 min-h-72 text-lg max-h-[290px]"
                                        rows={4}
                                        placeholder="Pega aquí la letra completa"
                                        onChange={handlePasteVerses}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="mv:w-[390px] sm:w-[500px] p-2 text-lg bg-gray-100 border-[3px] border-black rounded-2xl mt-4">
                        <div>
                            <div className="flex justify-between h-10">
                                <p>
                                    <strong>{form.title}</strong>
                                    {form.author && <strong> - {form.author}</strong>}
                                </p>
                                <p>{form.genre}</p>
                            </div>
                            <div className="bg-black h-[2px] mt-5"></div>
                            <div className="overflow-auto h-[440px]">
                                {form.sections.map((sec: ISections, index) => (
                                    <div
                                        key={index}
                                        className={
                                            sec.type === "Estribillo"
                                                ? "mt-3 font-bold text-lg text-center"
                                                : "mt-3 text-lg text-center"
                                        }
                                    >
                                        {sec.verses.map((ver: string, i) =>
                                            ver ? (
                                                <p key={i}>{ver}</p>
                                            ) : (
                                                <p className="mt-5" key={i}>
                                                    {ver}
                                                </p>
                                            )
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mv:w-[360px] sm:w-[470px] flex justify-end">
                            <button className="text-2xl px-2 bg-[#84a59d]  rounded-full w-40" onClick={handleSubmit}>
                                Cargar 📓
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateSong;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { IoMdArrowRoundBack } from "react-icons/io";

// interface ISections {
//     type: string;
//     verses: string[];
// }

// interface ISong {
//     id?: number;
//     title: string;
//     author: string;
//     genre: string;
//     sections: ISections[];
// }

// const CreateSong: React.FC = () => {
//     const [form, setForm] = useState<ISong>({
//         title: "",
//         author: "",
//         genre: "",
//         sections: [],
//     });

//     const [estr, setEstr] = useState<boolean>(false);

//     useEffect(() => {
//         let cont = 0;
//         form.sections.forEach((sec) => {
//             if (sec.type === "Estribillo") {
//                 cont++;
//             }
//         });
//         setEstr(cont > 0);
//     }, [form]);

//     const [section, setSection] = useState<ISections>({ type: "", verses: [] });
//     const [verses, setVerses] = useState<string[]>(Array(20008).fill(""));

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const property: string = event.target.name;
//         const value: string = event.target.value;
//         setForm({ ...form, [property]: value });
//     };

//     const handleChangeSection = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         const type: string = event.target.value;
//         setSection({ ...section, type });
//     };

//     // const handleVerses = (event: React.ChangeEvent<HTMLInputElement>) => {
//     //     const index: number = parseInt(event.target.name) - 1;
//     //     const value: string = event.target.value;
//     //     const newVerses = [...verses];
//     //     newVerses[index] = value;
//     //     setVerses(newVerses);
//     // };

//     const handlePasteVerses = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//         const pastedText = event.target.value;
//         const splitVerses = pastedText.split("\n");
//         const newVerses = Array(2000).fill("");
//         splitVerses.forEach((verse, index) => {
//             if (index < newVerses.length) {
//                 newVerses[index] = verse;
//             }
//         });
//         setVerses(newVerses);
//     };

//     const getNonEmptyInputs = (): string[] => {
//         return verses.filter((input) => input !== "");
//     };

//     const handleAddSection = (event: React.MouseEvent<HTMLButtonElement>) => {
//         event.preventDefault();
//         if (!section.type) {
//             return Swal.fire({
//                 title: "Tienes que aclarar que tipo de verso es",
//                 icon: "warning",
//                 confirmButtonText: "Ok",
//             });
//         }

//         setSection({ ...section, verses: getNonEmptyInputs() });
//         setForm({ ...form, sections: [...form.sections, { ...section, verses: getNonEmptyInputs() }] });

//         setSection({ type: "", verses: [] });
//         setVerses(Array(8).fill(""));

//         const selectElement = document.getElementById("sectionType") as HTMLSelectElement;
//         selectElement.value = "";
//         const textarea = document.getElementById("textarea") as HTMLSelectElement;
//         textarea.value = "";
//     };

//     const handlerRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
//         event.preventDefault();
//         if (form.sections.length > 1) {
//             const newSect = [...form.sections];
//             newSect.pop();
//             return setForm({ ...form, sections: newSect });
//         }
//         setForm({ ...form, sections: [] });
//     };

//     const handleEstrib = (event: React.MouseEvent<HTMLButtonElement>) => {
//         event.preventDefault();
//         let estribillo: ISections = { type: "", verses: [] };
//         form.sections.forEach((sec) => {
//             if (sec.type === "Estribillo") {
//                 estribillo = sec;
//             }
//         });
//         setForm({ ...form, sections: [...form.sections, estribillo] });
//     };

//     const navigate = useNavigate();

//     const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
//         event.preventDefault();
//         if (!form.title || !form.author || !form.genre || !form.sections.length) {
//             return Swal.fire({
//                 title: "Falta completar datos",
//                 text: "Revisa que todas las casillas estén completas para cargar la canción",
//                 icon: "error",
//                 confirmButtonText: "Ok",
//             });
//         }

//         axios
//             .post("https://micancioneroback-production.up.railway.app/user/song", form)
//             .then(({ data }) => {
//                 Swal.fire({
//                     title: "¡Perfecto!",
//                     text: data.message,
//                     icon: "success",
//                     showDenyButton: true,
//                     confirmButtonText: "Ir al inicio",
//                     denyButtonText: "Cargar otra canción",
//                     confirmButtonColor: "#81B29A",
//                     denyButtonColor: "#81B29A",
//                     allowOutsideClick: false,
//                 }).then((result) => {
//                     if (result.isConfirmed) {
//                         navigate("/");
//                     } else {
//                         navigate("/create");
//                     }
//                     location.reload();
//                 });
//             })
//             .catch((error) => {
//                 Swal.fire({
//                     title: "Error",
//                     text: error,
//                     icon: "warning",
//                     showDenyButton: true,
//                     confirmButtonText: "Ir al inicio",
//                     denyButtonText: "Cargar otra canción",
//                     confirmButtonColor: "#81B29A",
//                     denyButtonColor: "#81B29A",
//                 }).then((result) => {
//                     if (result.isConfirmed) {
//                         navigate("/");
//                     } else {
//                         navigate("/create");
//                     }
//                     location.reload();
//                 });
//             });
//     };

//     const handleBack = () => {
//         navigate("/");
//     };

//     return (
//         <div className="bg-gray-100">
//             <div className="bg-gray-100 max-w-screen min-h-screen flex flex-col items-center font-Outfit scale-95">
//                 <h1 className="text-4xl text-center mt-1 border-[3px] border-black px-3 py-1 rounded-full">
//                     Cargar Canción
//                 </h1>
//                 <p className="text-lg mt-2">Completa las casillas para añadir una nueva canción a tu cancionero</p>
//                 <button
//                     className="absolute top-5 left-10 p-5 bg-[#e76f51] rounded-full flex justify-center items-center"
//                     onClick={handleBack}
//                 >
//                     <IoMdArrowRoundBack className={"text-4xl"} />
//                 </button>
//                 <div className="bg-black w-4/5 h-[3px] mt-5"></div>
//                 <div className="flex space-x-8">
//                     <form className="overflow w-[500px]">
//                         <div className="mt-4 w-[500px] flex text-2xl">
//                             <label htmlFor="title" className="w-20">
//                                 Título
//                             </label>
//                             <input
//                                 type="text"
//                                 name="title"
//                                 className="grow border-[3px] border-black rounded-full pl-2"
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div className="mt-4 w-[500px] flex text-2xl">
//                             <label htmlFor="author" className="w-20">
//                                 Autor
//                             </label>
//                             <input
//                                 type="text"
//                                 name="author"
//                                 className="grow border-[3px] border-black rounded-full pl-2"
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div className="mt-4 w-[500px] flex text-2xl">
//                             <label htmlFor="genre" className="w-24">
//                                 Género
//                             </label>
//                             <input
//                                 type="text"
//                                 name="genre"
//                                 className="grow border-[3px] border-black rounded-full pl-2"
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div className="mt-4 w-[500px] flex flex-col text-2xl">
//                             <p className="px-2 border-[3px] border-black rounded-full w-24">Letra:</p>
//                             <div className="flex mt-4">
//                                 <div className="flex flex-col space-y-3 w-40">
//                                     <select
//                                         name="type"
//                                         id="sectionType"
//                                         className="w-40 h-9 mr-2 border-[3px] border-black rounded-full pl-2"
//                                         onChange={handleChangeSection}
//                                     >
//                                         <option value="" disabled selected>
//                                             Sección
//                                         </option>
//                                         <option value="Estrofa">Estrofa</option>
//                                         <option value="Estribillo">Estribillo</option>
//                                         <option value="Recitado">Recitado</option>
//                                     </select>
//                                     <button className="w-40 bg-[#84a59d] px-3 rounded-full" onClick={handleAddSection}>
//                                         Añadir ✅
//                                     </button>
//                                     <button className="w-40 bg-[#cf6e6f] px-3 rounded-full" onClick={handlerRemove}>
//                                         Borrar ❌
//                                     </button>
//                                     {estr ? (
//                                         <button className="w-40 bg-[#84a59d] px-3 rounded-2xl" onClick={handleEstrib}>
//                                             Añadir Estribillo
//                                         </button>
//                                     ) : null}
//                                 </div>
//                                 <div className="flex flex-col space-y-2 grow ml-3">
//                                     <textarea
//                                         id="textarea"
//                                         className="border-[3px] border-black rounded-lg pl-2 min-h-72 text-lg"
//                                         rows={4}
//                                         placeholder="Pega aquí la estrofa completa"
//                                         onChange={handlePasteVerses}
//                                     ></textarea>
//                                 </div>
//                             </div>
//                         </div>
//                     </form>
//                     <div className="w-[500px] p-2 text-lg bg-gray-100 border-[3px] border-black rounded-2xl mt-4">
//                         <div>
//                             <div className="flex justify-between h-10">
//                                 <p>
//                                     <strong>{form.title}</strong>
//                                     {form.author && <strong> - {form.author}</strong>}
//                                 </p>
//                                 <p>{form.genre}</p>
//                             </div>
//                             <div className="bg-black h-[2px] mt-5"></div>
//                             <div className="overflow-auto h-[440px]">
//                                 {form.sections.map((sec: ISections, index) => (
//                                     <div
//                                         key={index}
//                                         className={
//                                             sec.type === "Estribillo"
//                                                 ? "mt-3 font-bold text-lg text-center"
//                                                 : "mt-3 text-lg text-center"
//                                         }
//                                     >
//                                         {sec.verses.map((ver: string, i) => (
//                                             <p key={i}>{ver}</p>
//                                         ))}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                         <div className="w-[470px] flex justify-end">
//                             <button className="text-2xl px-2 bg-[#84a59d]  rounded-full w-40" onClick={handleSubmit}>
//                                 Cargar 📓
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CreateSong;
