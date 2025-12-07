import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../component'
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const HomeWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`;

const HeroSection = styled.section`
  padding: 120px 20px 80px;
  text-align: center;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  
  @media (max-width: 768px) {
    padding: 80px 20px 60px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: #000;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ContentSection = styled.div`
  padding: 80px 20px;
  max-width: 1400px;
  margin: 0 auto;
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 120px 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 24px;
  opacity: 0.2;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.75rem;
  color: #000;
  margin-bottom: 12px;
  font-weight: 600;
`;

const EmptyStateText = styled.p`
  font-size: 1.125rem;
  color: #666;
  line-height: 1.6;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  
  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 3px solid #f0f0f0;
    border-top-color: #000;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    setLoading(true);
    appwriteService.getPosts().then((response) => {
      if (response) setPosts(response.documents);
      setLoading(false);
    });
  }, []);

  return (
    <HomeWrapper>
      <HeroSection>
        <Container>
          <HeroTitle>Stories worth reading</HeroTitle>
          <HeroSubtitle>
            Discover perspectives, insights, and stories from writers on any topic.
          </HeroSubtitle>
        </Container>
      </HeroSection>

      <ContentSection>
        {loading ? (
          <LoadingSpinner />
        ) : posts.length > 0 ? (
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
        ) : (
          <EmptyState>
            <EmptyStateIcon>✍️</EmptyStateIcon>
            <EmptyStateTitle>No posts yet</EmptyStateTitle>
            <EmptyStateText>
              {authStatus 
                ? "Share your first story with the world."
                : "Sign in to start writing."}
            </EmptyStateText>
          </EmptyState>
        )}
      </ContentSection>
    </HomeWrapper>
  );
}

export default Home;
