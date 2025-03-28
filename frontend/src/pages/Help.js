import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Header from "../components/Header"; // Import Header Component

const faqs = [
  { question: "How can I check soil quality?", answer: "You can use our AI tool to analyze soil samples and get detailed recommendations." },
  { question: "What crops are best for my region?", answer: "Our AI-powered recommendation system suggests the best crops based on weather, soil, and market trends." },
  { question: "How do I apply for government farming schemes?", answer: "Visit the government portal or check our chatbot for scheme eligibility and application details." },
  { question: "How can I prevent pest infestations?", answer: "Regularly monitor crops, use organic pesticides, and follow crop rotation methods." },
  { question: "What irrigation methods are best for small farms?", answer: "Drip irrigation and sprinkler systems are effective for conserving water while maintaining crop health." },
  { question: "Where can I get high-quality seeds?", answer: "Check with certified agricultural suppliers or government-approved seed banks for quality seeds." }
];

const testimonials = [
  { name: "Rajesh Kumar", feedback: "The AI-powered farming tool helped me choose the right crops and increased my yield!" },
  { name: "Suman Patel", feedback: "I love how easy it is to get accurate soil analysis reports using this platform." },
  { name: "Amit Verma", feedback: "The FAQs and farming tips have been a game changer for my farm!" }
];

export default function HelpSupport() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Include Header */}
      <Header activePage="Help" logoutUser={() => {}} /> {/* Pass activePage as 'News' */}
      <h1 className="text-3xl font-bold text-center text-green-700 mt-16">Help & Support</h1>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Frequently Asked Questions</h2>
        <div className="mt-4 space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <button className="flex justify-between items-center w-full text-left" onClick={() => toggleFAQ(index)}>
                <span className="font-medium text-gray-700">{faq.question}</span>
                {openFAQ === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openFAQ === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-3xl mx-auto mt-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800">What Our Farmers Say</h2>
        <div className="mt-4 space-y-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
              <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
              <p className="text-right font-semibold text-green-700">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="max-w-3xl mx-auto mt-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800">Contact Support</h2>
        <form className="mt-3">
          <input type="text" placeholder="Your Name" className="w-full p-2 border rounded-lg mb-2" />
          <input type="email" placeholder="Your Email" className="w-full p-2 border rounded-lg mb-2" />
          <textarea placeholder="Your Message" className="w-full p-2 border rounded-lg mb-2"></textarea>
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-lg">Send Message</button>
        </form>
        <div className="mt-4 text-center text-gray-700">
          <p><strong>Email:</strong> support@agriplatform.com</p>
          <p><strong>Contact No:</strong> +91 98765 43210</p>
        </div>
      </div>
    </div>
  );
}