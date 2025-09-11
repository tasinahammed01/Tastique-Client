import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral  py-12 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <h2 className=" text-2xl font-bold mb-4">Foodie</h2>
          <p className="">
            Magical experience with every bite! Explore the best foods around
            you, delivered fresh and fast.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className=" text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className=" transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/menu" className=" transition-colors">
                Menu
              </a>
            </li>
            <li>
              <a href="/about" className=" transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className=" transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className=" text-xl font-semibold mb-4">Contact Us</h3>
          <p className="">123 Food Street, Flavor Town</p>
          <p className=" mt-1">Email: info@Tanjid.testique.com</p>
          <p className=" mt-1">Phone: +1 234 567 890</p>

          <div className="flex space-x-4 mt-4">
            <a
              href="#"
              className=" hover:text-white transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className=" er:text-white transition-colors"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className=" hover:text-white transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className=" hover:text-white transition-colors"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <hr className="mt-8" />

      {/* Bottom */}
      <div className=" border-t border-neutral pt-6 text-center  text-sm">
        &copy; {new Date().getFullYear()} Tanjid Ahammed. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
