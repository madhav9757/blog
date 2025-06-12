import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../component'
import styled from 'styled-components';

const HomePageWrapper = styled.div`
    width: 100%; /* w-full */
    padding-top: 32px; /* py-8 */
    padding-bottom: 32px; /* py-8 */
    box-sizing: border-box; /* Include padding in element's total width and height */
`;

const NoPostsContainer = styled.div`
    width: 100%; /* w-full */
    padding-top: 32px; /* py-8 */
    padding-bottom: 32px; /* py-8 */
    margin-top: 16px; /* mt-4 */
    text-align: center; /* text-center */
`;

const NoPostsFlexWrapper = styled.div`
    display: flex; /* flex */
    flex-wrap: wrap; /* flex-wrap */
`;

const NoPostsContentWrapper = styled.div`
    padding: 8px; /* p-2 */
    width: 100%; /* w-full */
`;

const NoPostsHeading = styled.h1`
    font-size: 2rem; /* text-2xl */
    font-weight: 700; /* font-bold */
    color: #1A202C; /* A common dark text color */
    transition: color 0.3s ease; /* For hover effect */

    &:hover {
        color: #6B7280; /* hover:text-gray-500 */
    }
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


function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts()
            .then((postsData) => {
                if (postsData) {
                    setPosts(postsData.documents);
                }
            })
            .catch((error) => { // IMPORTANT: Add catch block for getPosts
                console.error("Error fetching posts:", error);
            });
    }, []);

    if (posts.length === 0) {
        return (
            <NoPostsContainer>
                <Container>
                    <NoPostsFlexWrapper>
                        <NoPostsContentWrapper>
                            <NoPostsHeading>
                                Login to read posts
                            </NoPostsHeading>
                        </NoPostsContentWrapper>
                    </NoPostsFlexWrapper>
                </Container>
            </NoPostsContainer>
        );
    }

    return (
        <HomePageWrapper>
            <Container>
                <PostsGridWrapper>
                    {posts.map((post) => (
                        <PostCardColumn key={post.$id}>
                            <PostCard {...post} />
                        </PostCardColumn>
                    ))}
                </PostsGridWrapper>
            </Container>
        </HomePageWrapper>
    );
}

export default Home;