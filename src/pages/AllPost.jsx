import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, PostCard } from '../component';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

const AllPostsWrapper = styled.div`
  min-height: 100vh;
  padding: 60px 20px 100px;
  background: #fff;
`;

const PageHeader = styled.header`
  margin-bottom: 60px;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #000;
  margin: 0 0 12px 0;
  letter-spacing: -0.03em;
  
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.125rem;
  color: #666;
  margin: 0;
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f0f0f0;
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 120px 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 24px;
  opacity: 0.2;
`;

const EmptyTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #000;
  margin: 0 0 12px 0;
`;

const EmptyText = styled.p`
  font-size: 1.125rem;
  color: #666;
  margin: 0 0 32px 0;
  line-height: 1.6;
`;

const CreatePostButton = styled(Link)`
  display: inline-block;
  padding: 12px 32px;
  background: #000;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.85;
  }
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 80px 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 24px;
  opacity: 0.3;
`;

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #000;
  margin: 0 0 12px 0;
`;

const ErrorText = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
`;

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        appwriteService.getPosts([])
            .then((fetchedPosts) => {
                if (fetchedPosts) {
                    setPosts(fetchedPosts.documents);
                } else {
                    setPosts([]);
                }
            })
            .catch((err) => {
                console.error("Appwrite service :: AllPosts :: error", err);
                setError("Unable to load posts. Please try again.");
                setPosts([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <AllPostsWrapper>
                <Container>
                    <LoadingWrapper>
                        <Spinner />
                    </LoadingWrapper>
                </Container>
            </AllPostsWrapper>
        );
    }

    if (error) {
        return (
            <AllPostsWrapper>
                <Container>
                    <ErrorState>
                        <ErrorIcon>⚠</ErrorIcon>
                        <ErrorTitle>Something went wrong</ErrorTitle>
                        <ErrorText>{error}</ErrorText>
                    </ErrorState>
                </Container>
            </AllPostsWrapper>
        );
    }

    return (
        <AllPostsWrapper>
            <Container>
                <PageHeader>
                    <PageTitle>All Posts</PageTitle>
                    <PageSubtitle>
                        {posts.length} {posts.length === 1 ? 'post' : 'posts'}
                    </PageSubtitle>
                </PageHeader>

                {posts.length === 0 ? (
                    <EmptyState>
                        <EmptyIcon>✍️</EmptyIcon>
                        <EmptyTitle>No posts yet</EmptyTitle>
                        <EmptyText>
                            Start sharing your stories with the world.
                        </EmptyText>
                        <CreatePostButton to="/add-post">
                            Create Post
                        </CreatePostButton>
                    </EmptyState>
                ) : (
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
                )}
            </Container>
        </AllPostsWrapper>
    );
}

export default AllPosts;
