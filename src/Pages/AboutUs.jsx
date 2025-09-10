import { motion } from "framer-motion";
import { Link } from "react-router";

const AboutUs = () => {
  const stats = [
    {
      number: "5k+",
      title: "Happy Customers",
      desc: "We’ve served over 5,000 satisfied customers with delicious meals made from fresh ingredients.",
    },
    {
      number: "120+",
      title: "Menu Items",
      desc: "Our chefs create a diverse range of over 120 dishes, ensuring something for everyone’s taste.",
    },
    {
      number: "10+",
      title: "Years in Service",
      desc: "We’ve been cooking and serving with love for more than a decade, earning a loyal customer base.",
    },
  ];

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-12 ">
      {/* Team Section */}
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
        {/* Left Content */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Meet Our Talented <span className="text-primary">Chefs & Team</span>
          </h1>
          <p className=" text-sm sm:text-base md:text-lg leading-relaxed mb-6">
            Our chefs and staff bring passion, creativity, and love to every
            dish. From selecting fresh ingredients to plating meals beautifully,
            they ensure every dining experience is unforgettable.
          </p>
          <Link to="/">
            <motion.button
              className="w-full xl:w-auto cursor-pointer text-white bg-accent hover:bg-accent/90 px-15 py-3  rounded-full font-medium transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              Order Now
            </motion.button>
          </Link>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            className="w-full max-w-md md:max-w-xl  h-auto rounded-2xl object-cover"
            src="https://i.ibb.co.com/kVXm0nFS/Screenshot-665.png"
            alt="Restaurant Team"
          />
        </motion.div>
      </div>

      {/* Numbers Section */}
      <motion.div
        className="py-20 px-2 sm:px-6 md:px-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our Restaurant in Numbers
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-neutral p-6 sm:p-8 shadow-lg rounded-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl sm:text-4xl md:text-4xl font-bold text-primary">
                {stat.number}
              </h3>
              <p className="mt-4 text-lg font-medium">{stat.title}</p>
              <p className="mt-2 text-sm sm:text-base">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Newsletter Section */}
      <motion.div
        className="bg-accent text-white py-16 px-4 sm:px-8 md:px-12 rounded-2xl mx-0 md:mx-20 my-10"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Subscribe for Updates & Deals
          </motion.h2>
          <motion.p
            className="mb-8 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Get exclusive offers, menu updates, and special promotions directly
            to your inbox.
          </motion.p>

          <form className="flex flex-col md:flex-row justify-center items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email.."
              className="w-full md:w-96 px-4 py-3 text-gray-700 rounded-full outline-none border border-white bg-white placeholder-gray-400"
            />
            <Link to="/">
              <motion.button
                className="w-full xl:w-auto cursor-pointer text-white border border-white px-15 py-3  rounded-full font-medium transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                Subscribe
              </motion.button>
            </Link>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
