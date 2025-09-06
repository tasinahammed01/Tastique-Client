import React from "react";
import TitleSection from "../../SharedComponents/TitleSection";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const chefs = [
  {
    name: "John Doe",
    role: "Head Chef",
    image: "https://i.ibb.co.com/99kJHnDb/Screenshot-654.png",
  },
  {
    name: "Jane Smith",
    role: "Pastry Chef",
    image: "https://i.ibb.co.com/LwJL09Y/Screenshot-655.png",
  },
  {
    name: "Michael Lee",
    role: "Sous Chef",
    image: "https://i.ibb.co.com/Fq8pZSBt/Screenshot-653.png",
  },
  {
    name: "Emily Clark",
    role: "Sushi Chef",
    image: "https://i.ibb.co.com/d8w0LCb/Screenshot-656.png",
  },
];

const OurChefs = () => {
  return (
    <section className="bg-accent py-20 px-6 lg:px-20 2xl:px-40">
      <TitleSection title="Our Chefs" subtitle="Meet Our Passionate Chefs" />

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
        {chefs.map((chef, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            {/* Chef Image */}
            <div className="relative h-[280px]">
              <img
                src={chef.image}
                alt={chef.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Chef Info */}
            <div className="p-6 flex flex-col items-center text-center gap-2">
              <h3 className="text-xl font-bold text-gray-900">{chef.name}</h3>
              <p className="text-gray-500 font-medium">{chef.role}</p>
              <p className="text-gray-400 text-sm mt-2">
                Passionate about crafting delicious dishes with love and
                precision.
              </p>

              {/* Social Icons */}
              <div className="flex gap-4 mt-4">
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurChefs;
