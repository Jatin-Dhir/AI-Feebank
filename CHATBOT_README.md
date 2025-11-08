# PCTE Chatbot Implementation

A production-ready chatbot integrated into the FeeBank student management system, specifically designed to provide information about PCTE (Punjab College of Technical Education).

## Features

### 🤖 AI-Powered Responses
- **Gemini API Integration**: Uses Google's Gemini AI for intelligent responses
- **Fallback System**: Works even without API key using predefined knowledge base
- **PCTE-Specific**: Specialized knowledge about PCTE college

### 💬 Chat Interface
- **Floating Chat Button**: Always accessible chat button in bottom-right corner
- **Minimize/Maximize**: Chat window can be minimized when not in use
- **Typing Indicators**: Shows when the bot is "thinking"
- **Message History**: Maintains conversation history during session
- **Responsive Design**: Works on all device sizes

### 🎨 Design Features
- **Theme Integration**: Matches the existing application theme
- **Smooth Animations**: Professional transitions and hover effects
- **Gradient Styling**: Uses the same gradient colors as the main app
- **Status Indicators**: Shows online status with animated pulse

## Setup Instructions

### 1. Get Gemini API Key (Free)
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure API Key
1. Open the `.env.local` file in the project root
2. Replace `your_gemini_api_key_here` with your actual API key:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Restart the Development Server
```bash
npm run dev
```

## Usage

### For Users
1. Click the chat button in the bottom-right corner
2. Type your question about PCTE
3. Press Enter or click the Send button
4. The bot will respond with relevant information

### Example Queries
- "What courses does PCTE offer?"
- "How can I apply for admission?"
- "What are the placement records?"
- "Tell me about the hostel facilities"
- "What is the contact information?"

## Knowledge Base

The chatbot has comprehensive information about:

### 📚 Academic Programs
- MBA (2 years) with 6 specializations
- BBA (3 years)
- BCA (3 years)
- B.Com Honors (3 years)

### 🏛️ College Information
- Established: 2004
- Location: Baddowal, Ludhiana, Punjab
- Affiliation: Punjab Technical University
- Campus: 5-acre lush green campus

### 🎯 Facilities
- Central library with 20,000+ books
- Computer labs with latest configuration
- Hostel facilities for boys and girls
- Sports facilities
- Transportation
- Wi-Fi enabled campus

### 💼 Placements
- Highest Package: 12 LPA
- Average Package: 4.5 LPA
- Top recruiters: ICICI Bank, Amazon, Wipro, TCS, etc.

## Technical Implementation

### File Structure
```
src/
├── components/
│   └── chatbot/
│       └── Chatbot.tsx          # Main chatbot component
├── services/
│   └── geminiService.ts         # Gemini API integration
├── data/
│   └── pcteKnowledgeBase.ts     # PCTE knowledge base
└── types/
    └── chatbot.ts               # TypeScript definitions
```

### Key Components

#### Chatbot.tsx
- Main chat interface component
- Handles user interactions
- Manages chat state
- Renders messages and input

#### geminiService.ts
- Gemini API integration
- Fallback responses when API is unavailable
- PCTE-specific query detection

#### pcteKnowledgeBase.ts
- Comprehensive PCTE information
- FAQ section
- Structured data for easy access

## Customization

### Adding New Knowledge
1. Update `pcteKnowledgeBase.ts` with new information
2. Add new FAQ entries if needed
3. Update the system prompt in `geminiService.ts`

### Styling Changes
1. Modify colors in `Chatbot.tsx`
2. Update gradient colors to match your theme
3. Adjust animations and transitions

### API Configuration
1. The chatbot works with or without API key
2. Without API key: Uses predefined knowledge base
3. With API key: Uses Gemini AI for more natural responses

## Troubleshooting

### API Issues
- Ensure your API key is correctly set in `.env.local`
- Check if you have exceeded the free tier limits
- The chatbot will automatically fall back to predefined responses

### Chat Not Visible
- Ensure the component is imported in `MainLayout.tsx`
- Check for any CSS conflicts
- Verify z-index values if other elements overlap

### Responses Not Working
- Check browser console for errors
- Verify the Gemini API key is valid
- Ensure internet connection for API calls

## Future Enhancements

### Planned Features
- [ ] Voice input/output support
- [ ] Multi-language support
- [ ] Chat history persistence
- [ ] File/document sharing
- [ ] Appointment booking
- [ ] Integration with college database

### Advanced Features
- [ ] Machine learning for better responses
- [ ] Sentiment analysis
- [ ] Chat analytics
- [ ] Proactive assistance
- [ ] Integration with WhatsApp/Telegram

## Support

For any issues or questions about the chatbot implementation:
1. Check the troubleshooting section above
2. Review the code comments
3. Test with different queries
4. Verify API configuration

## License

This chatbot implementation is part of the FeeBank Clone project and is for educational purposes.