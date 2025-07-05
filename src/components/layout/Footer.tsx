import React from "react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-500 text-sm text-center py-4 mt-8">
      <p>&copy; {year} Book Management. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
