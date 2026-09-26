import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import LoginPage from "./pages/LoginPage.tsx";
import MainContent from "./components/MainContent/MainContent.tsx";
import MainContentLayout from "./Layouts/MainContentLayout.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import IssuePage from "./pages/IssuePage.tsx";

const user = {
  name: "akshay",
  isLoggedIn: true,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route element={<MainContentLayout />}>
            <Route index element={<MainContent currentPage="Dashboard" />} />
            <Route
              path="dashboard"
              element={<MainContent currentPage="Dashboard" />}
            />
            <Route
              path="issues"
              element={<MainContent currentPage="Issues" />}
            >
            </Route>
            <Route
              path="projects"
              element={<MainContent currentPage="Projects" />}
            />
            <Route
              path="profile"
              element={<MainContent currentPage="Profile" />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="issues/:id" element={<IssuePage/> } />
        <Route
          path="/login"
          element={
            user.isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
