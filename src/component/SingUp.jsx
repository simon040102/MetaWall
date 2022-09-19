import { ReactComponent as HomeMeta } from '../images/HomeMeta.svg';
import { ReactComponent as MetaWall } from '../images/MetaWall.svg';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

const SingUp = (props) => {
  const MySwal = withReactContent(Swal);
   let navigate = useNavigate();
  const { setPage, page } = props;
  const [inform, setInform] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [checkInform, setCheckInform] = useState({});
  //輸入資訊
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInform((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  //按下註冊
  const handleClick = () => {
    setCheckInform({});
    const regex =
      /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (inform.name.length <= 1) {
      setCheckInform((prevState) => {
        return {
          ...prevState,
          name: { message: '暱稱至少 2 個字元以上' },
        };
      });
    }
    if (!regex.test(inform.email)) {
      setCheckInform((prevState) => {
        return {
          ...prevState,
          email: { message: 'Email格式不符合規則' },
        };
      });
    }
    if (inform.password.length < 8) {
      setCheckInform((prevState) => {
        return {
          ...prevState,
          password: { message: '密碼需至少 8 碼以上' },
        };
      });
    }
    if (inform.password !== inform.confirmPassword) {
      setCheckInform((prevState) => {
        return {
          ...prevState,
          confirmPassword: { message: '密碼不一致' },
        };
      });
    }
    if (JSON.stringify(checkInform) !== '{}') {
      return;
    }
    axios
      .post('https://rocky-bastion-75868.herokuapp.com/users/sign_up', inform)
      .then((res) => {
        console.log(res);
        const token = 'Bearer ' + res.data.user.token;
        localStorage.setItem('MetaWall', token);
        Swal.fire('註冊成功');
        navigate('/wall');
      })
      .catch((err) => {
        console.log(err);
        setCheckInform((prevState) => {
          return {
            ...prevState,
            email: { message: 'Email已被註冊' },
          };
        });
      });
  };
  //換頁
  const changePage = () => {
    setPage(!page);
  };
  return (
    <div className="m-auto flex justify-center md:w-4/6 w-11/12  py-14   border-4 bg-primary  border-black shadow-[-8px_8px_0px_0px_rgba(0,0,0,0.3)]">
      <HomeMeta className="mx-10  hidden md:block" />
      <div className="mx-10 w-96">
        <MetaWall className="mb-4 mx-auto" />
        <h2 className=" text-2xl font-bold mb-9">註冊</h2>
        <input
          onChange={handleChange}
          className="w-full h-12  indent-6 border-4"
          type="text"
          placeholder="暱稱"
          name="name"
          value={inform.name}
        />
        <br />
        <p className=" text-error -mb-2 text-left text-xs mb-2">
          {checkInform.name?.message}
        </p>
        <input
          onChange={handleChange}
          className="w-full h-12 mt-4  indent-6 border-4"
          type="mail"
          placeholder="Email"
          name="email"
          value={inform.email}
        />
        <p className=" text-error -mb-2 text-left text-xs mb-2">
          {checkInform.email?.message}
        </p>

        <input
          onChange={handleChange}
          className="w-full h-12 mt-4 indent-6 border-4"
          type="password"
          placeholder="Password"
          name="password"
          value={inform.password}
        />
        <p className=" text-error -mb-2 text-left text-xs mb-2">
          {checkInform.password?.message}
        </p>
        <input
          onChange={handleChange}
          className="w-full h-12 mt-4 indent-6 border-4"
          type="password"
          placeholder="confirmPassword"
          name="confirmPassword"
          value={inform.confirmPassword}
        />
        <p className=" text-error -mb-2 text-left text-xs mb-2">
          {checkInform.confirmPassword?.message}
        </p>
        <input
          className=" bg-secondary cursor-pointer mt-8 text-white w-full h-12 rounded-xl border-4 mb-4 border-black shadow-[-2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-success"
          type="submit"
          value="註冊"
          onClick={handleClick}
        />
        <input
          className="cursor-pointer"
          type="button"
          value="登入"
          onClick={changePage}
        />
      </div>
    </div>
  );
};

export default SingUp;
