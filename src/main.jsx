import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from "./context/AuthContextProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModelContextProvider } from "./context/ModelContextProvider";
import { OpenModalProvider } from "./context/OpenModalProvider";
import "./index.css";
import { TeamContextProvider } from "./context/TeamContextProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <TeamContextProvider>
        <ModelContextProvider>       
          <OpenModalProvider>
            <App />
            </OpenModalProvider>
        </ModelContextProvider>
        </TeamContextProvider>0
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
