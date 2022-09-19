import { ReactComponent as Search } from '../images/bx-search.svg';
import Posts from './Posts';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const IdWall = () => {
  const Authorization = localStorage.getItem('MetaWall');
  const [profile, setProfile] = useState({});
  const [post, setPost] = useState([]);
  const { Id, postId } = useParams();
  const [idPerson, setIdPerson] = useState({});
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const getData = () => {
    axios
      .get(`https://rocky-bastion-75868.herokuapp.com/users/profile/${Id}`, {
        headers: { Authorization },
      })
      .then((res) => {
        setIdPerson({
          photo: res.data.user.photo,
          name: res.data.user.name,
          id: res.data.user._id,
        });
        setFollowers(res.data.user.followers);
      })
      .catch((err) => {});

    axios
      .get(`https://rocky-bastion-75868.herokuapp.com/users/profile/`, {
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
            const posts = res.data.post.filter((item) => {
              return postId ? item._id == postId : item.user._id == Id;
            });
            setPost(posts);
          });
      })
      .catch((err) => {});
  };
  const showPost = () => {
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
          getData={getData}
          postUserName={item.user.name}
          postUserPhoto={item.user.photo}
        />
      );
    });
  };
  const checkFollow = () => {
    followers.forEach((item) => {
      if (item.user == profile.userId) {
        setFollowing(true);
        return;
      } else {
        setFollowing(false);
        return;
      }
    });
  };
  const handleFollow = () => {
    if (following == false) {
      axios
        .post(
          `https://rocky-bastion-75868.herokuapp.com/users/${Id}/follow`,
          {},
          {
            headers: { Authorization },
          }
        )
        .then((res) => {
          getData();
          checkFollow();
          setFollowing(true);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    if (following == true) {
      axios
        .delete(
          `https://rocky-bastion-75868.herokuapp.com/users/${Id}/unfollow`,
          {
            headers: { Authorization },
          }
        )
        .then((res) => {
          getData();
          checkFollow();
          setFollowing(false)
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
  };
  useEffect(() => {
    getData();
    checkFollow();
    JSON.stringify(profile) !== '{}' && followers.length !== 0 && checkFollow();
  }, [profile.id, followers.length]);
  return (
    <div className="">
      <div className=" relative z-40">
        <div className="border-2 h-20 flex m-auto rounded-md bg-white after:absolute after:border-2 after:w-full after:h-20 after:rounded-md  after:right-2 after:-bottom-2 after:bg-white after:-z-10">
          <img
            src={idPerson.photo}
            alt=""
            className="border-r-2 rounded-l-sm"
          />
          <div className="px-4 py-3 flex w-full justify-between">
            <div>
              <p className="font-bold text-left">{idPerson.name}</p>
              <p className="text-left">{followers.length} 人追蹤</p>
            </div>
            <div>
              <button
                className={` ${following ? 'bg-gray100' : 'bg-yellow100'} 
                  h-9 w-24 font-bold   shadow-[0px_2px_0px_0px_rgba(0,0,0,1)] border-2 rounded-md   hover:bg-secondary hover:border-black hover:text-white`}
                onClick={handleFollow}
              >
                {following ? '取消追蹤' : '追蹤'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mb-4 mt-4 ">
        <select name="" id="" className=" h-12 w-4/12 indent-6 border-2">
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
      <div className="">{showPost()}</div>
    </div>
  );
};

export default IdWall;
