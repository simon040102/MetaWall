import axios from 'axios';
import { useState } from 'react';
import Loading from './Loading';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import Title from './Title';

const CreatePost = () => {
  const MySwal = withReactContent(Swal);
  let navigate = useNavigate();
  const Authorization = localStorage.getItem('MetaWall');
  const [selectFile, SetSelectFile] = useState('');
  const [image, setImage] = useState('');
  const [post, setPost] = useState({});
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const [uploadPost, setUploadPost] = useState(false);
  const handleMessage = (e) => {
    const { name, value } = e.target;
    setPost((preState) => {
      return {
        ...preState,
        [name]: value,
      };
    });
  };
  //選擇圖片
  const handleChange = async (e) => {
    SetSelectFile('');
    const formData = new FormData();
    formData.append('', e.target.files[0]);
    SetSelectFile(formData);
  };
  //上傳圖片
  const postFile = () => {
    setUploadPhoto(true);
    let config = {
      method: 'post',
      url: 'https://rocky-bastion-75868.herokuapp.com/upload/post',
      headers: {
        Authorization,
      },
      data: selectFile,
    };

    try {
      axios(config)
        .then((res) => {
          setUploadPhoto(false);
          SetSelectFile('');
          setImage(res.data.imgUrl);
          setPost((preState) => {
            return {
              ...preState,
              image: res.data.imgUrl,
            };
          });
        })
        .catch((err) => {
          console.log(err);
          setUploadPhoto(false);
        });
    } catch (error) {}
  };
  const updatePost = () => {
    setUploadPost(true);
    axios
      .post(`https://rocky-bastion-75868.herokuapp.com/posts/`, post, {
        headers: { Authorization },
      })
      .then((res) => {
         setUploadPost(false);
        Swal.fire('張貼成功')
        navigate('/wall');
      })
      .catch((err) => {});
  };
  return (
    <div className=" h-full ">
      <Title title='張貼動態'/>
      <div className="bg-white mt-4 border-2  rounded-md p-8 ">
        <p className="text-left">貼文內容</p>
        <textarea
          placeholder="請輸入貼文內容"
          cols="30"
          rows="10"
          className="border-2 w-full mb-4 h-40 p-2 text-start  focus:outline-none text-md resize-none"
          name="content"
          onChange={handleMessage}
          value={post.content}
        ></textarea>
        <br />
        <div className="flex w-full">
          <button
            className="p-1 px-8 bg-black flex w-36 mr-4  text-white rounded cursor-pointer "
            onClick={postFile}
          >
            <p>上傳圖片</p>
          </button>
          <input
            type="file"
            id="upload"
            className="bg-white"
            onChange={handleChange}
          />
        </div>
        {uploadPhoto && (
          <div className="flex justify-center -m-8 mt-1">
            <Loading />
          </div>
        )}

        {image && (
          <img src={image} className="mt-4 rounded-md border-2" alt="" />
        )}
        <div className=" relative">
          <button
            className="bg-gray200 w-7/12 border-2 rounded-md h-12 mt-8 hover:shadow-[-2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow100"
            onClick={updatePost}
          >
            送出貼文
            {uploadPost && (
              <div className=" absolute right-6 top-8">
                <Loading />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
