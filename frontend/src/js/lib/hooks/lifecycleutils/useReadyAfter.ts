import {useEffect, useState} from "react";

export const useReadyAfter = (block: ()=>void) => {
    let [ready, setReady] = useState(false)
    useEffect(()=>{
        block()
        setReady(true)
    },[])
    return ready
}