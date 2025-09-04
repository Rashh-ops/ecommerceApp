export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        <p className="text-sm">&copy; {new Date().getFullYear()} E-Commerce App. All rights reserved.</p>

        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="/about" className="hover:text-yellow-400">About</a>
          <a href="/contact" className="hover:text-yellow-400">Contact</a>
          <a href="/privacy" className="hover:text-yellow-400">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
