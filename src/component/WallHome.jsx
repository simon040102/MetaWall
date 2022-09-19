import axios from 'axios';
import {  Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ReactComponent as Following } from '../images/bx-bell.svg';
import { ReactComponent as Like } from '../images/bx-like.svg';
import { ReactComponent as Home } from '../images/home.svg';
import { ReactComponent as Plus } from '../images/plus.svg';


const WallHome = () => {
    const Authorization = localStorage.getItem('MetaWall');
    const [profile, setProfile] = useState({});
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
        });
    };
     useEffect(() => {
       getData();
     }, []);
  return (
    <div className="mb-24 md:mb-0  mt-12 flex px-6 xl:px-40 mx-auto container pb-4">
      <div className="md:w-8/12 w-full relative">
        <div className=" border-4 w-full  fixed bottom-10 md:hidden   left-0 z-50  h-16 rounded-full bg-gray100 ">
          <ul className="mt-1 flex justify-center">
            <li className="">
              <Link to="/wall">
                <Home className="h-12 w-12 bg-white mx-3   border-2 rounded-full" />
              </Link>
            </li>
            <li className="">
              <Link to="/wall/personal/following" className="flex">
                <Following className="w-12 h-12  p-2.5 mx-3 rounded-full border-2 bg-white" />
              </Link>
            </li>
            <li className="">
              <Link to="/wall/personal/likes" className="flex">
                <Like className="w-12 h-12  p-2.5 mx-3 rounded-full border-2 bg-white" />
              </Link>
            </li>
            <li className="">
              <Link to="/wall/create" className="flex">
                <Plus
                  fill="white"
                  className="w-12 h-12  p-2.5 mx-3 rounded-full border-2 bg-secondary "
                />
              </Link>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>

      <div className="hidden md:block  md:w-4/12 ml-4 h-336 border-2 px-6  bg-white sticky top-28 z-40">
        <Link to="/wall/create">
          <p className=" text-white mb-8 bg-secondary mt-8 leading-10 py-1 border-2 rounded-md border-black shadow-[-2px_2px_0px_0px_rgba(0,0,0,1)]">
            張貼動態
          </p>
        </Link>
        <div className="flex ">
          <Link to="/wall/personal" className="flex">
            <img
              className="w-12 h-12 m-auto rounded-full border-2 mr-3"
              src={profile.photo}
              alt=""
            />
            <p className="font-bold mt-3">{profile.name}</p>
          </Link>
        </div>
        <div className="mt-5">
          <Link to="/wall/personal/following" className="flex">
            <Following className="w-12 h-12 mt-2 p-2.5 mr-3 rounded-full border-2 bg-water" />
            <p className="font-bold mt-4">追蹤名單</p>
          </Link>
        </div>
        <div className="mt-3">
          <Link to="/wall/personal/likes" className="flex">
            <Like className="w-12 h-12 mt-2 p-2.5 mr-3  rounded-full border-2 bg-water" />
            <p className="font-bold mt-5">我按讚的文章</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default WallHome;
