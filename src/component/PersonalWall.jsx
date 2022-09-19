import { ReactComponent as Search } from '../images/bx-search.svg';
import Posts from './Posts';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const PersonalWall = () => {
  const Authorization = localStorage.getItem('MetaWall');
  const [profile, setProfile] = useState({});
  const { postId } = useParams();
  const [post, setPost] = useState([]);
  const getData = () => {
    axios
      .get('https://rocky-bastion-75868.herokuapp.com/users/profile', {
        headers: { Authorization },
      })
      .then((res) => {
        const id = res.data.user._id;
        setProfile({
          photo: res.data.user.photo,
          name: res.data.user.name,
          userId: res.data.user._id,
        });
        axios
          .get(`https://rocky-bastion-75868.herokuapp.com/posts/user/${id}`, {
            headers: { Authorization },
          })
          .then((res) => {
             const posts = res.data.posts.filter((item) => {
               return postId ? item._id == postId : item.user == id;
             });
               setPost(posts);
          });
      })
      .catch((err) => {});
  };
 console.log(post)
  const showPost = () => {
    return post.map((item, index) => {
      return (
        <Posts
          postImages={item.image}
          profile={profile}
          postId={item._id}
          user={item.user}
          comments={item.comments}
          time={item.createdAt}
          content={item.content}
          likes={item.likes}
          getData={getData}
          postUserName={profile.name}
          postUserPhoto={profile.photo}
        />
      );
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="">
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
      <div className="">
        {post.length > 0 ? (
          showPost()
        ) : (
          <div className="border-2 rounded-md bg-white w-full border-black shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="border-b-2 h-6">
              <ul className="flex mt-2 ml-2">
                <li className="h-4 w-4 mx-1 border-2 bg-red rounded-full"></li>
                <li className="h-4 w-4 mx-1 border-2 bg-yellow rounded-full"></li>
                <li className="h-4 w-4 mx-1 border-2 bg-green rounded-full"></li>
              </ul>
            </div>
            <div className="h-20 pt-6 text-gray">
              目前尚無動態，新增一則貼文吧！
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default PersonalWall;
