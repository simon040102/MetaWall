import Title from './Title';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LikeList from './LikeList';

const Likes = () => {
  const Authorization = localStorage.getItem('MetaWall');
  const [likes,setLikes]=useState([])
  const [userId,setUserId]=useState('')

  const getData=()=>{
   axios
     .get(`https://rocky-bastion-75868.herokuapp.com/users/getLikeList`, {
       headers: { Authorization },
     })
     .then((res) => {
     setLikes(res.data.likeList)
     setUserId(res.data.UserId)
     })
     .catch((err) => {});
  }
  const  getLikers=()=>{
    return likes.map(item=>{
        return (
          <LikeList
            postId={item.id}
            postUserId={item.user._id}
            postUserPhoto={item.user.photo}
            postUserName={item.user.name}
            PostTime={item.createdAt}
            Id={userId}
            getData={getData}
          />
        );
    })
  }
  useEffect(()=>{getData()},[])
  return (
    <div>
      <Title className="" title={'我的按讚貼文'} />
      <ul className="mt-4"> {getLikers()}</ul>
    </div>
  );
};
export default Likes;
