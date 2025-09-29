# React Chrome Extension Demo

This project demonstrates how to build a Chrome extension with:
- **React popup** - Extension popup that opens when clicking the extension icon
- **React iframe overlay** - A React app that runs in an iframe injected into web pages
- **Vite build system** - Multiple entry points for different parts of the extension

## Project Structure

```
src/
├── popup/           # React app for extension popup
│   ├── App.tsx      # Main popup component
│   ├── index.tsx    # Popup entry point
│   └── popup.css    # Popup styles
├── iframe/          # React app for iframe overlay
│   ├── App.tsx      # Main iframe component  
│   ├── index.tsx    # Iframe entry point
│   └── iframe.css   # Iframe styles
├── content-script/  # Content script (injected into web pages)
│   ├── index.ts     # Content script entry point
│   └── overlay.ts   # Overlay management logic
└── shared/          # Shared types and utilities
    └── types.ts     # TypeScript interfaces
```

## How It Works

1. **Click Extension Icon** → Opens popup (React app #1)
2. **Click "Open Overlay" in popup** → Popup sends message to content script
3. **Content script** creates iframe and injects it into the current page
4. **Iframe loads React app #2** → Fully interactive React application
5. **Close overlay** → React app sends message back to content script to hide iframe

## Development

```bash
# Install dependencies
npm install

# Build for development (with watching)
npm run dev

# Build for production
npm run build
```

## Loading in Chrome

1. Run \`npm run build\`
2. Open Chrome and go to \`chrome://extensions/\`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the \`dist\` folder

## Testing

1. Click the extension icon in Chrome toolbar
2. Click "Open Overlay" button
3. Interact with the React iframe overlay
4. Use ESC key or close button to dismiss overlay

## Key Features Demonstrated

- ✅ Multiple React apps in one Chrome extension
- ✅ Message passing between popup, content script, and iframe
- ✅ Isolated React app environment in iframe
- ✅ TypeScript support throughout
- ✅ Modern Vite build configuration
- ✅ Hot reload during development
- ✅ CSS isolation and styling
