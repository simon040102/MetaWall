import axios from 'axios';
import { useEffect, useState,useCallback } from 'react';
import Posts from './Posts';
import { ReactComponent as Search } from '../images/bx-search.svg';

const AllWall = () => {
  const Authorization = localStorage.getItem('MetaWall');
  const [profile, setProfile] = useState({});
  const [post, setPost] = useState([]);
  const getData = () => {
    axios
      .get('https://rocky-bastion-75868.herokuapp.com/users/profile', {
        headers: { Authorization },
      })
      .then((res) => {
        setProfile({
          photo: res.data.user.photo,
          name: res.data.user.name,
          userId: res.data.user._id,
        });
        axios
          .get(`https://rocky-bastion-75868.herokuapp.com/posts`)
          .then((res) => {
            setPost(res.data.post);
          });
      })
      .catch((err) => {});
  };
  const showPost = () => {
    try {
      return post.map((item, index) => {
        return (
          <Posts
            postImages={item.image}
            profile={profile}
            postId={item._id}
            user={item.user._id}
            comments={item.comments}
            time={item.createdAt}
            content={item.content}
            likes={item.likes}
            postUserName={item.user.name}
            postUserPhoto={item.user.photo}
            getData={getData}
          />
        );
      });
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" ">
      {' '}
      <div className="flex mb-4 ">
        <select name="" id="" className=" h-12 w-4/12 indent-4 border-2">
          <option value="最新貼文">最新貼文</option>
        </select>
        <div className="w-8/12 mr-4  relative">
          <input
            type="text"
            placeholder="搜尋貼文"
            className=" w-full ml-4 indent-6 h-12 border-2"
          />
          <div className=" absolute -right-4  top-0">
            <button className="">
              <Search fill="white" className="h-12 w-12 p-3 bg-secondary " />
            </button>
          </div>
        </div>
      </div>
      {showPost()}
    </div>
  );
};

export default AllWall;
