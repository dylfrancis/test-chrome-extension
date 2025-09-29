import React, { useState, useEffect } from 'react'
import type { IframeMessage } from '../shared/types'

const App: React.FC = () => {
  const [data, setData] = useState('')
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Listen for messages from parent content script
    const handleMessage = (event: MessageEvent) => {
      const message: IframeMessage = event.data
      if (message.type === 'OVERLAY_SHOWN') {
        console.log('🎉 Iframe overlay is now visible')
        setIsVisible(true)
      }
    }

    window.addEventListener('message', handleMessage)
    
    // Set visible after a brief delay to ensure smooth animation
    setTimeout(() => setIsVisible(true), 50)
    
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const handleClose = () => {
    console.log('🚪 Closing overlay from iframe')
    // Send close message to content script
    if (window.parent !== window) {
      const message: IframeMessage = { type: 'CLOSE_OVERLAY' }
      window.parent.postMessage(message, '*')
    }
  }

  const handleSubmit = () => {
    console.log('📝 Submitted:', { data, count })
    alert(`Data submitted: "${data}" with count: ${count}`)
    handleClose()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="iframe-overlay" onKeyDown={handleKeyPress} tabIndex={-1}>
      <div className="iframe-modal">
        <div className="iframe-header">
          <div>
            <h3>🚀 React Extension Overlay</h3>
            <p>This is a React app running inside an iframe!</p>
          </div>
          <button onClick={handleClose} className="close-btn" title="Close (Escape)">
            ×
          </button>
        </div>
        
        <div className="iframe-content">
          <div className="demo-section">
            <h4>Interactive Demo</h4>
            <p>This demonstrates a fully functional React app in an iframe overlay:</p>
          </div>
          
          <div className="input-section">
            <label htmlFor="data-input">Enter some data:</label>
            <input
              id="data-input"
              type="text"
              placeholder="Type something here..."
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="input-field"
            />
          </div>
          
          <div className="counter-section">
            <label>Counter: {count}</label>
            <div className="counter-controls">
              <button onClick={() => setCount(c => c - 1)} className="counter-btn">
                −
              </button>
              <span className="counter-display">{count}</span>
              <button onClick={() => setCount(c => c + 1)} className="counter-btn">
                +
              </button>
            </div>
          </div>
          
          <div className="features-list">
            <h5>Features demonstrated:</h5>
            <ul>
              <li>✅ React state management</li>
              <li>✅ Component communication</li>
              <li>✅ Event handling</li>
              <li>✅ CSS styling & animations</li>
              <li>✅ Message passing with content script</li>
            </ul>
          </div>
        </div>
        
        <div className="iframe-footer">
          <div className="button-group">
            <button onClick={handleSubmit} className="submit-btn" disabled={!data.trim()}>
              ✨ Submit & Close
            </button>
            <button onClick={handleClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
