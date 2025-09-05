import { motion } from "framer-motion";

const TitleSection = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center gap-3 sm:gap-5 px-4 sm:px-0">
      {/* Title */}
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {title}
      </motion.h1>

      {/* Subtitle */}
      <motion.h2
        className="text-lg titleFont sm:text-2xl md:text-3xl font-semibold text-center text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {subtitle}
      </motion.h2>

      {/* Decorative Lines */}
      <div className="flex flex-row items-center gap-2  ">
        <motion.hr
          className="w-12 sm:w-20 border-2 rounded-full border-primary dark:border-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        <motion.hr
          className="w-12 sm:w-20 border-2 rounded-full border-primary dark:border-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        />
      </div>
    </div>
  );
};

export default TitleSection;
