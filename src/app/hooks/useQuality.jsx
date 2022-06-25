import { func } from 'prop-types'
import { createContext } from 'react'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import qualityService from '../services/quality.service'
const QualityContext = createContext()

const useQuality = () => {
  useContext(QualityContext)
}

const QualityProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [qualities, setQualities] = useState([])
  async function getQualityList() {
    try {
      const qualities = await qualityService.get()
      console.log(qualities)
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
