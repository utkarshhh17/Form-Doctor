import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import axios from "axios";
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

  

    useEffect(() => {
        if (!user) {
            navigate("/login")
        } 
        else {
            fetchImages();
        }
    }, []);

    const fallbackImages = [
        { url: "https://via.placeholder.com/800x400/ff7f7f/333333?text=Slide+1" },
        { url: "https://via.placeholder.com/800x400/ff7f7f/333333?text=Slide+1" },
        { url: "https://via.placeholder.com/800x400/7f7fff/333333?text=Slide+3" },
    ];


    const [images, setImages] = useState(fallbackImages); 
    

   
    const fetchImages = async () => {

        if (!user) {
        console.error("No user or token found");
        return;
        }

        try {
            const response = await axios.get("http://localhost:8081/api/details", { headers: {"Authorization" : `Bearer ${user}`} });
           
            if (response.data) {
                const json=response.data
                console.log(response.data)
                setUserMediaDetailsId(json.userMediaDetailsId);

               setImages((prevImages) => [
                { url: json.imageS3Path },
                ...prevImages.slice(1),
            ]);

            // console.log("The images are: "+images[0]);
            }
        } catch (error) {
            console.error("Failed to fetch images, using fallback images", error);
        }
    };

    
    const [errorMessage, setErrorMessage] = useState('');
   

    const [doctorInput, setDoctorInput]=useState({'Type of Animal':'', 'Breed':'','Breed Grade':'','BCS':'','Cleft':'', 'Horn':'', 
    'Skin Coat':'', 'Teat Score':'', 'Udder Type':'', 'Worm Load':'', 'Wound':'', 'Disease':'',})
    
    const [userMediaDetailsId, setUserMediaDetailsId]=useState('');


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
        const data={userMediaDetailsId:userMediaDetailsId, reportData:`${doctorInput}`, doctorId:1}
        console.log(data)
        // Send the data to the backend using axios
        axios.post('http://localhost:8081/api/report', data, { headers: {"Authorization" : `Bearer ${user}`} })
            .then(response => {
                console.log('Form data submitted successfully:', response);

                setDoctorInput({
                    Breed: '',
                    'Breed Grade': '',
                    BCS: '',
                    Cleft: '',
                    Horn: '',
                    'Skin Coat': '',
                    'Teat Score': '',
                    'Udder Type': '',
                    'Worm Load': '',
                    Wound: '',
                    Disease: ''
                });

                fetchImages();
            })
            .catch(error => {
                console.error('Error submitting form data:', error);
            });
    };
   
    useEffect(()=>{

    })

    return (
        <div className="flex flex-col">
            <Nav />
       
            <div className="flex w-full mt-10 overflow-y-hidden">
                
                <ImageSlider images={images}/>

                <div className="flex flex-col w-[38%] p-4 pl-8 ml-3 h-[85vh] overflow-y-scroll border-gray border-[1px] ">
                    <div className="text-3xl self-center">Details</div>
                    {errorMessage && 
                        <div className="text-md self-center text-red-600">
                            {errorMessage}
                        </div>
                    }
                    <div className="text-2xl mt-10"> Type of Animal</div>
                    <div className="flex flex-wrap border-gray pb-5">
                        <label className="text-lg cursor-pointer"><input type="radio" name="Type of Animal" value="Cow" checked={doctorInput["Type of Animal"] === 'Cow'} onChange={handleInputChange}  className=""/>Cow </label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Type of Animal" value="Buffalo" checked={doctorInput["Type of Animal"] === 'Buffalo'} onChange={handleInputChange}  className="ml-10"/> Buffalo</label>
                    </div>

                    {doctorInput["Type of Animal"]==='Cow' &&
                    (
                        <div className="flex flex-wrap border-gray border-b-[1px] pb-5">
                            <div className="text-2xl self-center">Breed: </div>
                            <select className="h-10 ml-10 px-10 text-lg  border-[1px]" name="Breed" onChange={handleInputChange} value={doctorInput.Breed}>
                                <option value="" disabled>
                                    Select a Breed
                                </option>
                                <option value="Amrutmahal">Amrutmahal</option>
                                <option value="Deoni">Deoni</option>
                                <option value="Gir">Gir</option>
                                <option value="HF Crossbreed">HF Crossbreed</option>
                                <option value="Hallikar">Hallikar</option>
                                <option value="Jersey Crossbreed">Jersey Crossbreed</option>
                                <option value="Kankrej">Kankrej</option>
                                <option value="Malanad Gidda">Malanad Gidda</option>
                                <option value="Non Descript Breed">Non Descript Breed</option>
                                <option value="Red Sindhi">Red Sindhi</option>
                                <option value="Sahiwal">Sahiwal</option>
                            </select>
                        </div>
                    )}

                    {doctorInput["Type of Animal"]==='Buffalo' &&
                    (
                        <div className="flex flex-wrap border-gray border-b-[1px] pb-5">
                            <div className="text-2xl self-center">Breed: </div>
                            <select className="h-10 ml-10 px-10 text-lg  border-[1px]" name="Breed" onChange={handleInputChange} value={doctorInput.Breed}>
                                <option value="" disabled>
                                    Select a Breed
                                </option>
                                <option value="Banni">Banni</option>
                                <option value="Bhadavari">Bhadavari</option>
                                <option value="Jafarabadi">Jafarabadi</option>
                                <option value="Mehasana">Mehasana</option>
                                <option value="Murha">Murha</option>
                                <option value="ND">ND</option>
                                <option value="Nili Ravi">Nili Ravi</option>
                                <option value="Pandarapuri">Pandarapuri</option>
                                <option value="Surthi">Surthi</option>
                                <option value="Toda">Toda</option>
                            </select>
                        </div>
                    )}

                    <div className="text-2xl mt-10"> Breed Grade</div>
                    <div className="flex flex-wrap border-b-[1px] pb-5">
                        <label className="text-lg cursor-pointer"><input type="radio" name="Breed Grade" value="A1" checked={doctorInput["Breed Grade"] === 'A1'} onChange={handleInputChange} />A1</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Breed Grade" value="A2" checked={doctorInput["Breed Grade"] === 'A2'} onChange={handleInputChange}  className="ml-10"/> A2</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Breed Grade" value="A3" checked={doctorInput["Breed Grade"] === 'A3'} onChange={handleInputChange}  className="ml-10"/> A3</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Breed Grade" value="B" checked={doctorInput["Breed Grade"] === 'B'} onChange={handleInputChange}  className="ml-10"/> B</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Breed Grade" value="C" checked={doctorInput["Breed Grade"] === 'C'} onChange={handleInputChange}  className="ml-10"/> C</label>
                    </div>

                    <div className="text-2xl mt-10"> BCS </div>
                    <p id="bcs-disclaimer">Range b/w 1-5, in 0.25 steps</p>
                    <div id="bcs">
                        <input type="text" name="BCS" value={doctorInput.BCS} onChange={handleInputChange} className="h-10 p-2 text-lg border-black-1 border-2 " placeholder="BCS" />
                        
                    </div>

                    <div className="text-2xl mt-10"> Cleft</div>
                    <div className="flex flex-wrap border-b-[1px] pb-5">
                        <label className="text-lg cursor-pointer"><input type="radio" name="Cleft" value="Deep" checked={doctorInput["Cleft"] === 'Deep'} onChange={handleInputChange}/> Deep</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Cleft" value="Moderate" checked={doctorInput["Cleft"] === 'Moderate'} onChange={handleInputChange} className="ml-10"/> Moderate</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Cleft" value="Slightly" checked={doctorInput["Cleft"] === 'Slightly'} onChange={handleInputChange} className="ml-10"/> Slightly</label>
                    </div>

                    <div className="text-2xl mt-10"> Horn</div>
                    <div className="flex flex-wrap border-b-[1px] pb-5">
                        <label className="text-lg cursor-pointer"><input type="radio" name="Horn" value="Polled" checked={doctorInput["Horn"] === 'Polled'} onChange={handleInputChange}/> Polled</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Horn" value="Present" checked={doctorInput["Horn"] === 'Present'} onChange={handleInputChange} className="ml-10"/> Present</label>
                    </div>

                    <div className="text-2xl mt-10"> Skin Coat</div>
                    <div className="flex flex-wrap border-b-[1px] pb-5">
                        <label className="text-lg cursor-pointer"><input type="radio" name="Skin Coat" value="Moderately Rough" checked={doctorInput["Skin Coat"] === 'Moderately Rough'} onChange={handleInputChange}/> Moderately Rough</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Skin Coat" value="Rough" checked={doctorInput["Skin Coat"] === 'Rough'} onChange={handleInputChange} className="ml-10"/> Rough</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Skin Coat" value="Shiny" checked={doctorInput["Skin Coat"] === 'Shiny'} onChange={handleInputChange} className="ml-10"/> Shiny</label>
                    </div>

                    <div className="text-2xl mt-10"> Teat Score</div>
                    <div className="flex flex-wrap border-b-[1px] pb-5">
                        <label className="text-lg cursor-pointer"><input type="radio" name="Teat Score" value="1" checked={doctorInput["Teat Score"] === '1'} onChange={handleInputChange}/> 1</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Teat Score" value="3" checked={doctorInput["Teat Score"] === '3'} onChange={handleInputChange} className="ml-10"/> 3</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Teat Score" value="5" checked={doctorInput["Teat Score"] === '5'} onChange={handleInputChange} className="ml-10"/> 5</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Teat Score" value="7" checked={doctorInput["Teat Score"] === '7'} onChange={handleInputChange} className="ml-10"/> 7</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Teat Score" value="9" checked={doctorInput["Teat Score"] === '9'} onChange={handleInputChange} className="ml-10"/> 9</label>

                    </div>

                    <div className="text-2xl mt-10"> Udder Type</div>
                    <div className="flex flex-wrap border-b-[1px] pb-5">
                        <label className="text-lg cursor-pointer"><input type="radio" name="Udder Type" value="Balloon Shaped" checked={doctorInput["Udder Type"] === 'Balloon Shaped'} onChange={handleInputChange}/> Balloon Shaped</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Udder Type" value="Compact" checked={doctorInput["Udder Type"] === 'Compact'} onChange={handleInputChange} className="ml-10"/> Compact</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Udder Type" value="Moderately Pendulous" checked={doctorInput["Udder Type"] === 'Moderately Pendulous'} onChange={handleInputChange} className="ml-10"/> Moderately Pendulous</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Udder Type" value="Not Visible" checked={doctorInput["Udder Type"] === 'Not Visible'} onChange={handleInputChange} className="ml-10"/> Not Visible</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Udder Type" value="Pendulous" checked={doctorInput["Udder Type"] === 'Pendulous'} onChange={handleInputChange} className="ml-10"/> Pendulous</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Udder Type" value="Small Tight" checked={doctorInput["Udder Type"] === 'Small Tight'} onChange={handleInputChange} className="ml-10"/> Small Tight</label>

                    </div>


                    <div className="text-2xl mt-10"> Worm Load</div>
                    <div className="flex flex-wrap border-b-[1px] pb-5">
                        <label className="text-lg cursor-pointer"><input type="radio" name="Worm Load" value="Moderate" checked={doctorInput["Worm Load"] === 'Moderate'} onChange={handleInputChange}/>Moderate</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Worm Load" value="No" checked={doctorInput["Worm Load"] === 'No'} onChange={handleInputChange} className="ml-10"/> No</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Worm Load" value="Pot Belly Present" checked={doctorInput["Worm Load"] === 'Pot Belly Present'} onChange={handleInputChange} className="ml-10"/>Pot Belly Present</label>
                    </div>

                    <div className="text-2xl mt-10"> Wound</div>
                    <div className="flex flex-wrap border-b-[1px] pb-5">
                        <label className="text-lg cursor-pointer"><input type="radio" name="Wound" value="Dry" checked={doctorInput["Wound"] === 'Dry'} onChange={handleInputChange} /> Dry</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Wound" value="No" checked={doctorInput["Wound"] === 'No'} onChange={handleInputChange}  className="ml-10"/> No</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Wound" value="Ulcerated" checked={doctorInput["Wound"] === 'Ulcerated'} onChange={handleInputChange}  className="ml-10"/> Ulcerated</label>
                    </div>

                    {/* <div className="text-2xl mt-10"> Disease</div>
                    <div className="flex flex-wrap border-b-[1px] pb-5">
                        <label className="text-lg cursor-pointer"><input type="radio" name="Disease" value="Option 1" checked={doctorInput["Disease"] === 'Option 1'} onChange={handleInputChange} /> Option 1</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Disease" value="Option 2" checked={doctorInput["Disease"] === 'Option 2'} onChange={handleInputChange} className="ml-10"/> Option 2</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Disease" value="Option 3" checked={doctorInput["Disease"] === 'Option 3'} onChange={handleInputChange} className="ml-10"/> Option 3</label>
                        <label className="text-lg cursor-pointer"><input type="radio" name="Disease" value="Option 4" checked={doctorInput["Disease"] === 'Option 4'} onChange={handleInputChange} className="ml-10"/> Option 4</label>
                    </div> */}


        
        
                    <button onClick={handleSubmit} className="mt-10 p-2 text-xl w-40 rounded-lg shadow-lg hover:scale-105 bg-cyan-300 self-center">Submit</button>
                </div>
                
                


            </div>

        </div>
    )

}