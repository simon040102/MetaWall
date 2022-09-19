import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Comments = (props) => {
  const Authorization = localStorage.getItem('MetaWall');
  const { comment, userId, name, time,user } = props;
  const [photo, setPhoto] = useState('');
const date = new Date(time);
  const getPhoto = (id) => {
    axios
      .get(`https://rocky-bastion-75868.herokuapp.com/users/profile/${id}`, {
        headers: { Authorization },
      })
      .then(async (res) => {
        setPhoto(res.data.user.photo);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getPhoto(userId);
  }, [photo]);

  return (
    <div className=" bg-gray100 bg-opacity-30 p-4 mb-4 rounded-md">
      <div className="flex">
        <Link to={userId == user ? `/wall/personal` : `/wall/${userId}`}>
          <img
            className="w-8 h-8 rounded-full border-2 mr-2"
            src={photo}
            alt=""
          />
        </Link>
        <div className=" text-left">
            <Link to={userId == user ? `/wall/personal` : `/wall/${userId}`}>
          <p>{name}</p>
          <p className="text-xs text-gray">{date.toLocaleString('zh-TW')}</p>
           </Link>
          <p className=" text-left mt-2">{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Comments;
