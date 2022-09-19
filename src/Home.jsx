
import { useState } from 'react';
import Login from './component/Longin';
import SingUp from './component/SingUp';
const Home=()=>{

    const [page,setPage]=useState(false)

    return (
      <div className="flex h-screen container mx-auto">
        {page ? (
          <SingUp setPage={setPage} page={page} />
        ) : (
          <Login setPage={setPage} page={page} />
        )}
      </div>
    );
}


export default Home