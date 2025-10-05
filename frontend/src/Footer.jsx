import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Top Section */}
            <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Brand Section */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">MyBlog</h2>
                    <p className="text-gray-400">
                        Building modern blogs with simplicity, knowledge, and art.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="hover:text-white">Home</Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-white">About</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-white">Contact</Link>
                        </li>
                    </ul>
                </div>

                {/* Contact & Social */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
                    <p className="text-gray-400">Email: gopalchouhan0310@gmail.com</p>
                    <p className="text-gray-400">Phone: +91 626132xxxx</p>

                    <div className="flex space-x-4 mt-4">
                        <a href="#" className="hover:text-white"><FaFacebookF /></a>
                        <a href="#" className="hover:text-white"><FaTwitter /></a>
                        <a href="#" className="hover:text-white"><FaInstagram /></a>
                        <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-gray-800 py-4">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} MyBlog. All rights reserved.
                    </p>
                    <div className="mt-2 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white text-sm ml-4">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm ml-4">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
