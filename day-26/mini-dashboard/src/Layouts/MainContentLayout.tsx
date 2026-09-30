import { Outlet } from 'react-router';
import './MainContentLayout.css'

function MainContentLayout() {
    console.log(`main content layout`)
    return <div className="main-content-layout">
      <Outlet/>
  </div>;
}

export default MainContentLayout;
