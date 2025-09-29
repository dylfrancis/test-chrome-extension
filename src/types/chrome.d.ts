// Global Chrome API types
declare namespace chrome {
  namespace runtime {
    interface MessageSender {
      tab?: chrome.tabs.Tab;
      frameId?: number;
      id?: string;
      url?: string;
      tlsChannelId?: string;
    }

    const onMessage: {
      addListener(callback: (message: any, sender: MessageSender, sendResponse: (response?: any) => void) => void | boolean): void;
    }

    function getURL(path: string): string;
  }

  namespace tabs {
    interface Tab {
      id?: number;
      windowId: number;
      url?: string;
      title?: string;
      active: boolean;
    }

    function query(queryInfo: { active?: boolean; currentWindow?: boolean }): Promise<Tab[]>;
    function sendMessage(tabId: number, message: any): Promise<any>;
  }
}
