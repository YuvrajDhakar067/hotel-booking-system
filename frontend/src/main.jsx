import React from "react";
import ReactDOM from "react-dom/client"; // Note the use of `react-dom/client`
import App from "./app"; // Ensure the `App` component is properly exported
import "./index.css"; // Add global styles if needed

// Create the root element
const root = ReactDOM.createRoot(document.getElementById("root")); // Ensure `root` matches your `index.html`

// Render the application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
