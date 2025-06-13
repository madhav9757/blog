import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../component";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import styled from 'styled-components';

const PostDetailPageWrapper = styled.div`
    padding: 40px 0; /* More vertical padding */
    background-color: #f8f8f8; /* Light gray background for the whole page */
    min-height: calc(100vh - var(--header-height, 60px) - var(--footer-height, 100px)); /* Adjust based on your header/footer heights */
    font-family: 'Merriweather', 'Georgia', serif; /* A more traditional serif font for content */
`;

const ImageContainerWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 32px; /* More space below image */
    position: relative;
    background-color: #ffffff; /* White background for the image section */
    border-radius: 16px; /* Larger border-radius */
    padding: 20px; /* More padding inside the image container */
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); /* Clearer shadow for this section */
    overflow: hidden; /* Ensures rounded corners on image */
`;

const PostImage = styled.img`
    border-radius: 12px;
    max-width: 100%;
    height: auto;
    display: block;
    object-fit: contain; /* Ensure entire image is visible, no cropping */
    max-height: 400px; /* Limit height for large images on detail page */
`;

const ActionsContainer = styled.div`
    position: absolute;
    right: 20px;
    top: 20px;
    display: flex;
    gap: 10px; /* Slightly less space between buttons */

    @media (max-width: 768px) {
        position: static; /* Stack buttons normally on small screens */
        justify-content: flex-end; /* Align buttons to the right */
        margin-top: 20px;
        margin-right: 10px;
    }
`;

const ButtonLink = styled(Link)`
    text-decoration: none;
`;

const PostTitleWrapper = styled.div`
    width: 100%;
    margin-bottom: 32px; /* More space below title */
    text-align: center; /* Center the title */
`;

const PostTitle = styled.h1`
    font-family: 'Montserrat', 'Arial', sans-serif; /* Stronger, more modern sans-serif for titles */
    font-size: 2.8rem; /* Larger, more impactful title */
    font-weight: 800; /* Extra bold */
    line-height: 1.1;
    color: #222222; /* Very dark gray for strong contrast */
    text-shadow: 1px 1px 2px rgba(0,0,0,0.05); /* Very subtle text shadow */

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const PostContent = styled.div`
    background-color: #ffffff; /* White background for content */
    padding: 30px; /* Generous padding for content */
    border-radius: 16px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06); /* Soft shadow for content block */
    line-height: 1.8; /* Improved line height for readability */
    color: #444444; /* Softer text color for body */
    font-size: 1.1rem; /* Slightly larger body font size */
    font-family: 'Merriweather', 'Georgia', serif; /* Consistent serif font for content */

    p {
        margin-bottom: 1em;
    }
    img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 1.5em auto; /* Center images and give vertical space */
        border-radius: 8px; /* Soft corners for embedded images */
        box-shadow: 0 2px 8px rgba(0,0,0,0.1); /* Subtle shadow for embedded images */
    }
    h1, h2, h3, h4, h5, h6 {
        font-family: 'Montserrat', 'Arial', sans-serif;
        margin-top: 1.8em; /* More space above headings */
        margin-bottom: 0.8em;
        font-weight: 700;
        color: #333333;
    }
    h1 { font-size: 2em; }
    h2 { font-size: 1.7em; }
    h3 { font-size: 1.4em; }
    ul, ol {
        margin-left: 25px; /* Indent lists */
        margin-bottom: 1em;
        list-style-type: disc; /* Default list style */
    }
    strong {
        font-weight: 700;
        color: #222222;
    }
    a {
        color: #007bff; /* A nice blue for links */
        text-decoration: underline;
        &:hover {
            color: #0056b3; /* Darker blue on hover */
        }
    }
    blockquote {
        border-left: 4px solid #cccccc;
        padding-left: 15px;
        margin: 1em 0;
        font-style: italic;
        color: #666666;
    }
    pre {
        background-color: #f0f0f0;
        padding: 15px;
        border-radius: 8px;
        overflow-x: auto; /* For code blocks */
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
        font-size: 0.9em;
    }
`;

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    console.log("Fetched Post Object:", post); // ADD THIS LINE
                    console.log("Featured Image ID:", post.featuredImage); // AND THIS LINE
                } else {
                    navigate("/");
                }
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <PostDetailPageWrapper>
            <Container>
                <ImageContainerWrapper>
                    <PostImage
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                    />

                    {isAuthor && (
                        <ActionsContainer>
                            <ButtonLink to={`/edit-post/${post.$id}`}>
                                <Button bgColor="green-500" className="mr-3"> {/* Assuming Button accepts color name */}
                                    Edit
                                </Button>
                            </ButtonLink>
                            <Button bgColor="red-500" onClick={deletePost}> {/* Assuming Button accepts color name */}
                                Delete
                            </Button>
                        </ActionsContainer>
                    )}
                </ImageContainerWrapper>
                <PostTitleWrapper>
                    <PostTitle>{post.title}</PostTitle>
                </PostTitleWrapper>
                <PostContent>
                    {parse(post.content)}
                </PostContent>
            </Container>
        </PostDetailPageWrapper>
    ) : null;
}
