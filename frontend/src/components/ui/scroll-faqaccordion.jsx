import * as React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const defaultFAQData = [
  {
    id: 1,
    question: "What is WhatsApp Business API?",
    answer: "WhatsApp Business API is the official Meta solution that allows businesses to communicate with customers at scale through WhatsApp, with features like automated messages, chatbots, and multi-agent support."
  },
  {
    id: 2,
    question: "How do I get started?",
    answer: "Simply sign up for our Free Forever plan, verify your business, and you'll get instant access to WhatsApp Business API with your own verified business profile."
  },
  {
    id: 3,
    question: "What are Service Conversations?",
    answer: "Service conversations are free messages sent in response to user-initiated messages within a 24-hour window. All our plans include unlimited free service conversations."
  },
  {
    id: 4,
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes! You can upgrade or downgrade your plan anytime. Changes take effect immediately, and we'll prorate the billing accordingly."
  },
  {
    id: 5,
    question: "Do you provide customer support?",
    answer: "Absolutely! We offer support via email for all plans. Pro and Enterprise plans get priority support and dedicated account managers respectively."
  }
];

export default function ScrollFAQAccordion({
  data = defaultFAQData,
  className,
  questionClassName,
  answerClassName,
}) {
  const [openItem, setOpenItem] = React.useState(null);

  return (
    <div
      className={cn("max-w-4xl mx-auto text-center py-16 p-8", className)}
    >
      <h2 className="text-3xl font-bold mb-2 text-gray-900">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-600 mb-6">
        Find answers to common questions about our WhatsApp Business API platform.
      </p>

      <Accordion.Root 
        type="single" 
        collapsible 
        value={openItem || ""} 
        onValueChange={setOpenItem}
      >
        {data.map((item) => (
          <Accordion.Item value={item.id.toString()} key={item.id} className="mb-6">
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between gap-x-4 cursor-pointer hover:opacity-80 transition-opacity">
                <div
                  className={cn(
                    "relative flex items-center space-x-2 rounded-xl p-4 transition-colors w-full text-left",
                    openItem === item.id.toString()
                      ? "bg-green-100 text-green-900"
                      : "bg-gray-100",
                    questionClassName
                  )}
                >
                  {item.icon && (
                    <span
                      className={cn(
                        "absolute bottom-6",
                        item.iconPosition === "right" ? "right-0" : "left-0"
                      )}
                      style={{
                        transform: item.iconPosition === "right" ? "rotate(7deg)" : "rotate(-4deg)",
                      }}
                    >
                      {item.icon}
                    </span>
                  )}
                  <span className="font-medium text-base">{item.question}</span>
                </div>

                <span
                  className={cn(
                    "text-gray-600 shrink-0",
                    openItem === item.id.toString() && "text-green-600"
                  )}
                >
                  {openItem === item.id.toString() ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                </span>
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content asChild>
              <motion.div
                initial="collapsed"
                animate={openItem === item.id.toString() ? "open" : "collapsed"}
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="flex justify-end ml-7 mt-4 md:ml-16">
                  <div
                    className={cn(
                      "relative max-w-md rounded-2xl px-4 py-3 text-white bg-green-500 text-base",
                      answerClassName
                    )}
                  >
                    {item.answer}
                  </div>
                </div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
