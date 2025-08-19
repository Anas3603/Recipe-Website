import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import TrendingSlider from "./TrendingSlider";
import { useEffect, useState } from "react";

const RecipeId = () => {
  const { idMeal } = useParams();

  const [data, setData] = useState(null);
  const [active, setActive] = useState("ingredient");

  useEffect(() => {
    const fetchData = async () => {
      const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
      );
      const result = await api.json();
      setData(result.meals[0]);
    };

    fetchData();
  }, [idMeal]);

  // Function to extract ingredients dynamically
  const getIngredients = () => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = data[`strIngredient${i}`];
      const measure = data[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  };

  if (!data) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <>
      <Navbar />
      <div
        style={{
          width: "90%",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <h1>{data.strMeal}</h1>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            marginTop: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div className="img" style={{ flex: "1" }}>
            <img src={data.strMealThumb} alt="" style={{ width: "100%", maxWidth: "20rem", borderRadius: "10px" }} />
          </div>

          <div className="content" style={{ flex: "2" }}>
            <button className="btn" onClick={() => setActive("ingredient")}>
              Ingredient
            </button>
            <button className="btn" onClick={() => setActive("instruction")}>
              Instruction
            </button>

            {active === "ingredient" ? (
              <div>
                {getIngredients().map((item, index) => (
                  <div key={index} style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "5px 0" }}>
                    {item}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: "justify", fontSize: "1.1rem", lineHeight: "1.6" }}>
                {data.strInstructions}
              </p>
            )}
          </div>
        </div>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <TrendingSlider />
      </div>
    </>
  );
};

export default RecipeId;
