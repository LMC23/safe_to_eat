export default function Footer() {
    return (<>
        <footer
            className=" text-gray-100 flex justify-center -mt-12  bg-gradient-to-r from-fuchsia-800 via-purple-900 to-pink-400 py-3 px-10 mx-auto max-w-3xl lg:max-w-7xl -mb-4 rounded-t-lg text-center"
        >
            <p>
                ©2022 Made with ❤ by {" "}
                <a
                    className="font-bold text-yellow-300"
                    target="_blank"
                    href="https://twitter.com/MihaiAdrianAnd1"
                >Andrei Mihai</a
                >
                <span> and </span>
                <a
                    className="font-bold text-yellow-300"
                    target="_blank"
                    href="https://twitter.com/MihaiAdrianAnd1"
                >Lapusneanu Maria Cristina</a
                >
            </p>

        </footer>
    </>)
}