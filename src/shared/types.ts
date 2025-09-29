export interface ExtensionMessage {
  action: 'SHOW_OVERLAY' | 'HIDE_OVERLAY';
}

export interface IframeMessage {
  type: 'CLOSE_OVERLAY' | 'OVERLAY_SHOWN';
}
