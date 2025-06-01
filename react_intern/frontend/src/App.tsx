import { Provider } from "react-redux";
import store from "@app/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@app/queryClient";
import { BrowserRouter } from "react-router-dom";
import AuthRouter from "@router/authRouter";
import HomeRouter from "@router/homeRouter";
import { NotificationProvider } from "@components/notifiction/NotificationProvider";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { ThemeProvider } from "./config/theme-provider";
import { DarkModeButton } from "@/components/common/DarkModeButton";
import { AppRouterWrapper } from "./router/AppRouterWrapper";
function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <NotificationProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <DarkModeButton />
              <AppRouterWrapper />
            </ThemeProvider>
          </NotificationProvider>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
