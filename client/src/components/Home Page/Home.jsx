import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom";
import ImageSlider from "./ImageSlider";

// import jwtDecode from "jwt-decode";
import Nav from "../Nav/Nav";

export default function Home(){
    const {user, dispatch}=useAuthContext()
    const navigate=useNavigate();

    // const isTokenExpired = (token) => {
    //     try {
    //         const decodedToken = jwtDecode(token);
    //         return Date.now() >= decodedToken.exp * 1000; // Check if token is expired
    //     } catch (error) {
    //         console.error("Invalid token:", error);
    //         return true; // Treat invalid token as expired
    //     }
    // };

    // const handleLogOut=()=>{
    //     localStorage.removeItem('doctor-user');
    //     dispatch({type:'LOGOUT'});
    //     navigate("/login")

    // }

    useEffect(() => {
        if (!user) {
            navigate("/login")
        } 
        // else {
        //     const token = localStorage.getItem("jwt");
        //     if (!token || isTokenExpired(token)) {
        //         console.log("Token expired or missing, logging out.");
        //         handleLogOut(); // Clear data and logout
               
        //     }
        // }
    }, []);

   

   


    
    const [errorMessage, setErrorMessage] = useState('');
   
    const [doctorInput, setDoctorInput]=useState({'Breed':'','Breed Grade':'','BCS':'','Cleft':'', 'Horn':'', 
    'Skin Coat':'', 'Teat Score':'', 'Udder Type':'', 'Worm Load':'', 'Wound':'', 'Disease':'',})
    


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDoctorInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form refresh on submit
        setErrorMessage('');
        
        for (let key in doctorInput) {
            if (!doctorInput[key]) {
                setErrorMessage(`Please fill in all the fields. Missing: ${key}`);
                return; // Prevent form submission if validation fails
            }
        }

        const bcsValue = parseFloat(doctorInput.BCS);
        if (isNaN(bcsValue) || bcsValue < 1 || bcsValue > 5 || (bcsValue % 0.25 !== 0)) {
            setErrorMessage('BCS must be a number between 1 and 5, and divisible by 0.25');
            return; // Prevent form submission if validation fails
        }
        console.log(doctorInput); // To check the form data in console

        // Send the data to the backend using axios
        // axios.post('http://localhost:8081/form', doctorInput)
        //     .then(response => {
        //         console.log('Form data submitted successfully:', response);

        //         setDoctorInput({
        //             Breed: '',
        //             'Breed Grade': '',
        //             BCS: '',
        //             Cleft: '',
        //             Horn: '',
        //             'Skin Coat': '',
        //             'Teat Score': '',
        //             'Udder Type': '',
        //             'Worm Load': '',
        //             Wound: '',
        //             Disease: ''
        //         });
        //     })
        //     .catch(error => {
        //         console.error('Error submitting form data:', error);
        //     });
    };
   
    useEffect(()=>{

    })

    return (
        <div className="flex flex-col">
            <Nav />
       
            <div className="flex w-full mt-10 overflow-y-hidden">
                
                <ImageSlider />

                <div className="flex flex-col w-[38%] p-4 pl-8 ml-3 h-[90vh] overflow-y-scroll border-gray border-[1px] ">
                    <div className="text-3xl self-center">Details</div>
                    {errorMessage && 
                        <div className="text-md self-center text-red-600">
                            {errorMessage}
                        </div>
                    }
                    <div className="text-2xl mt-10"> Breed</div>
                    <div className="flex flex-wrap border-gray border-b-[1px] pb-5">
                        <label className="text-lg cursor-pointer"><input type="radio" name="Breed" value="Option 1" checked={doctorInput["Breed"] === 'Option 1'} onChange={handleInputChange}  className=""/> Option 1</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Breed" value="Option 2" checked={doctorInput["Breed"] === 'Option 2'} onChange={handleInputChange}  className="ml-10"/> Option 2</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Breed" value="Option 3" checked={doctorInput["Breed"] === 'Option 3'} onChange={handleInputChange}  className="ml-10"/> Option 3</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Breed" value="Option 4" checked={doctorInput["Breed"] === 'Option 4'} onChange={handleInputChange}  className="ml-10"/> Option 4</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Breed" value="Option 5" checked={doctorInput["Breed"] === 'Option 5'} onChange={handleInputChange}  className="ml-10"/> Option 5</label>
                    </div>

                    <div className="text-2xl mt-10"> Breed Grade</div>
                    <div className="flex flex-wrap border-b-[1px] pb-5">
                        <label className="text-lg cursor-pointer"><input type="radio" name="Breed Grade" value="Option 1" checked={doctorInput["Breed Grade"] === 'Option 1'} onChange={handleInputChange} /> Option 1</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Breed Grade" value="Option 2" checked={doctorInput["Breed Grade"] === 'Option 2'} onChange={handleInputChange}  className="ml-10"/> Option 2</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Breed Grade" value="Option 3" checked={doctorInput["Breed Grade"] === 'Option 3'} onChange={handleInputChange}  className="ml-10"/> Option 3</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Breed Grade" value="Option 4" checked={doctorInput["Breed Grade"] === 'Option 4'} onChange={handleInputChange}  className="ml-10"/> Option 4</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Breed Grade" value="Option 5" checked={doctorInput["Breed Grade"] === 'Option 5'} onChange={handleInputChange}  className="ml-10"/> Option 5</label>
                    </div>

                    <div className="text-2xl mt-10"> BCS </div>
                    <p id="bcs-disclaimer">Range b/w 1-5, in 0.25 steps</p>
                    <div id="bcs">
                        <input type="text" name="BCS" value={doctorInput.BCS} onChange={handleInputChange} className="h-10 p-2 text-lg border-black-1 border-2 " placeholder="BCS" />
                        
                    </div>

                    <div className="text-2xl mt-10"> Cleft</div>
                    <div className="flex flex-wrap border-b-[1px] pb-5">
                        <label className="text-lg cursor-pointer"><input type="radio" name="Cleft" value="Option 1" checked={doctorInput["Cleft"] === 'Option 1'} onChange={handleInputChange}/> Option 1</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Cleft" value="Option 2" checked={doctorInput["Cleft"] === 'Option 2'} onChange={handleInputChange} className="ml-10"/> Option 2</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Cleft" value="Option 3" checked={doctorInput["Cleft"] === 'Option 3'} onChange={handleInputChange} className="ml-10"/> Option 3</label>
                    </div>

                    <div className="text-2xl mt-10"> Horn</div>
                    <div className="flex flex-wrap border-b-[1px] pb-5">
                        <label className="text-lg cursor-pointer"><input type="radio" name="Horn" value="Option 1" checked={doctorInput["Horn"] === 'Option 1'} onChange={handleInputChange}/> Option 1</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Horn" value="Option 2" checked={doctorInput["Horn"] === 'Option 2'} onChange={handleInputChange} className="ml-10"/> Option 2</label>
                    </div>

                    <div className="text-2xl mt-10"> Skin Coat</div>
                    <div className="flex flex-wrap border-b-[1px] pb-5">
                        <label className="text-lg cursor-pointer"><input type="radio" name="Skin Coat" value="Option 1" checked={doctorInput["Skin Coat"] === 'Option 1'} onChange={handleInputChange}/> Option 1</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Skin Coat" value="Option 2" checked={doctorInput["Skin Coat"] === 'Option 2'} onChange={handleInputChange} className="ml-10"/> Option 2</label>
                    </div>

                    <div className="text-2xl mt-10"> Teat Score</div>
                    <div className="flex flex-wrap border-b-[1px] pb-5">
                        <label className="text-lg cursor-pointer"><input type="radio" name="Teat Score" value="Option 1" checked={doctorInput["Teat Score"] === 'Option 1'} onChange={handleInputChange}/> Option 1</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Teat Score" value="Option 2" checked={doctorInput["Teat Score"] === 'Option 2'} onChange={handleInputChange} className="ml-10"/> Option 2</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Teat Score" value="Option 3" checked={doctorInput["Teat Score"] === 'Option 3'} onChange={handleInputChange} className="ml-10"/> Option 3</label>
                    </div>

                    <div className="text-2xl mt-10"> Udder Type</div>
                    <div className="flex flex-wrap border-b-[1px] pb-5">
                        <label className="text-lg cursor-pointer"><input type="radio" name="Udder Type" value="Option 1" checked={doctorInput["Udder Type"] === 'Option 1'} onChange={handleInputChange}/> Option 1</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Udder Type" value="Option 2" checked={doctorInput["Udder Type"] === 'Option 2'} onChange={handleInputChange} className="ml-10"/> Option 2</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Udder Type" value="Option 3" checked={doctorInput["Udder Type"] === 'Option 3'} onChange={handleInputChange} className="ml-10"/> Option 3</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Udder Type" value="Option 4" checked={doctorInput["Udder Type"] === 'Option 4'} onChange={handleInputChange} className="ml-10"/> Option 4</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Udder Type" value="Option 5" checked={doctorInput["Udder Type"] === 'Option 5'} onChange={handleInputChange} className="ml-10"/> Option 5</label>
                    </div>


                    <div className="text-2xl mt-10"> Worm Load</div>
                    <div className="flex flex-wrap border-b-[1px] pb-5">
                        <label className="text-lg cursor-pointer"><input type="radio" name="Worm Load" value="Option 1" checked={doctorInput["Worm Load"] === 'Option 1'} onChange={handleInputChange}/> Option 1</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Worm Load" value="Option 2" checked={doctorInput["Worm Load"] === 'Option 2'} onChange={handleInputChange} className="ml-10"/> Option 2</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Worm Load" value="Option 3" checked={doctorInput["Worm Load"] === 'Option 3'} onChange={handleInputChange} className="ml-10"/> Option 3</label>
                    </div>

                    <div className="text-2xl mt-10"> Wound</div>
                    <div className="flex flex-wrap border-b-[1px] pb-5">
                        <label className="text-lg cursor-pointer"><input type="radio" name="Wound" value="Option 1" checked={doctorInput["Wound"] === 'Option 1'} onChange={handleInputChange} /> Option 1</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Wound" value="Option 2" checked={doctorInput["Wound"] === 'Option 2'} onChange={handleInputChange}  className="ml-10"/> Option 2</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Wound" value="Option 3" checked={doctorInput["Wound"] === 'Option 3'} onChange={handleInputChange}  className="ml-10"/> Option 3</label>
                    </div>

                    <div className="text-2xl mt-10"> Disease</div>
                    <div className="flex flex-wrap border-b-[1px] pb-5">
                        <label className="text-lg cursor-pointer"><input type="radio" name="Disease" value="Option 1" checked={doctorInput["Disease"] === 'Option 1'} onChange={handleInputChange} /> Option 1</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Disease" value="Option 2" checked={doctorInput["Disease"] === 'Option 2'} onChange={handleInputChange} className="ml-10"/> Option 2</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Disease" value="Option 3" checked={doctorInput["Disease"] === 'Option 3'} onChange={handleInputChange} className="ml-10"/> Option 3</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Disease" value="Option 4" checked={doctorInput["Disease"] === 'Option 4'} onChange={handleInputChange} className="ml-10"/> Option 4</label>
                    </div>


        
        
                    <button onClick={handleSubmit} className="mt-10 p-2 text-xl w-40 rounded-lg shadow-lg hover:scale-105 bg-cyan-300 self-center">Submit</button>
                </div>
                
                


            </div>

        </div>
    )

}