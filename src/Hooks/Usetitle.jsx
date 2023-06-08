import { useEffect } from "react"

const useTitle=(title)=>{
    useEffect(()=>{
        document.title=`Summer Camp- ${title}`
    },[title])
}

export default useTitle