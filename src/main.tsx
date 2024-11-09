import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ThemeProvider from "./components/ThemeProvider.tsx";
import { Provider } from "react-redux";
import store from "./redux/app/store.ts";
import { TooltipProvider } from "@radix-ui/react-tooltip";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
);
