import React from 'react'
import App from '../App'
import Hero from '../components/Hero'
import Features from '../components/Features'
import WhyWhatsapp from '../components/WhyWhatsapp'
import { Pricing } from '../components/Pricing'
import Faq from '../components/Faq'

const pricingPlans = [
  {
    name: "FREE FOREVER",
    price: "0",
    yearlyPrice: "0",
    period: "per month",
    features: [
      "Unlimited Free Service Conversations/month",
      "Free WhatsApp Business API",
      "Free Blue Tick Application",
      "$1 Free Conversation Credit",
      "Upload & Manage Contacts",
      "Create tags & attributes (Up to 10 Tags)",
      "Up to 5 Custom Attributes",
      "Create template messages",
      "Live Chat Dashboard",
    ],
    description: "Get Started with WhatsApp Business API",
    buttonText: "Start for FREE",
    href: "#",
    isPopular: false,
  },
  {
    name: "BASIC",
    price: "1500",
    yearlyPrice: "1200",
    period: "per month",
    features: [
      "All features in Free Plan",
      "1 Owner + 5 FREE Agents included",
      "Additional Agents at ₹1,600/month each",
      "Smart Audience Segregation",
      "Broadcasting & Retargeting",
      "Template Message APIs",
      "Multi-Agent Live Chat",
      "Agent Transfer & Manager Monitoring",
      "Marketplace Integrations",
      "2400 Messages/min",
      "Shopify & WooCommerce Integrations",
      "Dialogflow Chatbot Integration",
      "Shared Team Inbox",
      "Click-to-WhatsApp Ads Manager",
      "Unlimited Free Service Conversations",
    ],
    description: "Everything you need to get started with your business",
    buttonText: "Get Started",
    href: "#",
    isPopular: false,
  },
  {
    name: "PRO",
    price: "2500",
    yearlyPrice: "2000",
    period: "per month",
    features: [
      "All features in Basic Plan",
      "Up to 100 Tags",
      "Up to 20 Custom Attributes",
      "Campaign Scheduler",
      "Campaign Click Tracking",
      "Smart Agent Routing",
      "Campaign Budget Analytics",
      "Project APIs",
      "Custom Agent Rules",
      "Carousel Template Click Tracking",
      "CSV Campaign Scheduler",
      "Google Sheets integration",
      "Birthday automation message",
      "Unlimited Free Service Conversations",
    ],
    description: "Highly recommended plan to make the best use of Retargeting Campaigns",
    buttonText: "Get Started",
    href: "#",
    isPopular: true,
  },
  {
    name: "ENTERPRISE",
    price: "Custom",
    yearlyPrice: "Custom",
    period: "",
    features: [
      "All features in Pro Plan",
      "Recommended for 5 Lac+ Messages/month",
      "Unlimited Tags",
      "Unlimited Attributes",
      "Downloadable Reports",
      "Dedicated Account Manager",
      "Priority Customer Support",
      "Webhooks",
      "Higher Messaging Speed",
      "Unlimited Free Service Conversations",
    ],
    description: "Recommended for Brands with 5 Lac+ Users",
    buttonText: "Get Connected",
    href: "#",
    isPopular: false,
  },
];

const Home = () => {
  return (
    <div>
        <Hero/>
        <Features/>
        <WhyWhatsapp/>
        <Pricing 
          plans={pricingPlans}
          title="Simple, Transparent Pricing"
          description="Choose the plan that works for you. All plans include access to our WhatsApp Business API platform."
        />
        <Faq/>
    </div>
  )
}

export default Home