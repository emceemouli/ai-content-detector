// components/modals/TermsModal.tsx
import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-purple-600">Terms of Service</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="prose max-w-none">
            {/* Add your terms of service content here */}
            <h3>Terms of Service</h3>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              By using our service, you agree to these terms. Please read them carefully.
            </p>
            {/* Add more sections as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;