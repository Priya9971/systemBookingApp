module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {},
      screens: {
        xs: "475px",  // Extra small screens (custom breakpoint)
        sm: "640px",  // Small devices (landscape phones)
        md: "768px",  // Medium devices (tablets)
        lg: "1024px", // Large devices (laptops/desktops)
        xl: "1280px", // Extra large screens (desktops)
        "2xl": "1536px" // 2x Extra large screens
      }
    },
    plugins: [],
  };
  
