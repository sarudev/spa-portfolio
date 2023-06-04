import axios from 'axios'
import { useEffect } from 'react'

export default function useProfPic (url: string, cb: (data: string) => void) {
  useEffect(() => {
    const source = axios.CancelToken.source()

    const loadData = async () => {
      try {
        const { data } = await axios.get<{ avatar: string | null, defaultAvatar: string }>(url, { cancelToken: source.token })
        cb(data.avatar == null ? data.defaultAvatar : data.avatar)
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
