import React from "react";
import { FaShieldAlt, FaEye, FaLock, FaUserSecret } from "react-icons/fa";
import "./Privacy.css";

const Privacy = () => {
  return (
    <div className="privacy-page">
      <div className="container">
        <div className="privacy-header">
          <FaShieldAlt className="privacy-icon" />
          <h1>Privacy Policy</h1>
          <p>
            We value your privacy and are committed to protecting your personal
            information
          </p>
          <div className="last-updated">Last updated: January 15, 2024</div>
        </div>

        <div className="privacy-content">
          <section className="privacy-section">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when
              you create an account, place an order, or contact us for support.
              This may include:
            </p>
            <ul>
              <li>
                <strong>Personal Information:</strong> Name, email address,
                phone number, and delivery address
              </li>
              <li>
                <strong>Order Information:</strong> Order history, preferences,
                and payment details
              </li>
              <li>
                <strong>Account Information:</strong> Username, password, and
                profile settings
              </li>
              <li>
                <strong>Communication:</strong> Messages, feedback, and support
                requests
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send order confirmations and delivery updates</li>
              <li>Improve our services and develop new features</li>
              <li>
                Send promotional offers and newsletters (with your consent)
              </li>
              <li>Ensure the security and integrity of our platform</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except in the
              following circumstances:
            </p>
            <ul>
              <li>
                <strong>Service Providers:</strong> We may share information
                with trusted third-party service providers who assist us in
                operating our website, processing payments, and delivering
                orders
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose information
                if required by law or to protect our rights and safety
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger,
                acquisition, or sale of assets, your information may be
                transferred as part of the transaction
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction. These measures include:
            </p>
            <ul>
              <li>
                Encryption of sensitive data during transmission and storage
              </li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication procedures</li>
              <li>Employee training on data protection practices</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>5. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your
              experience on our website. These technologies help us:
            </p>
            <ul>
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Provide personalized content and recommendations</li>
              <li>Improve website performance and functionality</li>
            </ul>
            <p>
              You can control cookie settings through your browser preferences,
              though disabling certain cookies may affect website functionality.
            </p>
          </section>

          <section className="privacy-section">
            <h2>6. Your Rights and Choices</h2>
            <p>
              You have the following rights regarding your personal information:
            </p>
            <ul>
              <li>
                <strong>Access:</strong> Request a copy of the personal
                information we hold about you
              </li>
              <li>
                <strong>Correction:</strong> Update or correct inaccurate
                information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal
                information
              </li>
              <li>
                <strong>Portability:</strong> Request transfer of your data to
                another service
              </li>
              <li>
                <strong>Opt-out:</strong> Unsubscribe from marketing
                communications
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>7. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to
              provide our services, comply with legal obligations, resolve
              disputes, and enforce our agreements. When we no longer need your
              information, we will securely delete or anonymize it.
            </p>
          </section>

          <section className="privacy-section">
            <h2>8. Children's Privacy</h2>
            <p>
              Our service is not intended for children under 13 years of age. We
              do not knowingly collect personal information from children under
              13. If you are a parent or guardian and believe your child has
              provided us with personal information, please contact us
              immediately.
            </p>
          </section>

          <section className="privacy-section">
            <h2>9. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries
              other than your own. We ensure that such transfers comply with
              applicable data protection laws and implement appropriate
              safeguards to protect your information.
            </p>
          </section>

          <section className="privacy-section">
            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or applicable laws. We will notify you of
              any material changes by posting the updated policy on our website
              and updating the "Last updated" date.
            </p>
          </section>

          <section className="privacy-section">
            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <div className="contact-info">
              <p>
                <strong>Email:</strong> privacy@pizzadelivery.com
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p>
                <strong>Address:</strong> 123 Pizza Street, Food City, FC 12345
              </p>
              <p>
                <strong>Data Protection Officer:</strong> dpo@pizzadelivery.com
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
