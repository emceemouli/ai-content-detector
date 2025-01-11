export default function Navigation() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              AI Detector
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-purple-600">Home</a>
            <a href="#about" className="text-gray-600 hover:text-purple-600">About</a>
            <a href="#contact" className="text-gray-600 hover:text-purple-600">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
}