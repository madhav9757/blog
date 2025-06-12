
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../component";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import styled from 'styled-components';

const PostDetailPageWrapper = styled.div`
    padding-top: 32px; /* py-8 */
    padding-bottom: 32px; /* py-8 */
`;

const ImageContainerWrapper = styled.div`
    width: 100%; /* w-full */
    display: flex; /* flex */
    justify-content: center; /* justify-center */
    margin-bottom: 16px; /* mb-4 */
    position: relative; /* relative */
    border: 1px solid #E5E7EB; /* border (default gray-200, adjusted slightly to be visible) */
    border-radius: 12px; /* rounded-xl */
    padding: 8px; /* p-2 */
`;

const PostImage = styled.img`
    border-radius: 12px; /* rounded-xl */
    max-width: 100%; /* Ensure image fits container */
    height: auto; /* Maintain aspect ratio */
`;

const ActionsContainer = styled.div`
    position: absolute; /* absolute */
    right: 24px; /* right-6 (24px) */
    top: 24px; /* top-6 (24px) */
    display: flex; /* Ensure buttons are laid out correctly */
    gap: 12px; /* Add some space between buttons */
`;

const ButtonLink = styled(Link)`
    /* Styling for the Link component, assuming Button component handles its own styles */
    text-decoration: none;
`;

const PostTitleWrapper = styled.div`
    width: 100%; /* w-full */
    margin-bottom: 24px; /* mb-6 */
`;

const PostTitle = styled.h1`
    font-size: 2rem; /* text-2xl */
    font-weight: 700; /* font-bold */
    line-height: 1.25; /* leading-tight, typical for h1 */
    color: #1A202C; /* Common dark text color */
`;

const PostContent = styled.div`
    /* This will be the wrapper for the parsed HTML content.
       You might need to add specific CSS for the content
       that comes from the RTE, like styling paragraphs, images, lists etc.
       This directly replaces 'browser-css'.
    */
    p {
        margin-bottom: 1em;
        line-height: 1.6;
    }
    img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 0 auto;
    }
    h1, h2, h3, h4, h5, h6 {
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        font-weight: bold;
    }
    ul, ol {
        margin-left: 20px;
        margin-bottom: 1em;
    }
    a {
        color: #4C51BF; /* Example primary color */
        text-decoration: underline;
    }
    /* Add more styles for other HTML elements as needed from TinyMCE output */
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
                if (post) setPost(post);
                else navigate("/");
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
