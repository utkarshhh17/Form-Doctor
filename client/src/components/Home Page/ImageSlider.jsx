import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


export default function ImageSlider({images}){


    const [currentIndex, setCurrentIndex]=useState(0);

    useEffect(() => {
        console.log(images);
    }, []);

    const imgSliderImg={
        maxWidth:'90%'
    }

    const leftArrowStyles = {
        position: 'relative',
        top: '38%',
        left: '0rem',
        cursor: 'pointer',
        
        fontSize: '3rem',
        color: 'white',
        backgroundColor: 'black',
      
        height: '5rem',
        width: '3rem',  // Ensuring it's a square
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      
        lineHeight: '0', // Matches text height with the container
        boxSizing: 'border-box', // Ensures padding doesn’t affect size
        padding: '0', // Reset any extra padding
        textAlign: 'center',
        borderRadius: '10%', // Optional: Makes the background circular
      };

    const rightArrowStyles={
        position:'relative',
        top:'42%',
        right:'0rem',
        cursor:'pointer',
        
        fontSize: '3rem',
        color: 'white',
        backgroundColor: 'black',
      
        height: '5rem',
        width: '3rem',  // Ensuring it's a square
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      
        lineHeight: '0', // Matches text height with the container
        boxSizing: 'border-box', // Ensures padding doesn’t affect size
        padding: '0', // Reset any extra padding
        textAlign: 'center',
        borderRadius: '10%', // Optional: Makes the background circular
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

            <img src={images[currentIndex].url} width='auto' height='auto' style={imgSliderImg}/>
            <div style={rightArrowStyles} onClick={goToNext}>{'>'}</div>
            


        </div>
    )

}