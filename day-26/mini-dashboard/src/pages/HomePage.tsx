import Header from "../components/Header/Header";
import SideBar from "../components/SideBar/SideBar";
import { AuthContext } from "../utils/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function HomePage() {
  console.log(localStorage.getItem("user"));
  const user = JSON.parse(localStorage.getItem("user") as string);
  console.log(user);

  return (
    <div>
      <>
        <AuthContext.Provider value={user}>
          <div className="main-layout">
            <Header />
            <SideBar />
            <ProtectedRoute />
          </div>
        </AuthContext.Provider>
      </>
    </div>
  );
}

export default HomePage;
