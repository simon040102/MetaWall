import { Routes, Route, Link, Outlet } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Header from './component/Header';
import WallHome from './component/WallHome';
import AllWall from './component/AllWall';
import Personal from './component/PersonalWall'
import CreatePost from './component/CreatePost';
import ModifyProfile from './component/ModifyProfile';
import IdWall from './component/IdWall';
import Following from './component/Following';
import Likes from './component/Likes';

function App() {
  return (
    <div className="App  h-screen sticky top-16 overflow-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wall" element={<Header />}>
          <Route path="" element={<WallHome />}>
            <Route index element={<AllWall />} />
            <Route path="personal" element={<Personal />} />
            <Route path="personal/:postId" element={<Personal />} />
            <Route path="create" element={<CreatePost />} />
            <Route path="modifyProfile" element={<ModifyProfile />} />
            <Route path=":Id/" element={<IdWall />} />
            <Route path=":Id/:postId" element={<IdWall />} />
            <Route path="personal/following" element={<Following />} />
            <Route path="personal/likes" element={<Likes />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
