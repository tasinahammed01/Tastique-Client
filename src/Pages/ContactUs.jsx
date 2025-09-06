const ContactUs = () => {
  return (
    <section className="py-20 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold ">Contact Us</h2>
        <p className=" mt-2">
          Have a question or want to place an order? We’re here to help!
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-neutral shadow-xl rounded-2xl p-8">
          <h3 className="text-2xl font-semibold mb-6 text-primary">
            Send us a message
          </h3>
          <form className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:border-primary"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:border-primary"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:border-primary"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:border-primary"
            />
            <textarea
              placeholder="Message / Order Details"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:border-primary h-32"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Send Message
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            We usually respond within 24 hours.
          </p>
        </div>

        {/* Restaurant Info */}
        <div className="space-y-10">
          {/* Location */}
          <div>
            <h4 className="font-semibold text-lg ">Visit Us</h4>
            <p className="text-sm text-gray-600">
              Come and enjoy our delicious meals at our restaurant.
            </p>
            <p className="text-sm font-medium  mt-1">
              123 Food Street, Flavor Town, USA
            </p>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-semibold text-lg ">Opening Hours</h4>
            <p className="text-sm ">Mon - Fri: 10:00 AM - 10:00 PM</p>
            <p className="text-sm ">Sat - Sun: 9:00 AM - 11:00 PM</p>
          </div>

          {/* Order Online */}
          <div>
            <h4 className="font-semibold text-lg ">Order Online</h4>
            <p className="text-sm ">
              Place your order online for delivery or takeaway.
            </p>
            <a
              href="#"
              className="text-primary mt-1 inline-block text-sm font-medium hover:underline"
            >
              Order Now →
            </a>
          </div>

          {/* Email & Phone */}
          <div>
            <h4 className="font-semibold text-lg ">Contact</h4>
            <p className="text-sm ">Email us at:</p>
            <p className="text-sm font-medium  mt-1">
              contact@myrestaurant.com
            </p>
            <p className="text-sm  mt-2">Call us:</p>
            <p className="text-sm font-medium  mt-1">+1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
