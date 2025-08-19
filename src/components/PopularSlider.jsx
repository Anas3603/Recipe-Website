import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const PopularSlider = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const api = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s");
      const json = await api.json();
      setData(json.meals || []);
    };
    fetchData();
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2200,
    pauseOnHover: true,
    arrows: true,
    adaptiveHeight: true,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2, arrows: true } },   // tablet
      { breakpoint: 576, settings: { slidesToShow: 1, arrows: false, centerMode: true, centerPadding: "0" } }, // mobile
    ],
  };

  return (
    <div className="popular-slider-wrap">
      <Slider {...settings}>
        {data.map((d) => (
          <Link to={`/${d.idMeal}`} key={d.idMeal} className="slide-link">
            <div className="slider">
              <img src={d.strMealThumb} alt={d.strMeal} className="slider-img" />
              <h3 className="meal-title">{d.strMeal}</h3>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default PopularSlider;
