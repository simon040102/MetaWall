import axios from 'axios';
import { useState } from 'react';
import { ReactComponent as HomeMeta } from '../images/HomeMeta.svg';
import { ReactComponent as MetaWall } from '../images/MetaWall.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Login = (props) => {
  let navigate = useNavigate();
  const { setPage, page } = props;
  const [inform, setInform] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(false);
    setInform((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const Authorization = localStorage.getItem('MetaWall');
  const checkToken = () => {
    axios
      .get('https://rocky-bastion-75868.herokuapp.com/users/profile', {
        headers: { Authorization },
      })
      .then((res) => {
        navigate('/wall');
      })
      .catch((err) => {});
  };
  const handleClick = () => {
    axios
      .post('https://rocky-bastion-75868.herokuapp.com/users/sign_in', inform)
      .then((res) => {
        const token = 'Bearer ' + res.data.user.token;
        localStorage.setItem('MetaWall', token);
        navigate('/wall');
      })
      .catch((err) => {
        setError(true);
      });
  };

  const changePage = () => {
    setPage(!page);
  };
  useEffect(()=>{
    checkToken();
  },[])
  return (
    <div className="m-auto flex justify-center md:w-4/6 h-536 py-14 w-11/12   border-4 bg-primary  border-black shadow-[-8px_8px_0px_0px_rgba(0,0,0,0.3)]">
      <HomeMeta className="mx-10 hidden md:block" />
      <div className="mx-10 w-96">
        <MetaWall className="mb-4 mx-auto" />
        <h2 className=" text-2xl font-bold mb-9">到元宇宙展開全新社交圈</h2>
        <input
          onChange={handleChange}
          className="w-full h-12 mb-4 indent-6 border-4"
          type="mail"
          placeholder="Email"
          name="email"
          value={inform.email}
        />
        <br />
        <input
          onChange={handleChange}
          className="w-full h-12 mb-8 indent-6 border-4"
          type="password"
          placeholder="Password"
          name="password"
          value={inform.password}
        />
        {error && (
          <p className="mb-2 text-error">帳號或密碼錯誤，請重新輸入！</p>
        )}
        <input
          className=" bg-secondary cursor-pointer text-white w-full h-12 rounded-xl border-4 mb-4 border-black shadow-[-2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-success"
          type="submit"
          value="登入"
          onClick={handleClick}
        />
        <input
          className="cursor-pointer"
          type="button"
          value="註冊帳號"
          onClick={changePage}
        />
      </div>
    </div>
  );
};

export default Login;
