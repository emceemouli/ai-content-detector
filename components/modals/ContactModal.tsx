import React from 'react';
import BaseModal from './BaseModal';
import { Mail, Clock } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Contact Us">
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <Mail className="h-6 w-6 text-purple-600 mt-1" />
          <div>
            <h3 className="font-semibold mb-1">Email Support</h3>
            <p className="text-gray-600">support@aidetector.com</p>
            <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="h-6 w-6 text-purple-600 mt-1" />
          <div>
            <h3 className="font-semibold mb-1">Operating Hours</h3>
            <p className="text-gray-600">Monday - Friday</p>
            <p className="text-gray-600">9:00 AM - 5:00 PM EST</p>
          </div>
        </div>

        <form className="mt-6 space-y-4">
          <div>
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <textarea
              placeholder="Your message"
              rows={4}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </BaseModal>
  );
};

export default ContactModal;