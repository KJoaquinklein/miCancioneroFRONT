/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                Rose: {
                    0: "#cb997e",
                    1: "#ddbea9",
                },
                green: {
                    0: "#e0e1dd",
                    1: "#a5a58d",
                    2: "#e0e1dd",
                },
                white: {
                    0: "#ffe8d6",
                },
            },
            keyframes: {
                scrollText: {
                    "0%": { transform: "translateY(100%)" },
                    "100%": { transform: "translateY(-100%)" },
                },
            },
            animation: {
                scrollText: "scrollText 10s linear infinite",
            },
            backgroundImage: {
                madera: "url('https://st2.depositphotos.com/2977159/7256/i/450/depositphotos_72567667-stock-photo-wooden-texture-background.jpg')",
                musica: "url('https://img.freepik.com/vector-premium/patron-musica-grafica_24519-617.jpg')",
                musica2:
                    "url('https://previews.123rf.com/images/balabolka/balabolka1711/balabolka171100289/90850552-garabatos-lindos-patrones-sin-fisuras-de-la-m%C3%BAsica-cl%C3%A1sica.jpg')",
                dibujo: "url('https://static.vecteezy.com/system/resources/previews/018/735/550/non_2x/drawing-cartoon-art-of-dark-wood-texture-pattern-landscape-wide-template-background-free-vector.jpg')",
                dibujo2:
                    "url('https://img.freepik.com/vector-premium/dibujos-animados-textura-madera-vista-frontal-color-brillante_251819-2324.jpg')",
                hoja: "url('https://static.vecteezy.com/system/resources/previews/009/796/197/non_2x/notebook-paper-background-lined-paper-sheet-of-lined-page-notebook-paper-texture-vector.jpg')",
            },
        },
        fontFamily: {
            Outfit: ["Outfit"],
            title: ["Poppins"],
        },
    },
    plugins: [],
};
