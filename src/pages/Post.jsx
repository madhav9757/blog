import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../component";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import styled from 'styled-components';

const PostWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8fafc, #ffffff);
  padding: 40px 20px 80px;
`;

const PostContainer = styled.article`
  max-width: 800px;
  margin: 0 auto;
`;

const FeaturedImage = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  @media (max-width: 768px) {
    height: 300px;
    border-radius: 12px;
  }
`;

const PostHeader = styled.header`
  margin-bottom: 40px;
  text-align: center;
`;

const PostTitle = styled.h1`
  font-size: 2.75rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 20px 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  color: #64748b;
  font-size: 0.95rem;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 32px 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
  display: inline-block;
  
  @media (max-width: 768px) {
    width: 100%;
    
    button {
      width: 100%;
    }
  }
`;

const PostContent = styled.div`
  background: white;
  padding: 48px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  font-size: 1.125rem;
  line-height: 1.8;
  color: #334155;
  
  @media (max-width: 768px) {
    padding: 32px 24px;
    font-size: 1rem;
  }
  
  /* Typography styles for parsed HTML content */
  p {
    margin-bottom: 1.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    color: #0f172a;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    line-height: 1.3;
    
    &:first-child {
      margin-top: 0;
    }
  }
  
  h2 {
    font-size: 1.875rem;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
  
  h3 {
    font-size: 1.5rem;
    
    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }
  
  a {
    color: #667eea;
    text-decoration: underline;
    transition: color 0.2s ease;
    
    &:hover {
      color: #764ba2;
    }
  }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 2rem auto;
    display: block;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }
  
  blockquote {
    border-left: 4px solid #667eea;
    padding-left: 1.5rem;
    margin: 2rem 0;
    color: #475569;
    font-style: italic;
    font-size: 1.125rem;
  }
  
  ul, ol {
    margin: 1.5rem 0;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
  
  code {
    background: #f1f5f9;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'Monaco', 'Courier New', monospace;
    font-size: 0.9em;
    color: #e53e3e;
  }
  
  pre {
    background: #1e293b;
    color: #e2e8f0;
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 2rem 0;
    
    code {
      background: transparent;
      color: inherit;
      padding: 0;
    }
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    
    th, td {
      padding: 12px;
      border: 1px solid #e2e8f0;
      text-align: left;
    }
    
    th {
      background: #f8fafc;
      font-weight: 600;
    }
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  
  &::after {
    content: '';
    width: 50px;
    height: 50px;
    border: 4px solid #e2e8f0;
    border-top-color: #667eea;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userID === userData.$id : false;

    useEffect(() => {
        if (slug) {
            setLoading(true);
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
                setLoading(false);
            }).catch(() => {
                navigate("/");
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            });
        }
    };

    if (loading) {
        return (
            <PostWrapper>
                <Container>
                    <LoadingWrapper />
                </Container>
            </PostWrapper>
        );
    }

    return post ? (
        <PostWrapper>
            <Container>
                <PostContainer>
                    <FeaturedImage>
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                        />
                    </FeaturedImage>
                    
                    <PostHeader>
                        <PostTitle>{post.title}</PostTitle>
                    </PostHeader>

                    {isAuthor && (
                        <ActionButtons>
                            <ButtonLink to={`/edit-post/${post.$id}`}>
                                <Button bgColor="blue-600">Edit Post</Button>
                            </ButtonLink>
                            <Button bgColor="red-500" onClick={deletePost}>
                                Delete Post
                            </Button>
                        </ActionButtons>
                    )}

                    <PostContent>
                        {parse(post.content)}
                    </PostContent>
                </PostContainer>
            </Container>
        </PostWrapper>
    ) : null;
}
