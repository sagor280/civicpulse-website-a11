import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import useAuth from './useAuth'


const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
  const { user, logOut, loading } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user?.accessToken) {
      // Add request interceptor
      const requestInterceptor = axiosSecure.interceptors.request.use(
        config => {
          config.headers.Authorization = `Bearer ${user.accessToken}`
          return config
        }
      )

      // Add response interceptor
      const responseInterceptor = axiosSecure.interceptors.response.use(
        res => res,
        err => {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            logOut()
              .then(() => {
                console.log('Logged out successfully.')
              })
              .catch(console.error)
            navigate('/login')
          }
          return Promise.reject(err)
        }
      )

      // Cleanup to prevent multiple interceptors on re-renders
      return () => {
        axiosSecure.interceptors.request.eject(requestInterceptor)
        axiosSecure.interceptors.response.eject(responseInterceptor)
      }
    }
  }, [user, loading, logOut, navigate])

  return axiosSecure
}
export default useAxiosSecure
