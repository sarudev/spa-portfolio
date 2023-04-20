import axios from 'axios'
import { useEffect } from 'react'

export default function useProfPic (url: string, cb: (data: string) => void) {
  useEffect(() => {
    const source = axios.CancelToken.source()

    const loadData = async () => {
      try {
        const res = await axios.get(`${url}/ds/profpic/999693766313123860`, { cancelToken: source.token })
        cb(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    void loadData()

    return () => {
      source.cancel()
    }
  }, [])
}
