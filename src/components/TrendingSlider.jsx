import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const TrendingSlider = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const api = await fetch(
        "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian"
      );
      const res = await api.json();
      setData(res.meals || []);
    };

    fetchData();
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 3 } }, // tablet
      { breakpoint: 768, settings: { slidesToShow: 2 } }, // small tablet
      { breakpoint: 576, settings: { slidesToShow: 1, arrows: false, centerMode: true, centerPadding: "0" } }, // mobile
    ],
  };

  return (
    <div className="trending-slider-wrap">
      <Slider {...settings}>
        {data.map((d) => (
          <Link to={`/${d.idMeal}`} key={d.idMeal} className="slide-link">
            <div className="slider2">
              <img src={d.strMealThumb} alt={d.strMeal} className="slider-img" />
              <h3 className="meal-title">{d.strMeal}</h3>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default TrendingSlider;
