import { useEffect, useState } from "react"

export const useFetch = (url) => {
  
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(null)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      setIsPending(true)
      try {
        const res = await fetch(url, { signal: controller.signal })
        if(!res.ok) {
          throw new Error(res.statusText)
        }
        const data = await res.json()
        
        setIsPending(false)
        setError(null)
        setData(data)
        
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log("The fetch was aborted");
          setIsPending(false)
        } else {
          console.log(err.message)
          setError('Could not fetch data')
          setIsPending(false)
        }
      }
    }
    fetchData()
    return () => {
      controller.abort()
    }
  }, [url])
  
  return {data, isPending, error}
}