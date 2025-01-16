
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white py-8 ">
      <div className="container mx-auto px-4">
        {/* Logo and Name */}
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
          <div className="flex items-center space-x-2">
            {/* Logo */}
            <div className="w-12 h-12  flex justify-center items-center">
              {/* Add an SVG or an icon */}
             <img src="/logo-web.webp" alt="logo" className="rounded-full" />
            </div>
            {/* Website Name */}
            <span className="text-2xl font-semibold">FitMe</span>
          </div>

          {/* Social Media Links */}
          <div>
          <h4 className="text-lg font-semibold mb-2">Social Links</h4>
          <div className="flex space-x-6 mt-4 sm:mt-0">
          
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#abc502] hover:text-gray-400 transition"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 text-[#abc502]   transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 text-[#abc502]  transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 text-[#abc502] transition"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-2">Address</h4>
            <p className="text-sm text-gray-400">
              123 FitMe Street, Fitness City, Health State, 12345
            </p>
          </div>

       
         

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Contact</h4>
            <p className="text-sm text-gray-400">Phone: +1 234 567 890</p>
            <p className="text-sm text-gray-400">Email: support@fitme.com</p>
          </div>
        </div>
       
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} FitMe. All rights reserved.
          </p>
        </div>
      
    </footer>
  );
}

export default Footer;
