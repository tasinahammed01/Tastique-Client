import React, { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loading = ({ children }) => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  if (showLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <DotLottieReact
          src="https://lottie.host/93f69978-2502-428b-80d9-d6322b06627a/i73HQHUeSn.lottie"
          loop
          autoplay
          className="w-60 h-60"
        />
      </div>
    );
  }

  return <>{children}</>; // show your app after 3s
};

export default Loading;
