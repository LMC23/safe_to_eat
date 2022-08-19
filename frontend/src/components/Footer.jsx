export default function Footer() {
    return (<>
        <footer
            className="flex justify-center -mt-12 container bg-transparent dark:bg-gray-900 dark:text-dark-accent text-gray-600 py-3 px-10 mx-auto max-w-3xl lg:max-w-5xl -mb-4 rounded-t-lg text-center"
        >
            <p>
                ©2022 Made with ❤ by {" "}
                <a
                    className="font-bold"
                    target="_blank"
                    href="https://twitter.com/MihaiAdrianAnd1"
                >Andrei Mihai</a
                >
                <span> and </span>
                <a
                    className="font-bold"
                    target="_blank"
                    href="https://twitter.com/MihaiAdrianAnd1"
                >Lapusneanu Maria Cristina</a
                >
            </p>

        </footer>
    </>)
}