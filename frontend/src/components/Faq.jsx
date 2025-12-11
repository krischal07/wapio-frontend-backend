import ScrollFAQAccordion from "./ui/scroll-faqaccordion";

const faqData = [
  {
    id: 1,
    question: "What is WhatsApp Business API?",
    answer: "WhatsApp Business API is the official Meta solution that allows businesses to communicate with customers at scale through WhatsApp, with features like automated messages, chatbots, and multi-agent support."
  },
  {
    id: 2,
    question: "How much does it cost to send messages?",
    answer: "Service conversations (replies within 24 hours) are completely free. Marketing, utility, and authentication messages have separate charges based on Meta's pricing. Our Free Forever plan includes $1 in free conversation credits."
  },
  {
    id: 3,
    question: "Can I use my existing WhatsApp number?",
    answer: "You'll need to register a new business number with WhatsApp Business API. Your personal WhatsApp number cannot be converted, but we'll help you get verified quickly with our Free Blue Tick Application."
  },
  {
    id: 4,
    question: "How many messages can I send?",
    answer: "Message limits depend on your plan. Free plan allows testing, Basic plan supports 2400 messages/min, and Pro/Enterprise plans offer higher speeds. All plans include unlimited free service conversations."
  },
  {
    id: 5,
    question: "Do you offer integrations?",
    answer: "Yes! We integrate with Shopify, WooCommerce, Dialogflow, Google Sheets, and many more platforms. Check your plan for specific integrations included."
  },
  {
    id: 6,
    question: "What is the Free Forever plan?",
    answer: "Our Free Forever plan gives you permanent access to WhatsApp Business API with unlimited service conversations, free blue tick application, basic features, and $1 in conversation credits - completely free."
  },
  {
    id: 7,
    question: "Can I cancel anytime?",
    answer: "Absolutely! There are no long-term contracts. You can upgrade, downgrade, or cancel your subscription at any time. Your data remains accessible during your active subscription."
  },
  {
    id: 8,
    question: "How do I get the Blue Tick verification?",
    answer: "We provide free Blue Tick application assistance in all plans. Our team will guide you through Meta's verification process to get your business officially verified on WhatsApp."
  }
];

const Faq = () => {
  return (
    <section className="bg-white">
      <ScrollFAQAccordion data={faqData} />
    </section>
  );
};

export default Faq;
