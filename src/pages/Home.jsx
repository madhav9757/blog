import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../component'
import styled from 'styled-components';

const HomeWrapper = styled.div`
  padding: 40px 20px 60px;  /* bottom padding for breathing room above footer */
  background: linear-gradient(to bottom, #f2f4f8, #ffffff);  /* lighter tone for light theme */
  display: flex;
  justify-content: center;
  width: 100%;
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
  gap: 32px;
  max-width: 1000px;
  width: 100%;
`;

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((response) => {
      if (response) setPosts(response.documents);
    });
  }, []);

  return (
    <HomeWrapper>
      <PostsGrid>
        {posts.map((post) => (
          <PostCard
            key={post.$id}
            $id={post.$id}
            title={post.title}
            featuredImage={post.featuredImage}
          />
        ))}
      </PostsGrid>
    </HomeWrapper>
  );
}

export default Home;
