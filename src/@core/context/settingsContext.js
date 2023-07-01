// ** React Imports
import { createContext, useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// ** ThemeConfig Import
import themeConfig from 'src/configs/themeConfig'

const initialSettings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  contentWidth: themeConfig.contentWidth
}

// ** Create Context
export const SettingsContext = createContext({
  saveSettings: () => null,
  settings: initialSettings
})

export const SettingsProvider = ({ children }) => {
  const [token, setToken] = useState(null)

  // Function to set the token
  const setAuthToken = newToken => {
    console.log('Token in context: ', newToken)
    localStorage.setItem('ctoken', newToken)
    setToken(newToken)
  }


  console.log('token inside context', token)

  // Function to clear the token
  const clearAuthToken = () => {
    setToken(null)
    localStorage.removeItem('ctoken')
  }

  useEffect(async () => {
    const token = localStorage.getItem('ctoken')
    setToken(token)
  }, [])
 
  const [settings, setSettings] = useState({ ...initialSettings })

  const saveSettings = updatedSettings => {
    setSettings(updatedSettings)
  }

  const contextTokenValue = {
    token,
    setAuthToken,
    clearAuthToken
  }

  return (
    <SettingsContext.Provider value={{ settings, saveSettings, contextTokenValue }}>
      <ToastContainer />
      {children}
    </SettingsContext.Provider>
  )
}

export const SettingsConsumer = SettingsContext.Consumer
