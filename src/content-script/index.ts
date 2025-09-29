import './overlay'
import type { ExtensionMessage } from '../shared/types'

console.log('🚀 Demo extension content script loaded')

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message: ExtensionMessage | any, _sender, sendResponse) => {
  console.log('📨 Received message:', message)
  
  if (message.action === 'SHOW_OVERLAY') {
    window.showExtensionOverlay?.()
    sendResponse({ success: true })
    return true
  }
  
  if (message.action === 'HIDE_OVERLAY') {
    window.hideExtensionOverlay?.()
    sendResponse({ success: true })
    return true
  }

  if (message.action === 'PING') {
    sendResponse({ pong: true })
    return true
  }
})

// Notify that content script is ready
console.log('✅ Content script ready - extension overlay functions available')
