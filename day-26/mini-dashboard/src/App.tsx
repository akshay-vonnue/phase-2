import "./App.css";
import { Route, Routes } from "react-router";
import MainContentLayout from "./Layouts/MainContentLayout";
import MainContent from "./components/MainContent/MainContent";
import IssuePage from "./pages/IssuePage";
import IssuesPage from "./pages/IssuesPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import ProjectsPage from "./pages/ProjectsPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  console.log("rendering app");

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route element={<MainContentLayout />}>
            <Route index element={<MainContent currentPage="Dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="issues" element={<IssuesPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="issues/:id" element={<IssuePage />} />
        <Route
          path="/login"
          element={
            // user.isLoggedIn ? <Navigate to="/" replace /> :
            <LoginPage />
          }
        />
      </Routes>
    </>
  );
}

export default App;
