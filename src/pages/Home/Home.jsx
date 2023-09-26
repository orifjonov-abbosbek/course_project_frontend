import React, { useEffect, useContext, useState } from "react";
import Header from "../../components/Header/Header";
import ThemeContext from "../../context/Theme";
import StarRating from "../../components/StarRating /StarRating"; // Import the StarRating component
import "./Home.scss";

const Home = () => {
  const [data, setData] = useState([]);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const fetchPostsWithRatings = async () => {
    try {
      const req = await fetch("https://jsonplaceholder.typicode.com/posts");
      const res = await req.json();

      const postsWithRatings = res.map((post) => ({
        ...post,
        rating: 0,
      }));

      setData(postsWithRatings);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPostsWithRatings();
  }, []);

  const handleRatingChange = (postId, newRating) => {
    const updatedData = data.map((post) =>
      post.id === postId ? { ...post, rating: newRating } : post
    );

    setData(updatedData);
  };

  return (
    <>
      <Header />

      <section className={darkMode ? "mainDark" : "main"}>
        <div className="container">
          <h2>Latest Reviews</h2>
          <hr className="hr" />
          <ul>
            {data?.map((post) => (
              <li key={post.id}>
                <div>
                  <img src="https://picsum.photos/400/300" alt="" />
                </div>
                <div>
                  <h3 className="post_title">{post.title}</h3>
                  <p>{post.body}</p>
                  <StarRating
                    rating={post.rating}
                    onRatingChange={(newRating) =>
                      handleRatingChange(post.id, newRating)
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Home;
