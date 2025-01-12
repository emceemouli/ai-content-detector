import React from 'react';
import BaseModal from './BaseModal';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="About Us">
      <div className="prose max-w-none space-y-4">
        <section>
          <h3 className="text-lg font-semibold text-gray-800">What We Do</h3>
          <p className="text-gray-600">
            AI Content Detector is a free tool designed to help users identify AI-generated content
            using advanced pattern recognition and linguistic analysis. Our tool requires no registration
            and can analyze up to 3000 words instantly.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800">Our Technology</h3>
          <p className="text-gray-600">
            We use sophisticated algorithms to analyze text patterns, structural elements, and linguistic
            markers that are characteristic of AI-generated content. Our system provides detailed insights
            and confidence scores to help you make informed decisions.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800">Why Choose Us</h3>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Free to use - no registration required</li>
            <li>Instant analysis results</li>
            <li>Advanced pattern recognition</li>
            <li>Detailed findings report</li>
            <li>User-friendly interface</li>
          </ul>
        </section>
      </div>
    </BaseModal>
  );
};

export default AboutModal;