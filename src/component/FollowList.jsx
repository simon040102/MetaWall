import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const FollowList = (props) => {
  const Authorization = localStorage.getItem('MetaWall');
  const { time, user } = props;
  const [profile, setProfile] = useState([]);
  const date = new Date(time);
  const now = new Date();
  const days = (now.getTime() - date.getTime()) / 1000 / 60 / 60 / 24;
  const getUser = () => {
    axios
      .get(`https://rocky-bastion-75868.herokuapp.com/users/profile/${user}`, {
        headers: { Authorization },
      })
      .then((res) => {
        setProfile({
          name: res.data.user.name,
          photo: res.data.user.photo,
        });
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <li className="border-2 w-full p-4 bg-white mb-4  flex shadow-[0px_3px_0px_0px_rgba(0,0,0,1)] rounded-md">
        <Link to={`/wall/${user}`} className="flex">
          <img
            src={profile.photo}
            alt=""
            className="w-10 h-10 rounded-full border mr-4"
          />
        </Link>

        <div className="text-left w-full">
          <Link to={`/wall/${user}`} className="">
            <p className="font-bold">{profile.name}</p>
          </Link>
          <div className="flex justify-between">
            <p className=" text-gray">
              追蹤時間：{date.toLocaleDateString('zh-TW')}
            </p>
            <p className=''>您已追蹤{days.toFixed(0)}天！</p>
          </div>
        </div>
      </li>
    </div>
  );
};

export default FollowList;
