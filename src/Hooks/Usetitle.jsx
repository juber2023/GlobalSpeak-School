import { useEffect } from "react"

const useTitle=(title)=>{
    useEffect(()=>{
        document.title=`Action Toys | ${title}`
    },[title])
}

export default useTitle