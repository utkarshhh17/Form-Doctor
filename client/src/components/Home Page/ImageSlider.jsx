import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function ImageSlider(){
    const {user}=useAuthContext()
    const navigate=useNavigate();

    // useEffect(() => {
    //     if (!user) {
    //         navigate("/login")
    //     } 
    // }, []);

    const fallbackImages = [
        { url: "https://via.placeholder.com/800x400/ff7f7f/333333?text=Slide+1" },
        { url: "https://via.placeholder.com/800x400/7f7fff/333333?text=Slide+2" },
        { url: "https://via.placeholder.com/800x400/7f7fff/333333?text=Slide+3" },
    ];

    const [images, setImages] = useState(fallbackImages); 

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get("http://localhost:8081/images"); // Adjust the URL based on your backend
                if (response.data && response.data.length > 0) {
                    setImages(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch images, using fallback images", error);
            }
        };

        fetchImages();
    }, []);



    const [currentIndex, setCurrentIndex]=useState(0);

    

    const slideStyle={
        backgroundImage:`url(${images[currentIndex].url})`,
        backgroundPosition:"center",
        backgroundSize:"contain",
        backgroundRepeat:"no-repeat"

    }

    const leftArrowStyles={
        position:'relative',
        top:'42%',
        left:'3rem',
        cursor:'pointer',
        
        fontSize:'4rem',
        color:'white'
        
    }

    const rightArrowStyles={
        position:'relative',
        top:'42%',
        right:'3rem',
        cursor:'pointer',
        
        fontSize:'4rem',
        color:'white'
    }
    const goToPrev=()=>{
        const isFirstSlide=currentIndex===0

        const newIndex=isFirstSlide? images.length-1: currentIndex-1;
        setCurrentIndex(newIndex);
    }

    const goToNext=()=>{

        const isLastSlide=currentIndex===images.length-1;
        const newIndex=isLastSlide?0:currentIndex+1;
        setCurrentIndex(newIndex);

    }
    useEffect(()=>{

    })

    return (

        <div className="flex w-[60%] h-[58vh] mt-10">
            <div style={leftArrowStyles} onClick={goToPrev}>{'<'}</div>

            <div className="w-full border-[2px] border-gray-400" style={slideStyle}>
            
            </div>

            <div style={rightArrowStyles} onClick={goToNext}>{'>'}</div>
            


        </div>
    )

}