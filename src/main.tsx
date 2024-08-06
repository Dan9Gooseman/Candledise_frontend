import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <RouterProvider router={router} />

  // {/* </React.StrictMode> */}
);
// https://i2.wp.com/colorpalette.org/wp-content/palette/candle_wax_lighting_colorpalette_jvfdc.jpg?q=100 color pallete
