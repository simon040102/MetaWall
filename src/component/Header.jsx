import axios from 'axios';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/MetaWall_black.svg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [profile, setProfile] = useState({});
  const [member, setMember] = useState(false);
  let navigate = useNavigate();
  const Authorization = localStorage.getItem('MetaWall');
  const getData = () => {
    axios
      .get('https://rocky-bastion-75868.herokuapp.com/users/profile', {
        headers: { Authorization },
      })
      .then((res) => {
        setProfile({
          name: res.data.user.name,
          photo: res.data.user.photo,
        });
      })
      .catch((err) => {
        localStorage.removeItem('MetaWall');
         navigate('/');
      });
  };
  const handleClick = () => {
    setMember(!member);
  };

  const handleLongOut = () => {
    localStorage.removeItem('MetaWall');
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="h-16 flex  bg-white border-b-4 sticky top-0 z-50">
        <div className=" flex   container m-auto px-6  xl:px-40 justify-between">
          <div className=" my-auto">
            <Link to="/wall">
              <Logo />
            </Link>
          </div>
          <div className=" my-auto flex">
            <img
              className="w-8 h-8 m-auto rounded-full border-2 mr-2"
              src={profile.photo}
              alt=""
            />
            <div className="relative cursor-pointer" onClick={handleClick}>
              <h3 className="font-mono m-auto font-bold text-xl border-b-4">
                Member
              </h3>
              {member && (
                <ul className=" absolute w-48 z-50  leading-10 -left-20 mt-2   after:absolute after:border-2 after:w-48 after:h-32 after:left-2 after:-bottom-2 after:bg-white after:-z-10">
                  <li className=" bg-white hover:bg-primary border-y-2 border-x-2">
                    <Link to="/wall/personal">我的貼文牆</Link>
                  </li>
                  <li className=" bg-white hover:bg-primary border-x-2">
                    <Link to="/wall/modifyProfile">修改個人資料</Link>
                  </li>
                  <li className=" bg-white hover:bg-primary border-t-2 border-x-2 border-b-2">
                    <Link to="/" onClick={handleLongOut}>
                      登出
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Header;
