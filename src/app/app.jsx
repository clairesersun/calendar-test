import React from "react";
import ReactDOM from "react-dom/client";
import App from "./page";
import reportWebVitals from "./reportWebVitals";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import "./globals.css";

const supabase = createClient(
  "https://rrtbbxvgdwlvvggrfhrx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJydGJieHZnZHdsdnZnZ3JmaHJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ3MTk5MzIsImV4cCI6MjAwMDI5NTkzMn0.jXqAaAWYJHdQytuPCkEJ66QCpozCufp4unniagikYKg"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App className={inter.className} />
    </SessionContextProvider>
  </React.StrictMode>
);

reportWebVitals();
