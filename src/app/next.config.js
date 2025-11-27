// next.config.js
module.exports = {
  webpack(config, { dev }) {
    if (!dev) {
      // Disable source maps in production
      config.devtool = false;
    }
    return config;
  },
  images: {
    domains: ['placehold.co'], // Add this line
  },
};

  