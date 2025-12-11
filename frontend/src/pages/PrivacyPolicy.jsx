import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-500 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-green-100">Last updated: December 11, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to wapio ("we," "our," or "us"). As a Meta Business Partner and authorized WhatsApp Business Solution Provider, 
              we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you use our WhatsApp bulk messaging platform 
              and related services.
            </p>
          </section>

          {/* Meta Partnership */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Partnership with Meta</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              wapio operates as an authorized Meta Business Partner and WhatsApp Business Solution Provider. This means:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>We comply with Meta's Platform Terms and Policies</li>
              <li>We adhere to WhatsApp Business API guidelines and terms of service</li>
              <li>We maintain the security standards required by Meta for handling user data</li>
              <li>We operate within the framework established by Meta for business messaging services</li>
            </ul>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            
            <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">Account Information</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Business name, email address, and contact information</li>
              <li>WhatsApp Business Account details</li>
              <li>Meta Business Manager account information</li>
              <li>Payment and billing information</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">Message Data</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Contact lists and phone numbers you upload for messaging campaigns</li>
              <li>Message templates and content you create</li>
              <li>Campaign performance data and analytics</li>
              <li>Message delivery status and read receipts</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">Technical Information</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Usage data and interaction with our platform</li>
              <li>API access logs and authentication data</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">We use the collected information for the following purposes:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>To provide and maintain our WhatsApp bulk messaging services</li>
              <li>To process and deliver your messaging campaigns</li>
              <li>To manage your account and provide customer support</li>
              <li>To comply with Meta and WhatsApp Business API requirements</li>
              <li>To improve our services and develop new features</li>
              <li>To send you service-related notifications and updates</li>
              <li>To detect, prevent, and address technical issues or fraudulent activities</li>
              <li>To comply with legal obligations and regulatory requirements</li>
            </ul>
          </section>

          {/* WhatsApp Business API Compliance */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">WhatsApp Business API Compliance</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              As a WhatsApp Business Solution Provider, we adhere to strict guidelines:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Opt-in Requirements:</strong> We require that all contacts have provided explicit opt-in consent before receiving messages</li>
              <li><strong>Message Templates:</strong> All marketing messages use pre-approved templates in compliance with WhatsApp policies</li>
              <li><strong>Data Handling:</strong> Message content is processed in accordance with Meta's data processing terms</li>
              <li><strong>Spam Prevention:</strong> We actively monitor and prevent spam or abusive messaging practices</li>
              <li><strong>Quality Rating:</strong> We maintain messaging quality standards as required by WhatsApp</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Sharing and Disclosure</h2>
            <p className="text-gray-600 leading-relaxed mb-4">We may share your information with:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Meta/WhatsApp:</strong> As required for the operation of WhatsApp Business API services</li>
              <li><strong>Service Providers:</strong> Third-party vendors who assist in our operations (hosting, analytics, payment processing)</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority</li>
              <li><strong>Business Transfers:</strong> In connection with any merger, acquisition, or sale of assets</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              We do not sell, rent, or trade your personal information to third parties for marketing purposes.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>End-to-end encryption for message transmission via WhatsApp</li>
              <li>Secure HTTPS connections for all data transfers</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Secure data storage with encryption at rest</li>
              <li>Compliance with Meta's security requirements for Business Partners</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
            <p className="text-gray-600 leading-relaxed">
              We retain your data for as long as necessary to provide our services and comply with legal obligations. 
              Campaign data and message logs are retained according to Meta's data retention policies and applicable laws. 
              You may request deletion of your data at any time, subject to our legal and contractual obligations.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate or incomplete data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict certain processing activities</li>
              <li>Data portability where applicable</li>
              <li>Withdraw consent for optional processing</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
          </section>

          {/* International Data Transfers */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">International Data Transfers</h2>
            <p className="text-gray-600 leading-relaxed">
              Your data may be transferred to and processed in countries other than your country of residence. 
              When we transfer data internationally, we ensure appropriate safeguards are in place in compliance 
              with applicable data protection laws and Meta's data transfer mechanisms.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
            <p className="text-gray-600 leading-relaxed">
              Our service integrates with Meta's WhatsApp Business Platform. Your use of WhatsApp messaging is also 
              subject to WhatsApp's Terms of Service and Privacy Policy. We encourage you to review Meta's privacy 
              practices at <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">WhatsApp Privacy Policy</a> and 
              <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline ml-1">Meta Privacy Policy</a>.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-600 leading-relaxed">
              Our services are intended for business use and are not directed to individuals under the age of 18. 
              We do not knowingly collect personal information from children. If you believe we have collected 
              information from a minor, please contact us immediately.
            </p>
          </section>

          {/* Updates to Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
              We will notify you of any material changes by posting the updated policy on our website and updating the 
              "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700"><strong>wapio</strong></p>
              <p className="text-gray-600">Email: privacy@wapio.com</p>
              <p className="text-gray-600">Website: www.wapio.com</p>
            </div>
          </section>

          {/* Meta Compliance Notice */}
          <section className="border-t pt-8 mt-8">
            <p className="text-sm text-gray-500 italic">
              wapio is an authorized Meta Business Partner and WhatsApp Business Solution Provider. 
              WhatsApp and Meta are trademarks of Meta Platforms, Inc. Our services are provided in accordance 
              with Meta's Platform Terms and WhatsApp Business Solution Provider Agreement.
            </p>
          </section>

        </div>
      </div>

      {/* Simple Footer */}
      <div className="bg-white border-t py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          © 2025 wapio. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
