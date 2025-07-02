import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Search from "../components/Search"

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/posts/")
      .then((response) => {
        setPosts(response.data.posts)
        setFilteredPosts(response.data.posts);
      })
      .catch((err) => console.error(err))
  }, [])

  // QUERY COMES FROM SEARCH COMPONENT
  const handleSearch = (query) => {
    // .trim() TO AVOID ADDITIONAL WHITESPACE
    if (query.trim() === "") {
      setFilteredPosts(posts); 
    } else {
      // MATCH A SINGLE LETTER OF THE POST NAME
      setFilteredPosts(posts.filter((post) => post.name.toLowerCase().includes(query.toLowerCase())));
    }
  };

  return (
    <div className="p-12 bg-green-400">
      <Search onSearch={handleSearch}/>

      <div className="grid grid-cols-3 gap-10">

        {
          filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => {
              const imageUrl = post._id ? `http://localhost:3000/api/posts/image/${post._id}` : null;

              return (
                <div key={index} className="p-6 bg-gray-500 rounded-md cursor-pointer hover:scale-101">
                  <h2>ID: {post._id}</h2>
                  <p>GIRL NAME: {post.name}</p>
                  <p>DESCRIPTION: {post.description}</p>
                  <p>CREATION DATE: {new Date(post.uploadTime).toLocaleString()}</p>

                  {
                    imageUrl && <img
                      src={imageUrl}
                      className="w-full h-96 rounded-lg mt-4 bg-contain bg-no-repeat"
                    />
                  }

                </div>
              );
            })
          ) : (
            <p>No posts available at the moment!</p>
          )
        }
      </div>
    </div>
  );




}

export default Home
