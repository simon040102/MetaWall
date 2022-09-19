import { Link } from 'react-router-dom';
import { ReactComponent as Like } from '../images/bx-like.svg';
import { ReactComponent as Arrow } from '../images/arrow.svg';
import axios from 'axios';

const LikeList = (props) => {
  const Authorization = localStorage.getItem('MetaWall');
  const { postId, postUserId, postUserPhoto, postUserName, PostTime, getData,Id } =
    props;
  const date = new Date(PostTime);

  const unLike=()=>{
    axios
      .delete(
        `https://rocky-bastion-75868.herokuapp.com/posts/${postId}/likes`,
        { headers: { Authorization } }
      )
      .then((res) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <li className="border-2 w-full p-4 bg-white mb-4  flex shadow-[0px_3px_0px_0px_rgba(0,0,0,1)] rounded-md">
        <Link
          to={`/wall/${postUserId == Id ? 'personal' : postUserId}`}
          className="flex"
        >
          <img
            src={postUserPhoto}
            alt=""
            className="w-10 h-10 rounded-full border mr-4"
          />
        </Link>

        <div className="text-left w-full flex justify-between">
          <div>
            <Link to={`/wall/${postUserId}`} className="">
              <p className="font-bold">{postUserName}</p>
            </Link>
            <p className=" text-gra text-sm">
              發文時間：{date.toLocaleDateString('zh-TW')}
            </p>
          </div>
          <div className="flex">
            <button className="mr-11" onClick={unLike}>
              <Like fill="#03438D" className="w-6 h-6 mb-1 mx-auto" />
              <p className="text-sm font-semibold">取消</p>
            </button>
            <Link
              to={
                postUserId == Id
                  ? `/wall/personal/${postId}`
                  : `/wall/${postUserId}/${postId}`
              }
              className=""
            >
              <Arrow fill="#03438D" className="w-6 h-6 mb-1 mx-auto" />
              <p className="text-sm font-semibold">查看</p>
            </Link>
          </div>
        </div>
      </li>
    </div>
  );
};
export default LikeList;
