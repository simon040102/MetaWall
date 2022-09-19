import { Link } from 'react-router-dom';
import { ReactComponent as Like } from '../images/bx-like.svg';
import axios from 'axios';
import { useEffect } from 'react';
import Comments from './Comments';
import { useState } from 'react';
import Loading from './Loading';
const Posts = (props) => {
  const Authorization = localStorage.getItem('MetaWall');
  const {
    postId,
    user,
    comments,
    time,
    content,
    likes,
    profile,
    postImages,
    getData,
    postUserName,
    postUserPhoto,
  } = props;
  const [checkLike, setCheckLike] = useState(false);
  const [waitLoading,setWaitLoading]=useState(false)
  const [message,setMessage]=useState({
    comment:''
  })

  const [whoLike,setWhoLike]=useState(false)
//   const [likeArray,setLikeArray]=useState({})
  const userId = profile.userId;
  const date = new Date(time);
  const Comment = () => {
    return comments.map((item, index) => {
      return (
        <Comments
          comment={item.comment}
          userId={item.user._id}
          name={item.user.name}
          time={item.user.createdAt}
          user={user}
        />
      );
    });
  };
  //檢查有沒有按讚
  const checkLikeArray = (like) => {
   
    like.map((item) => {
      if (item == userId) {
        setCheckLike(true);
        return;
      }
    });
  };
  //輸入留言
  const handleChange=(e)=>{
    const {name,value}=e.target
    setMessage(preState=>{
       return{
        ...preState,
        [name]:value
       }
    })
  }

  //按下留言
  const handleMessage=()=>{
    if(message.comment=='')return
    setWaitLoading(true)
    axios.post(
      `https://rocky-bastion-75868.herokuapp.com/posts/${postId}/comment`,
      message,
      {
        headers: { Authorization },
      }
    ).then(res=>{
         getData();
         setMessage({
           comment: '',
         });
         setWaitLoading(false)
    }).catch(err=>{
    });
  }
  //按讚或取消讚
  const handleLike = () => {
    if (checkLike == false) {
      axios
        .post(
          `https://rocky-bastion-75868.herokuapp.com/posts/${postId}/likes`,
          {},
          {
            headers: { Authorization },
          }
        )
        .then((res) => {
          getData();
          setCheckLike(true);
        })
        .catch((err) => {
  
        });
      return;
    }
    if (checkLike == true) {
      axios
        .delete(
          `https://rocky-bastion-75868.herokuapp.com/posts/${postId}/likes`,
          { headers: { Authorization } }
        )
        .then((res) => {
          getData();
          setCheckLike(false);
        })
        .catch((err) => {

        });
      return;
    }
  };

  useEffect(() => {
    checkLikeArray(likes);
  }, [likes]);

  return (
    <div className="border-2 relative w-full p-6 mb-4 bg-white rounded-md border-black shadow-[0px_2px_0px_0px_rgba(0,0,0,1)]">
      <div>
        <Link
          to={userId == user ? `/wall/personal` : `/wall/${user}`}
          className="flex"
        >
          <img
            className="w-10 h-10   flex rounded-full border-2 mr-2"
            src={postUserPhoto}
            alt=""
          />
          <div className=" text-left">
            <h3 className=" font-bold">{postUserName}</h3>
            <p className="text-xs text-gray">{date.toLocaleString('zh-TW')}</p>
          </div>
        </Link>
      </div>
      <div className="mt-4 text-left">
        <p>{content}</p>
        {postImages !== '' && (
          <img className="mt-4 border-2 mx-auto rounded-md" src={postImages} alt="" />
        )}
        <button data-like={postId} className="mt-4" onClick={handleLike}>
          {checkLike ? (
            <p>收回讚</p>
          ) : (
            <Like className="-mb-1.5 w-6 h-6" fill="#03438D" />
          )}
        </button>
        <button
          className="ml-2 "
          onClick={() => {
            setWhoLike(true);
          }}
        >
          <p>{likes.length == 0 ? '成為第一個說讚的人' : likes.length}</p>
        </button>
        <div className="flex   mt-4 relative">
          <img
            className="w-10 h-10 -mt-1 flex rounded-full i border-2 mr-2"
            src={profile.photo}
            alt=""
          />
          <input
            type="text"
            placeholder="留言"
            name="comment"
            value={message.comment}
            className=" w-full mb-6 border-2 h-8 indent-2"
            onChange={handleChange}
          />
          <div className="flex px-2">
            <div>
              <button
                className=" absolute right-0 bg-secondary   text-white h-8 w-24 md:w-28 transform  hover:bg-yellow100 hover:text-black  hover:border-2"
                onClick={handleMessage}
              >
                留言
              </button>
            </div>
            {waitLoading && (
              <div className=" z-10  ">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
      <div>{Comment()}</div>
    </div>
  );
};

export default Posts;
