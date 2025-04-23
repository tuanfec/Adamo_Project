import { Provider } from "react-redux";
import store from "@app/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@app/queryClient";
import { BrowserRouter } from "react-router-dom";
import AuthRouter from "@router/authRouter";
import HomeRouter from "@router/homeRouter";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AuthRouter />
          <HomeRouter />
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
