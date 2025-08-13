import React from "react";
import { FaGavel, FaShieldAlt, FaUserCheck } from "react-icons/fa";
import "./Terms.css";

const Terms = () => {
  return (
    <div className="terms-page">
      <div className="container">
        <div className="terms-header">
          <FaGavel className="terms-icon" />
          <h1>Terms & Conditions</h1>
          <p>
            Please read these terms and conditions carefully before using our
            service
          </p>
          <div className="last-updated">Last updated: January 15, 2024</div>
        </div>

        <div className="terms-content">
          <section className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Pizza Delivery App ("Service"), you
              accept and agree to be bound by the terms and provision of this
              agreement. If you do not agree to abide by the above, please do
              not use this service.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the
              materials (information or software) on Pizza Delivery App's
              website for personal, non-commercial transitory viewing only. This
              is the grant of a license, not a transfer of title, and under this
              license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>
                Use the materials for any commercial purpose or for any public
                display
              </li>
              <li>
                Attempt to reverse engineer any software contained on the
                website
              </li>
              <li>
                Remove any copyright or other proprietary notations from the
                materials
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>3. Ordering and Delivery</h2>
            <p>When placing an order through our Service, you agree to:</p>
            <ul>
              <li>Provide accurate and complete delivery information</li>
              <li>
                Be available at the delivery address during the estimated
                delivery time
              </li>
              <li>Pay the full amount including taxes and delivery fees</li>
              <li>Accept responsibility for any modifications to your order</li>
            </ul>
            <p>
              Delivery times are estimates and may vary based on location,
              weather, and order volume. We are not responsible for delays
              beyond our control.
            </p>
          </section>

          <section className="terms-section">
            <h2>4. Payment Terms</h2>
            <p>
              All payments must be made at the time of ordering. We accept
              various payment methods including credit cards, debit cards, and
              digital wallets. All transactions are secure and encrypted.
            </p>
            <p>
              Prices are subject to change without notice. Sales tax and
              delivery fees will be added to your order total as applicable.
            </p>
          </section>

          <section className="terms-section">
            <h2>5. Cancellation and Refunds</h2>
            <p>
              Orders can be cancelled within 5 minutes of placement through your
              account dashboard. After this time, please contact customer
              service for assistance.
            </p>
            <p>
              Refunds will be processed for orders that arrive damaged,
              incorrect, or significantly delayed. Refund processing may take
              3-5 business days.
            </p>
          </section>

          <section className="terms-section">
            <h2>6. Privacy Policy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy,
              which also governs your use of the Service, to understand our
              practices regarding the collection and use of your personal
              information.
            </p>
          </section>

          <section className="terms-section">
            <h2>7. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account information and password. You agree to accept
              responsibility for all activities that occur under your account.
            </p>
            <p>
              You must be at least 18 years old to create an account and place
              orders. If you are under 18, you may use our Service only with
              involvement of a parent or guardian.
            </p>
          </section>

          <section className="terms-section">
            <h2>8. Prohibited Uses</h2>
            <p>
              You may not use our Service for any unlawful purpose or to solicit
              others to perform unlawful acts. You may not use our Service to:
            </p>
            <ul>
              <li>Harass, abuse, or insult others</li>
              <li>Submit false or misleading information</li>
              <li>Upload viruses or malicious code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>9. Limitation of Liability</h2>
            <p>
              In no event shall Pizza Delivery App, nor its directors,
              employees, partners, agents, suppliers, or affiliates, be liable
              for any indirect, incidental, special, consequential, or punitive
              damages, including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from your use of
              the Service.
            </p>
          </section>

          <section className="terms-section">
            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will
              notify users of any material changes by posting the new terms on
              this page and updating the "Last updated" date.
            </p>
            <p>
              Your continued use of the Service after any changes constitutes
              acceptance of the new terms.
            </p>
          </section>

          <section className="terms-section">
            <h2>11. Contact Information</h2>
            <p>
              If you have any questions about these Terms & Conditions, please
              contact us at:
            </p>
            <div className="contact-info">
              <p>
                <strong>Email:</strong> legal@pizzadelivery.com
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p>
                <strong>Address:</strong> 123 Pizza Street, Food City, FC 12345
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
