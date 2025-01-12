import React, { useState } from 'react';
import { Mail, Clock, MapPin } from 'lucide-react';
import AboutModal from '../modals/AboutModal';
import ContactModal from '../modals/ContactModal';

const Footer: React.FC = () => {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <>
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-600">AI Content Detector</h3>
              <p className="text-gray-600">
                Free tool to detect AI-generated content with high accuracy. 
                No registration required. Analyze up to 3000 words instantly.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-800">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setShowAboutModal(true)}
                    className="text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-800">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-600">support@aidetector.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-600">Mon - Fri: 9:00 AM - 5:00 PM EST</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-600">New York, NY, USA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t mt-8 pt-8 text-center text-gray-600">
            <p>© {new Date().getFullYear()} AI Content Detector. Free tool - No registration required.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AboutModal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} />
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
    </>
  );
};

export default Footer;