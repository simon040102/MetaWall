
const Title=(props)=>{
    const {title}=props

    return (
      <div className=" relative z-40">
        <div className="border-2 h-16 flex m-auto bg-white after:absolute after:border-2 after:w-full after:h-16  after:right-1 after:-bottom-1 after:bg-white after:-z-10">
          <p className=" m-auto  font-bold text-xl">{title}</p>
        </div>
      </div>
    );
}
export default Title