import { createContext } from "react";
import { useState } from "react";

export const songContext = createContext()

export const SongContextProvider = ({ children }) => {
    const [song, setSong] = useState({
        "url": "https://ik.imagekit.io/bplkyjpbl/cohort-2/moodify/songs/DOPAMINE__RiskyjaTT.CoM__-4VSUOo02.mp3",
        "posterUrl": "https://ik.imagekit.io/bplkyjpbl/cohort-2/moodify/posters/DOPAMINE__RiskyjaTT.CoM__Q-z46X5Bm.jpeg",
        "title": "DOPAMINE (RiskyjaTT.CoM)",
        "mood": "happy"
    })

    const [ loading, setLoading] = useState(false)
    return(
        <songContext.Provider
            value={{ loading, setLoading, song, setSong }}>
                {children}
        </songContext.Provider>
    )
}