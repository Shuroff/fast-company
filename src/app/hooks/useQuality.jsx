import { createContext } from 'react'
import { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import qualityService from '../services/quality.service'
const QualityContext = createContext()

export const useQuality = () => {
  return useContext(QualityContext)
}

export const QualityProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [qualities, setQualities] = useState([])
  async function getQualityList() {
    try {
      const content = await qualityService.fetchAll()
      setQualities(content)
      setIsLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }
  function errorCatcher(error) {
    const { message } = error
    setIsLoading(false)
    setError(message)
  }
  function getQuality(userId) {}
  useEffect(() => {
    getQualityList()
  }, [])
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])
  return (
    <QualityContext.Provider value={{ isLoading, qualities, getQuality }}>
      {children}
    </QualityContext.Provider>
  )
}
