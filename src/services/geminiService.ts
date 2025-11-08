import { GoogleGenerativeAI } from '@google/generative-ai';
import { PCTE_KNOWLEDGE_BASE, PCTE_FAQ } from '@/data/pcteKnowledgeBase';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

// System prompt for PCTE assistant
const PCTE_SYSTEM_PROMPT = `
You are a helpful assistant for PCTE (Punjab College of Technical Education). Your role is to provide accurate information about PCTE and guide students.

Here's key information about PCTE:

COLLEGE OVERVIEW:
- Name: Punjab College of Technical Education (PCTE)
- Established: 2004
- Location: Baddowal, Ludhiana, Punjab, India
- Campus: 5-acre lush green campus
- Affiliation: Punjab Technical University (PTU), Jalandhar
- Approval: All India Council for Technical Education (AICTE)

PROGRAMS OFFERED:
1. MBA (2 years) - 180 seats
   - Specializations: Marketing, Finance, HR, IT, International Business, Business Analytics
   - Eligibility: Graduation with minimum 50% marks

2. BBA (3 years) - 120 seats
   - Eligibility: 10+2 with minimum 50% marks

3. BCA (3 years) - 60 seats
   - Eligibility: 10+2 with Mathematics

4. B.Com Honors (3 years) - 60 seats
   - Eligibility: 10+2 with Commerce

ADMISSION PROCESS:
- Based on merit and counseling
- Required documents: 10th/12th mark sheets, graduation certificates, character certificate, migration certificate
- Contact: +91-161-2824165, admissions@pcte.edu.in

FACILITIES:
- Well-equipped classrooms with projectors
- Computer labs with 120 systems
- Central library with 20,000+ books
- Seminar halls and conference rooms
- Sports facilities
- Cafeteria
- Transportation facility
- Hostel facility for boys and girls
- Wi-Fi enabled campus
- 24/7 power backup

PLACEMENTS:
- Highest Package: 12 LPA
- Average Package: 4.5 LPA
- Top Recruiters: ICICI Bank, HDFC Bank, Amazon, Flipkart, Wipro, Infosys, TCS, Reliance, Asian Paints

CONTACT:
- Address: Punjab College of Technical Education, Baddowal, Ludhiana - 141007, Punjab, India
- Phone: +91-161-2824165, +91-161-2824166
- Email: info@pcte.edu.in
- Website: www.pcte.edu.in

GUIDELINES:
1. Only provide information about PCTE and related topics
2. If asked about non-PCTE topics, politely redirect to PCTE-related information
3. Be helpful, friendly, and professional
4. Keep responses concise but informative
5. If you don't know something, admit it and suggest contacting the college directly
6. Always provide accurate information based on the knowledge above
`;

export class GeminiService {
  private model: any;

  constructor() {
    // Use gemini-pro for text generation
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  // Check if query is related to PCTE
  private isPCTERelated(query: string): boolean {
    const pcteKeywords = [
      'pcte', 'punjab college', 'admission', 'course', 'fee', 'placement',
      'faculty', 'library', 'hostel', 'campus', 'bba', 'mba', 'bca', 'bcom',
      'ludhiana', 'baddowal', 'college', 'university', 'ptu', 'technical education'
    ];
    
    const lowerQuery = query.toLowerCase();
    return pcteKeywords.some(keyword => lowerQuery.includes(keyword));
  }

  // Get response from Gemini API
  async getResponse(query: string): Promise<string> {
    try {
      // Check if API key is available
      if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        console.warn('Gemini API key not found, using fallback responses');
        return this.getFallbackResponse(query);
      }

      // Check if query is PCTE related
      if (!this.isPCTERelated(query)) {
        return "I'm specifically designed to help with information about PCTE (Punjab College of Technical Education). I can assist you with details about courses, admissions, facilities, placements, and more. Would you like to know something specific about PCTE?";
      }

      // Create the prompt with system context
      const prompt = `${PCTE_SYSTEM_PROMPT}\n\nUser Query: ${query}\n\nResponse:`;

      // Generate response
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return text.trim();
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return this.getFallbackResponse(query);
    }
  }

  // Fallback response when API is not available
  private getFallbackResponse(query: string): string {
    const lowerQuery = query.toLowerCase();
    
    // Check for direct FAQ matches
    const matchedFAQ = PCTE_FAQ.find(faq => 
      lowerQuery.includes(faq.question.toLowerCase().substring(0, 10))
    );
    
    if (matchedFAQ) {
      return matchedFAQ.answer;
    }
    
    // Check for course-related queries
    if (lowerQuery.includes('course') || lowerQuery.includes('program')) {
      if (lowerQuery.includes('mba')) {
        return `PCTE offers a 2-year MBA program with specializations in Marketing, Finance, HR, IT, International Business, and Business Analytics. The eligibility is graduation with minimum 50% marks and there are 180 seats available.`;
      } else if (lowerQuery.includes('bba')) {
        return `PCTE offers a 3-year BBA program with eligibility of 10+2 with minimum 50% marks. There are 120 seats available.`;
      } else if (lowerQuery.includes('bca')) {
        return `PCTE offers a 3-year BCA program with eligibility of 10+2 with Mathematics. There are 60 seats available.`;
      } else if (lowerQuery.includes('bcom')) {
        return `PCTE offers a 3-year B.Com (Honors) program with eligibility of 10+2 with Commerce. There are 60 seats available.`;
      } else {
        return `PCTE offers the following programs:\n• MBA (2 years)\n• BBA (3 years)\n• BCA (3 years)\n• B.Com Honors (3 years)\n\nWhich program would you like to know more about?`;
      }
    }
    
    // Check for admission-related queries
    if (lowerQuery.includes('admission') || lowerQuery.includes('apply')) {
      return `To apply for admission to PCTE:\n1. Visit the college website or admission office\n2. Fill out the application form\n3. Submit required documents (mark sheets, certificates, etc.)\n4. Admissions are based on merit and counseling\n\nFor more details, contact: +91-161-2824165 or admissions@pcte.edu.in`;
    }
    
    // Check for placement-related queries
    if (lowerQuery.includes('placement') || lowerQuery.includes('job') || lowerQuery.includes('package')) {
      return `PCTE has an excellent placement record:\n• Highest Package: 12 LPA\n• Average Package: 4.5 LPA\n• Top Recruiters: ICICI Bank, HDFC Bank, Amazon, Flipkart, Wipro, Infosys, TCS, and many more\n• Regular training sessions and mock interviews are conducted`;
    }
    
    // Check for facility-related queries
    if (lowerQuery.includes('facility') || lowerQuery.includes('library') || lowerQuery.includes('hostel')) {
      if (lowerQuery.includes('library')) {
        return `PCTE's central library has 20,000+ books, 100+ national and international journals, and access to various e-resources. It's open from 9:00 AM to 5:00 PM (Monday to Saturday).`;
      } else if (lowerQuery.includes('hostel')) {
        return `PCTE provides separate hostel facilities for both boys and girls with all necessary amenities including Wi-Fi, mess, and 24/7 security.`;
      } else {
        return `PCTE offers excellent facilities including well-equipped classrooms, computer labs, central library, seminar halls, sports facilities, cafeteria, transportation, and hostel facilities.`;
      }
    }
    
    // Check for contact/location queries
    if (lowerQuery.includes('contact') || lowerQuery.includes('address') || lowerQuery.includes('location')) {
      return `PCTE Contact Information:\n📍 Address: Punjab College of Technical Education, Baddowal, Ludhiana - 141007, Punjab, India\n📞 Phone: +91-161-2824165, +91-161-2824166\n📧 Email: info@pcte.edu.in\n🌐 Website: www.pcte.edu.in`;
    }
    
    // Default response
    return `I can help you with information about PCTE's courses, admissions, facilities, placements, and more. Could you please be more specific about what you'd like to know? You can also contact the college directly at +91-161-2824165 for more details.`;
  }
}

// Export singleton instance
export const geminiService = new GeminiService();