import React from 'react';
import { X, Mail, Clock } from 'lucide-react';
import { ModalProps } from '../../types';

const BaseModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-purple-600">{title}</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="h-6 w-6" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export const AboutModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="About Us">
      <div className="prose max-w-none">
        <h3>What We Do</h3>
        <p>
          AI Content Detector is a free tool designed to help users identify AI-generated content
          using advanced pattern recognition and linguistic analysis. Our tool requires no registration
          and can analyze up to 3000 words instantly.
        </p>

        <h3>Our Technology</h3>
        <p>
          We use sophisticated algorithms to analyze text patterns, structural elements, and linguistic
          markers that are characteristic of AI-generated content. Our system provides detailed insights
          and confidence scores to help you make informed decisions.
        </p>

        <h3>Why Choose Us</h3>
        <ul>
          <li>Free to use - no registration required</li>
          <li>Instant analysis results</li>
          <li>Advanced pattern recognition</li>
          <li>Detailed findings report</li>
          <li>User-friendly interface</li>
        </ul>
      </div>
    </BaseModal>
  );
};

export const ContactModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Contact Us">
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <Mail className="h-6 w-6 text-purple-600 mt-1" />
          <div>
            <h3 className="font-semibold mb-1">Email Support</h3>
            <p>support@aidetector.com</p>
            <p className="text-sm text-gray-600">We typically respond within 24 hours</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="h-6 w-6 text-purple-600 mt-1" />
          <div>
            <h3 className="font-semibold mb-1">Operating Hours</h3>
            <p>Monday - Friday</p>
            <p>9:00 AM - 5:00 PM EST</p>
          </div>
        </div>

        <form className="mt-3 space-y-4">
          <div>
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <textarea
              placeholder="Your message"
              rows={4}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </BaseModal>
  );
};