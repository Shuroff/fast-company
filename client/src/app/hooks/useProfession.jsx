import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import professionService from '../services/profession.service'
import { toast } from 'react-toastify'

const ProfessionContext = createContext()

export const useProfessions = () => {
  return useContext(ProfessionContext)
}

export const ProfessionProvider = ({ children }) => {
  const [professions, setProfessions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  async function getProfessionsList() {
    try {
      const { content } = await professionService.get()
      setProfessions(content)
      setIsLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }
  useEffect(() => {
    getProfessionsList()
  }, [])
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])
  function errorCatcher(error) {
    const { message } = error
    setError(message)
    setIsLoading(false)
  }
  function getProfession(id) {
    return professions.find(p => p._id === id)
  }
  return (
    <ProfessionContext.Provider
      value={{ isLoading, professions, getProfession }}
    >
      {children}
    </ProfessionContext.Provider>
  )
}

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default ProfessionProvider
