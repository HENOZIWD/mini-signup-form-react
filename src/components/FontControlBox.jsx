import { useEffect, useState } from 'react'

const FontControlBox = () => {
    const [currentFontSize, setCurrentFontSize] = useState(() => {
        return parseFloat(
            window.getComputedStyle(document.documentElement).fontSize
        )
    })

    useEffect(() => {
        document.documentElement.style.fontSize = currentFontSize + 'px'
    }, [currentFontSize])

    return (
        <aside id="font-control-box" className="flex fixed bottom-0 right-0">
            <button
                id="increase-font-btn"
                className="bg-white text-gray-500 border border-gray-300 hover:bg-red-50 focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:text-white rounded-full"
                disabled={currentFontSize >= 20}
                onClick={() => {
                    setCurrentFontSize((n) => n + 1)
                }}
            >
                +
            </button>
            <button
                id="decrease-font-btn"
                className="bg-white text-gray-500 border border-gray-300 hover:bg-blue-50 focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:text-white rounded-full"
                disabled={currentFontSize <= 12}
                onClick={() => {
                    setCurrentFontSize((n) => n - 1)
                }}
            >
                -
            </button>
        </aside>
    )
}

export default FontControlBox
