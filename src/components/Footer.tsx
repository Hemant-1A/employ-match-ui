import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">DomestyX</h3>
            <p className="text-sm mb-4">
              Connecting skilled domestic workers with families who need reliable help. Building trust, one connection at a time.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* For Workers */}
          <div>
            <h4 className="text-white text-base font-semibold mb-4">For Workers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/worker/register" className="hover:text-primary transition-colors">
                  Create Worker Account
                </Link>
              </li>
              <li>
                <Link to="/worker/login" className="hover:text-primary transition-colors">
                  Worker Login
                </Link>
              </li>
              <li>
                <Link to="/worker/dashboard" className="hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/worker/profile" className="hover:text-primary transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="text-white text-base font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/employer/register" className="hover:text-primary transition-colors">
                  Create Employer Account
                </Link>
              </li>
              <li>
                <Link to="/employer/login" className="hover:text-primary transition-colors">
                  Employer Login
                </Link>
              </li>
              <li>
                <Link to="/employer/dashboard" className="hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/employer/post-job" className="hover:text-primary transition-colors">
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-base font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <Mail className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <a href="mailto:support@domestyx.com" className="hover:text-primary transition-colors">
                  support@domestyx.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <a href="tel:+911234567890" className="hover:text-primary transition-colors">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} DomestyX. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/help" className="hover:text-primary transition-colors">
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
