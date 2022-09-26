import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Title from './Title';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ModifyProfile = () => {
  const Authorization = localStorage.getItem('MetaWall');
  const MySwal = withReactContent(Swal);
  const [imgData, setImgData] = useState(null);
  const [selectFile, SetSelectFile] = useState('');
  const [profile, setProfile] = useState({});
  const [error, setError] = useState('');
  const [photo, setPhoto] = useState(false);
  const [page, setPage] = useState(true);
  const [password, setPassword] = useState({ password: '', confirmPassword :''});
  const [passwordError, setPasswordError] = useState('');
  const getProfile = () => {
    axios
      .get('https://rocky-bastion-75868.herokuapp.com/users/profile', {
        headers: { Authorization },
      })
      .then((res) => {
        setProfile({
          name: res.data.user.name,
          photo: res.data.user.photo,
          sex: res.data.user.sex,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = async (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      SetSelectFile('');
      const formData = new FormData();
      formData.append('', e.target.files[0]);
      SetSelectFile(formData);
    }
  };

  const handleChangeProfile = (e) => {
    const { name, value } = e.target;
    setProfile((preState) => {
      return {
        ...preState,
        [name]: value,
      };
    });
  };
  const update = async () => {
    setError(null);
    console.log(imgData)
    if (imgData !== null) {
      let config = {
        method: 'post',
        url: 'https://rocky-bastion-75868.herokuapp.com/upload',
        headers: {
          Authorization,
        },
        data: selectFile,
      };

      await axios(config)
        .then((res) => {
          setProfile((preState) => {
            setPhoto(true);
            return {
              ...preState,
              photo: res.data.imgUrl,
            };
          });
        })
        .catch((err) => {
          setError(err.response.data.message);
          console.log(err);
        });
    }
     setPhoto(true);
  };

  const updateProfile = () => {
    axios
      .patch(
        'https://rocky-bastion-75868.herokuapp.com/users/profile',
        profile,
        {
          headers: { Authorization },
        }
      )
      .then((res) => {
        console.log(res);
        setPhoto(false);
        getProfile();
        Swal.fire('修改成功');
        setImgData(null);
      })
      .catch((err) => {
        console.log(err);
        setPhoto(false);
      });
  };

  const changePassword = (e) => {
    const { name, value } = e.target;
    setPassword((preState) => {
      return {
        ...preState,
        [name]: value,
      };
    });
  };
  const updatePassword = () => {
    setPasswordError('');
    if (password.password == '' || password.confirmPassword=="")return
      if (password.password.length < 8) {
        setPasswordError('密碼小於8個字元');
        return;
      }
    if (password.password !== password.confirmPassword) {
      setPasswordError('密碼不一致');
      return;
    }
    axios
      .post(
        'https://rocky-bastion-75868.herokuapp.com/users/updatePassword',
        password,
        {
          headers: { Authorization },
        }
      )
      .then((res) => {
        const token = 'Bearer ' + res.data.user.token;
        localStorage.setItem('MetaWall', token);
        Swal.fire('修改成功');
       setPassword({ password: '', confirmPassword: '' });
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getProfile();
    photo && updateProfile();
  }, [photo,password]);
  return (
    <div className=" ">
      <Title title="修改個人資料" />
      <div className="mt-4">
        <div className=" flex ml-4 -mb-0.5">
          <button
            className={`border-2 rounded-t-md w-24  h-10 ${
              page ? 'bg-black text-white border-black' : 'bg-white'
            }`}
            onClick={() => {
              setPage(true);
            }}
          >
            修改暱稱
          </button>
          <button
            className={`border-2 rounded-t-md w-24 h-10 ${
              !page ? 'bg-black text-white border-black' : 'bg-white'
            }`}
            onClick={() => {
              setPage(false);
            }}
          >
            重設密碼
          </button>
        </div>
        <div className="border-2 w-full py-8 rounded-md bg-white px-24">
          {page ? (
            <div>
              {' '}
              <img
                className="w-28 h-28  mx-auto  rounded-full border-2"
                src={imgData ? imgData : profile.photo}
                alt=""
              />
              <div className="flex w-full">
                <label
                  htmlFor="upload"
                  className="p-1 px-8 bg-black flex w-32 mt-4 mx-auto  text-white rounded cursor-pointer "
                >
                  <p>上傳圖片</p>
                </label>
                <input
                  type="file"
                  id="upload"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={handleChange}
                />
              </div>
              <p className="text-left mt-2">暱稱</p>
              <input
                type="text"
                className="border-2 w-full indent-4 h-12 "
                name="name"
                value={profile.name}
                onChange={handleChangeProfile}
              />
              <p className="text-left mt-2">性別</p>
              <div className="text-left">
                <input
                  type="radio"
                  name="sex"
                  value="male"
                  className="mr-2"
                  checked={profile.sex == 'male'}
                  onChange={handleChangeProfile}
                />
                男性
                <input
                  type="radio"
                  name="sex"
                  value="female"
                  className="mr-2 ml-5"
                  checked={profile.sex == 'female'}
                  onChange={handleChangeProfile}
                />
                女性
              </div>
              <p className="mt-4 text-error">{error}</p>
              <button
                className="bg-yellow100 w-7/12 shadow-[-2px_2px_0px_0px_rgba(0,0,0,1)] border-2 rounded-md h-12 mt-4  hover:bg-secondary hover:border-black hover:text-white"
                onClick={update}
              >
                送出更新
              </button>
            </div>
          ) : (
            <div>
              <p className="text-left">輸入新密碼</p>
              <input
                type="password"
                className="border-2 w-full h-12 indent-6"
                placeholder="請輸入新密碼"
                name="password"
                onChange={changePassword}
              />
              <p className="text-left mt-4">再次輸入</p>
              <input
                type="password"
                className="border-2 w-full h-12 indent-6"
                placeholder="再次輸入新密碼"
                name="confirmPassword"
                onChange={changePassword}
              />
              <p className="mt-4 text-error">{passwordError}</p>
              <button
                className="bg-gray text-white border-black md:w-7/12 w-full  border-2 rounded-md h-12 mt-8  hover:bg-secondary hover:border-black hover:text-white"
                onClick={updatePassword}
              >
                重設密碼
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ModifyProfile;
