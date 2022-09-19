import  LoadingImg  from '../images/loading.png';

const Loading=()=>{
    return (
      <div>
        <img
          src={LoadingImg}
          alt=""
          className="w-16 -mt-2 ml-2 animate-[spin_3s_linear_infinite] "
        />
      </div>
    );
}
export default Loading