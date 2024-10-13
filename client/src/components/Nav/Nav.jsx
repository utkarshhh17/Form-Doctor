import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";
export default function Nav(){
    
    

    const {user, dispatch}=useAuthContext()
    const [showMenu, setShowMenu]=useState(false)
    const navigate=useNavigate();

    const handleClick=()=>{
      setShowMenu(!showMenu)
    }
    const handleLogOut=()=>{
        localStorage.removeItem('doctor-user');
        dispatch({type:'LOGOUT'});
        navigate("/login")

    }

    
    
    // const toggleLinks = () => {
    //   setShowLinks(!showLinks);
    // };

  
    return(
        <div className={`flex justify-between text-white bg-[#3c4439] py-5 `}>

            <div className="flex  small:text-3xl small:basis-1/4 justify-between ml-7 font-oswald text-4xl cursor-pointer"><Link to="/">Doctor Form</Link></div>
            
            
            <div className="flex justify-between mr-[5vw] font-open-sans text-[1.3vw] font-bold small:hidden">
                {/* <div className='mr-40 mt-1 text-[1.2vw]'><Link to="/products">Products</Link></div> */}
               
                <div>
                {user &&
                <div className='hover:bg-gray-300 cursor-pointer  py-2 px-2' onClick={handleLogOut}>Logout</div>
                 
                }

                {!user &&
                <div className=''>
                    <Link to='/login'><button className="transition h-10 flex items-center justify-center cursor-pointer hover:font-bold text-lg
                hover:bg-white px-2 duration-500 hover:shadow-md hover:text-black rounded-2xl" >
                    Login</button></Link>
                 
                
                 </div>
                }


                </div>



            </div>
            
            
            

        </div>
    )


}