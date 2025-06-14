import React, { useState, useEffect } from 'react';
import styled from 'styled-components'; 
import { Container, PostCard } from '../component';
import appwriteService from "../appwrite/config";

const AllPostsPageWrapper = styled.div`
    width: 100%;
    padding: 2rem 1rem;
    box-sizing: border-box;
`;

const PostsGridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.5rem;
`;

const StyledCard = styled.div`
    background: white;
    border-radius: 1rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-6px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }
`;

const LoadingMessage = styled.div`
    width: 100%;
    text-align: center;
    padding: 20px;
    font-size: 1.2rem;
    color: #4A5568;
`;

const ErrorMessage = styled(LoadingMessage)`
    color: #E53E3E;
`;

const NoPostsFoundMessage = styled(LoadingMessage)`
    color: #4C51BF;
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
                setError("Failed to load posts. Please check permissions.");
                setPosts([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <AllPostsPageWrapper>
                <Container>
                    <LoadingMessage>Loading posts...</LoadingMessage>
                </Container>
            </AllPostsPageWrapper>
        );
    }

    if (error) {
        return (
            <AllPostsPageWrapper>
                <Container>
                    <ErrorMessage>{error}</ErrorMessage>
                </Container>
            </AllPostsPageWrapper>
        );
    }

    if (posts.length === 0) {
        return (
            <AllPostsPageWrapper>
                <Container>
                    <NoPostsFoundMessage>No posts found.</NoPostsFoundMessage>
                </Container>
            </AllPostsPageWrapper>
        );
    }

    return (
        <AllPostsPageWrapper>
            <Container>
                <PostsGridWrapper>
                    {posts.map((post) => (
                        <StyledCard key={post.$id}>
                            <PostCard {...post} />
                        </StyledCard>
                    ))}
                </PostsGridWrapper>
            </Container>
        </AllPostsPageWrapper>
    );
}

export default AllPosts;
