import { useEffect } from 'react';
import { useState } from 'react';
import Title from './Title';
import axios from 'axios';
import FollowList from './FollowList';

const Following = () => {
  const Authorization = localStorage.getItem('MetaWall');
  const [following, setFollowing] = useState([]);

  const getData = () => {
    axios
      .get(`https://rocky-bastion-75868.herokuapp.com/users/following`, {
        headers: { Authorization },
      })
      .then((res) => {
        setFollowing(res.data.following);
      })
      .catch((err) => {});
  };

  const getFollower = () => {
    return following.map((item) => {
      return <FollowList user={item.user} time={item.createdAt} />;
    });
  };
  useEffect(() => {
    getData();
    following.length !== 0 && getFollower();
  }, [following.length]);

  return (
    <div className=''>
      <Title title={'追蹤名單'} />
      <ul className="mt-4 "> {getFollower()}</ul>
    </div>
  );
};

export default Following;
