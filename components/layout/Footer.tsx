export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold">AI Detector</h3>
            <p className="text-gray-600 mt-2">
              Free tool to detect AI-generated content.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold">Quick Links</h4>
            <div className="mt-2 space-y-2">
              <a href="#" className="block text-gray-600 hover:text-purple-600">Home</a>
              <a href="#about" className="block text-gray-600 hover:text-purple-600">About</a>
              <a href="#contact" className="block text-gray-600 hover:text-purple-600">Contact</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Contact</h4>
            <p className="text-gray-600 mt-2">
              Questions? Contact us at support@aidetector.com
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} AI Detector. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}