# FeeBank Clone - Student Management System

A comprehensive frontend prototype of the FeeBank student management and fee payment system, built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### Revolutionary Design Elements
- **21-Color Navigation System** - Unique numbered color-coded menu (1-21) for instant module recognition
- **Mobile-First Responsive Design** - Excellent mobile adaptation with collapsible sidebar
- **Real-Time Form Validation** - Advanced user feedback with ✓/✗ indicators
- **Comprehensive Student Lifecycle Management** - Complete academic journey coverage

### Implemented Modules
1. **Authentication System** - Secure login with form validation
2. **Student Dashboard** - Overview with profile, fee schedule, and notifications
3. **Class Timetable** - Interactive weekly calendar with class details
4. **Attendance Report** - Comprehensive tracking with subject-wise statistics
5. **Transactions** - Payment history with receipt downloads

### Technical Features
- **Modern Web Technologies** - Next.js 14, TypeScript, Tailwind CSS
- **Component-Based Architecture** - Reusable UI components
- **Responsive Design** - Mobile-first approach with breakpoints
- **Mock Data System** - Realistic data for all modules
- **Form Validation** - Real-time validation with visual feedback

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom color system
- **Icons**: Lucide React
- **State Management**: React Hooks and Context API
- **Form Validation**: Custom validation utilities

## 📁 Project Structure

```
feebank-clone/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── auth/            # Authentication pages
│   │   ├── dashboard/       # Dashboard and module pages
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Button, Card, Modal, etc.
│   │   └── layout/          # Sidebar, MainLayout
│   ├── constants/           # App constants and colors
│   ├── data/                # Mock data
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Helper functions
├── public/                  # Static assets
└── tailwind.config.ts       # Tailwind configuration
```

## 🎨 21-Color Navigation System

The FeeBank clone features a revolutionary 21-color navigation system where each module is assigned a unique color:

1. Dashboard - Blue
2. Class Time Table - Green
3. Lectures - Purple
4. Updates - Pink
5. Attendance Report - Orange
6. Attendance Undertaking - Yellow
7. Assignments - Gray
8. Subject Review - Red
9. Feedback - Blue-gray
10. CV - Brown
11. Placement Zone - Light Green
12. Hostel Leave - Dark Blue
13. Online Exam - Yellow-green
14. Certificates - Purple-pink
15. Parking - Teal
16. Transport Pass - Pink-purple
17. Attendance Undertaking 2 - Green-blue
18. Transactions - Orange-red
19. Duplicate IDCard - Green
20. Library - Blue-gray
21. Settings - Deep Purple

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/feebank-clone.git
cd feebank-clone
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Login Credentials
For demo purposes, any username and password combination will work.

## 📱 Responsive Design

The FeeBank clone is built with a mobile-first approach:

- **Mobile (< 768px)**: Collapsible sidebar with numbered color indicators
- **Tablet (768px - 1024px)**: Optimized layout with adjusted spacing
- **Desktop (> 1024px)**: Full sidebar with text labels and icons

## 🔧 Customization

### Adding New Modules

1. Update the `MENU_ITEMS` array in `src/constants/index.ts`
2. Create a new page in `src/app/dashboard/[module-name]/page.tsx`
3. Add mock data to `src/data/mockData.ts`
4. Update the navigation colors if needed

### Modifying Colors

The color scheme is defined in `src/constants/index.ts` and `tailwind.config.ts`. You can customize the 21-color navigation system by updating the `MENU_COLORS` object.

## 🤖 Chatbot Feature

The FeeBank Clone now includes an intelligent chatbot specifically designed for PCTE (Punjab College of Technical Education):

### Features
- **AI-Powered**: Uses Google's Gemini API for intelligent responses
- **PCTE-Specific Knowledge**: Comprehensive information about courses, admissions, placements, and facilities
- **Floating Interface**: Always accessible chat button with minimize/maximize options
- **Fallback System**: Works even without API key using predefined knowledge base
- **Responsive Design**: Optimized for all device sizes

### Setup
1. Get a free Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add the API key to `.env.local` file
3. Restart the development server

For detailed instructions, see [CHATBOT_README.md](./CHATBOT_README.md)

## 📋 Future Enhancements

- Complete implementation of all 21 modules
- Real-time notifications with WebSocket
- Advanced analytics dashboard
- File upload and download functionality
- Integration with payment gateways
- Multi-language support
- Voice input/output for chatbot
- Chat history persistence

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is for educational purposes only.

## 🙏 Acknowledgments

This is a frontend prototype inspired by the FeeBank student management system. The original system can be found at [https://feebank.in](https://feebank.in).
