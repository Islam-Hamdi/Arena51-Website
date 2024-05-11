import React from "react";
import Image from "next/image";
import { HiOutlineLocationMarker } from "react-icons/hi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import "./carousel.css";

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div className={`slider-arrow-next`} onClick={onClick}>
            <MdKeyboardArrowRight size={25} />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div className={`slider-arrow-prev`} onClick={onClick}>
            <MdKeyboardArrowLeft size={25} />
        </div>
    );
}

const Carousel = () => {
    const data = [
        {
            img: "/slide1.webp",
            text: "Limited time offers on popular games!",
        },
        {
            img: "/slide2.webp",
            text: "Limited time offers on popular games!",
        },
        {
            img: "/slide3.webp",
            text: "Limited time offers on popular games!",
        },
    ];
    const settings = {
        dots: true,
        dotsClass: "slick-dots line-indicator",
        infinite: false,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true,
                },
            },
        ],
        customPaging: (i) => (
            <div className="index" style={{ marginTop: "2rem" }}>
                {i}
            </div>
        ),
    };
    return (
        <div style={{ marginTop: "20px" }}>
            <Slider {...settings}>
                {data.map((item, index) => (
                    <div key={index} className="course-card">
                        <div className="image-wrapper">
                            <Image
                                src={item.img}
                                alt=""
                                width={1080}
                                height={1080}
                                style={{ maxWidth: "800px", maxHeight: "400px" }}
                            />
                            <div style={{ marginTop: "-8rem", padding: "20px", textAlign: "left" }}>
                                <h3 className="card_text">
                                    {item.text}
                                </h3>
                                <button className="btnn">
                                    View Deals
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
