import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";
import "./FAQ.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What are your delivery hours?",
      answer:
        "We deliver 24/7 in select areas. Our standard delivery hours are 10:00 AM to 11:00 PM, but we offer late-night delivery in certain locations. Check your address during checkout to see available delivery times.",
    },
    {
      question: "How can I track my order?",
      answer:
        "You can track your order in real-time through your account dashboard. Go to 'My Orders' and click on your active order to see the delivery status, estimated arrival time, and driver location.",
    },
    {
      question: "What is your delivery fee?",
      answer:
        "Our delivery fee is ₹49 for orders under ₹500. For orders above ₹500, delivery is free. We also offer express delivery for an additional ₹30 if you need your pizza in under 30 minutes.",
    },
    {
      question: "Do you offer vegetarian options?",
      answer:
        "Yes! We have a wide variety of vegetarian pizzas including Margherita, Veggie Supreme, Mushroom Delight, and many more. You can also build your own custom pizza with vegetarian toppings.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "You can cancel your order within 5 minutes of placing it through your account dashboard. After that, please call our customer service at +1 (555) 123-4567 for assistance.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, digital wallets (PayPal, Apple Pay, Google Pay), and cash on delivery. All online payments are secure and encrypted.",
    },
    {
      question: "Do you have gluten-free options?",
      answer:
        "Yes, we offer gluten-free crust options for most of our pizzas. You can select this option when customizing your pizza. Please note that while we take precautions, we cannot guarantee a completely gluten-free environment.",
    },
    {
      question: "What if my pizza arrives cold or damaged?",
      answer:
        "If your pizza arrives cold, damaged, or not as ordered, please contact us immediately. We'll either replace your order or provide a full refund. Your satisfaction is our top priority.",
    },
    {
      question: "Do you offer catering for events?",
      answer:
        "Yes! We offer catering services for events, parties, and corporate functions. Please contact us at least 24 hours in advance for large orders. We can customize menus and provide special pricing for bulk orders.",
    },
    {
      question: "How do I become a loyalty member?",
      answer:
        "Sign up for an account and you'll automatically become a loyalty member. Earn points with every order and redeem them for discounts, free items, and exclusive offers. You can also refer friends to earn bonus points.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="container">
        <div className="faq-header">
          <FaQuestionCircle className="faq-icon" />
          <h1>Frequently Asked Questions</h1>
          <p>
            Find answers to common questions about our pizza delivery service
          </p>
        </div>

        <div className="faq-content">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${
                  openIndex === index ? "active" : ""
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <div
                className={`faq-answer ${openIndex === index ? "open" : ""}`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-footer">
          <h3>Still have questions?</h3>
          <p>
            Can't find what you're looking for? Contact our customer support
            team and we'll be happy to help!
          </p>
          <div className="contact-links">
            <a href="tel:+15551234567" className="contact-link">
              <span>📞</span> Call us: +1 (555) 123-4567
            </a>
            <a href="mailto:support@pizzadelivery.com" className="contact-link">
              <span>✉️</span> Email: support@pizzadelivery.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
