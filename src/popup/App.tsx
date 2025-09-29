import React, { useState } from 'react'
import type { ExtensionMessage } from '../shared/types'

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<string>('')

  const handleOpenOverlay = async () => {
    setIsLoading(true)
    setStatus('Opening overlay...')
    
    try {
      // Get the active tab
      const [tab] = await (globalThis as any).chrome.tabs.query({ active: true, currentWindow: true })
      
      if (!tab.id) {
        setStatus('❌ Could not find active tab')
        return
      }

      // Check if this is a restricted page
      if (tab.url?.startsWith('chrome://') || tab.url?.startsWith('chrome-extension://') || tab.url?.startsWith('edge://') || tab.url?.startsWith('about:')) {
        setStatus('❌ Cannot run on browser pages. Try a regular website!')
        return
      }

      // Send message to content script to show overlay
      const message: ExtensionMessage = { action: 'SHOW_OVERLAY' }
      await (globalThis as any).chrome.tabs.sendMessage(tab.id, message)
      setStatus('✅ Overlay opened!')
      
      // Close popup after a moment
      setTimeout(() => {
        window.close()
      }, 1000)
    } catch (error) {
      console.error('Error opening overlay:', error)
      const errorMsg = (error as Error).message
      if (errorMsg.includes('Could not establish connection')) {
        setStatus('⚠️ Content script not ready. Try refreshing the page first!')
      } else {
        setStatus('❌ Error: ' + errorMsg)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestMessage = async () => {
    setStatus('Testing content script...')
    try {
      const [tab] = await (globalThis as any).chrome.tabs.query({ active: true, currentWindow: true })
      if (!tab.id) {
        setStatus('❌ No active tab found')
        return
      }

      if (tab.url?.startsWith('chrome://') || tab.url?.startsWith('chrome-extension://') || tab.url?.startsWith('edge://') || tab.url?.startsWith('about:')) {
        setStatus('❌ Cannot test on browser pages')
        return
      }

      const response = await (globalThis as any).chrome.tabs.sendMessage(tab.id, { action: 'PING' })
      setStatus(response ? '✅ Content script is working!' : '❌ No response from content script')
    } catch (error) {
      const errorMsg = (error as Error).message
      if (errorMsg.includes('Could not establish connection')) {
        setStatus('⚠️ Content script not loaded. Refresh the page!')
      } else {
        setStatus('❌ Error: ' + errorMsg)
      }
    }
  }

  return (
    <div className="popup-container">
      <div className="popup-header">
        <h2>Demo Extension</h2>
        <p>Click button to open iframe overlay</p>
      </div>
      
      <div className="popup-content">
        <button 
          onClick={handleOpenOverlay}
          disabled={isLoading}
          className="primary-btn"
        >
          {isLoading ? 'Opening...' : '🚀 Open Overlay'}
        </button>
        
        <button 
          onClick={handleTestMessage}
          className="secondary-btn"
        >
          🔍 Test Content Script
        </button>
        
        {status && (
          <div className={`status ${status.includes('Error') ? 'error' : 'success'}`}>
            {status}
          </div>
        )}
      </div>
      
      <div className="popup-footer">
        <small>This will inject a React iframe overlay into the current page</small>
      </div>
    </div>
  )
}

export default App
