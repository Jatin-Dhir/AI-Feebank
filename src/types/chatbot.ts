export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

export interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
}

export interface ChatbotResponse {
  text: string;
  isPCTEInfo?: boolean;
  suggestions?: string[];
}