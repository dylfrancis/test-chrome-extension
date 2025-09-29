import type { IframeMessage } from '../shared/types'

let overlayIframe: HTMLIFrameElement | null = null

function createOverlay(): HTMLIFrameElement {
  if (overlayIframe) {
    return overlayIframe
  }

  console.log('🎯 Creating overlay iframe')
  
  const iframe = document.createElement('iframe')
  iframe.src = (globalThis as any).chrome.runtime.getURL('iframe.html')
  iframe.id = 'demo-extension-overlay'
  iframe.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    z-index: 2147483647;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    pointer-events: auto;
  `
  
  document.body.appendChild(iframe)
  
  // Listen for close messages from iframe
  window.addEventListener('message', (event) => {
    const message: IframeMessage = event.data
    if (message.type === 'CLOSE_OVERLAY') {
      console.log('📤 Closing overlay from iframe message')
      hideOverlay()
    }
  })
  
  overlayIframe = iframe
  console.log('✅ Overlay iframe created and added to DOM')
  return iframe
}

function showOverlay() {
  console.log('👁️ Showing overlay')
  const iframe = createOverlay()
  iframe.style.display = 'block'
  document.body.style.overflow = 'hidden' // Prevent background scrolling
  
  // Send message to iframe that it's being shown
  setTimeout(() => {
    const message: IframeMessage = { type: 'OVERLAY_SHOWN' }
    iframe.contentWindow?.postMessage(message, '*')
  }, 100)
}

function hideOverlay() {
  console.log('🙈 Hiding overlay')
  if (overlayIframe) {
    overlayIframe.style.display = 'none'
    document.body.style.overflow = '' // Restore scrolling
  }
}

function destroyOverlay() {
  console.log('🗑️ Destroying overlay')
  if (overlayIframe) {
    overlayIframe.remove()
    overlayIframe = null
    document.body.style.overflow = '' // Restore scrolling
  }
}

// Expose functions globally
declare global {
  interface Window {
    showExtensionOverlay: () => void
    hideExtensionOverlay: () => void
    destroyExtensionOverlay: () => void
  }
}

window.showExtensionOverlay = showOverlay
window.hideExtensionOverlay = hideOverlay
window.destroyExtensionOverlay = destroyOverlay

console.log('🔧 Overlay functions attached to window')
