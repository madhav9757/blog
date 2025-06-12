import React, { useState, useEffect } from 'react';
import styled from 'styled-components'; 
import { Container, PostCard } from '../component';
import appwriteService from "../appwrite/config";


const AllPostsPageWrapper = styled.div`
    width: 100%; /* w-full */
    padding-top: 32px; /* py-8 */
    padding-bottom: 32px; /* py-8 */
    box-sizing: border-box; /* Include padding in element's total width and height */
`;

const PostsGridWrapper = styled.div`
    display: flex; /* flex */
    flex-wrap: wrap; /* flex-wrap */
`;

const PostCardColumn = styled.div`
    padding: 8px; /* p-2 */
    width: 25%; /* w-1/4 */
    box-sizing: border-box;

    @media (max-width: 1024px) { /* Adjust for medium screens (e.g., tablets) */
        width: 33.3333%; /* w-1/3 */
    }

    @media (max-width: 768px) { /* Adjust for small screens (e.g., mobiles) */
        width: 50%; /* w-1/2 */
    }

    @media (max-width: 480px) { /* Adjust for very small screens */
        width: 100%; /* w-full */
    }
`;

const LoadingMessage = styled.div`
    width: 100%;
    text-align: center;
    padding: 20px;
    font-size: 1.2rem;
    color: #4A5568; /* a shade of gray */
`;

const ErrorMessage = styled(LoadingMessage)`
    color: #E53E3E; /* a shade of red */
`;

const NoPostsFoundMessage = styled(LoadingMessage)`
    color: #4C51BF; /* a shade of blue/purple */
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
                        <PostCardColumn key={post.$id}>
                            <PostCard {...post} />
                        </PostCardColumn>
                    ))}
                </PostsGridWrapper>
            </Container>
        </AllPostsPageWrapper>
    );
}

export default AllPosts;