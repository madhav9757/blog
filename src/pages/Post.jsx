import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../component";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import styled from 'styled-components';

const PostDetailPageWrapper = styled.div`
  padding: 60px 20px;
  background: linear-gradient(to bottom right, #f8fafc, #e2e8f0);
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
`;
const ImageContainerWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto 40px;
  background-color: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 0;
  position: relative;
`;
const PostImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  display: block;
`;
const ActionsContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    right: 10px;
    top: 10px;
  }
`;
const ButtonLink = styled(Link)`
  text-decoration: none;
`;
const PostTitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const PostTitle = styled.h1`
  font-size: 2.75rem;
  font-weight: 900;
  color: #0f172a;
  margin-bottom: 0.25rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;
const PostContent = styled.div`
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  max-width: 850px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #334155;

  @media (max-width: 768px) {
    padding: 1.5rem;
    font-size: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
  }

  img {
    max-width: 100%;
    margin: 2rem auto;
    border-radius: 12px;
    display: block;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  }

  h1, h2, h3 {
    font-weight: 700;
    color: #0f172a;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 4px solid #94a3b8;
    color: #475569;
    font-style: italic;
    margin: 1.5rem 0;
  }

  code, pre {
    background: #f1f5f9;
    padding: 0.4rem 0.6rem;
    border-radius: 6px;
    font-family: monospace;
    color: #1e293b;
  }
`;
const PostCardWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  color: #1e293b;

  @media (max-width: 768px) {
    padding: 25px;
  }

  img {
    width: 100%;
    border-radius: 12px;
    max-height: 500px;
    object-fit: cover;
    margin-bottom: 24px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    text-align: center;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 24px;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  }

    .content {
    max-width: 750px;
    margin: 0 auto;
    font-size: 1.1rem;
    line-height: 1.8;
    text-align: left;

    p {
      margin-bottom: 1.25rem;
    }

    img {
      display: block;
      margin: 2rem auto;
      max-width: 100%;
      border-radius: 8px;
    }

    h2, h3 {
      margin-top: 2rem;
      font-weight: 700;
      color: #0f172a;
    }

    a {
      color: #2563eb;
      text-decoration: underline;
    }

    blockquote {
      border-left: 4px solid #94a3b8;
      padding-left: 1rem;
      color: #475569;
      font-style: italic;
    }

    code {
      background: #f1f5f9;
      padding: 0.3rem 0.5rem;
      border-radius: 6px;
      font-family: monospace;
    }
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
                <PostCardWrapper>
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                    />

                    <h1>{post.title}</h1>

                    {isAuthor && (
                        <div className="actions">
                            <ButtonLink to={`/edit-post/${post.$id}`}>
                                <Button bgColor="green-500">Edit</Button>
                            </ButtonLink>
                            <Button bgColor="red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}

                    <div className="content">
                        {parse(post.content)}
                    </div>
                </PostCardWrapper>
            </Container>

        </PostDetailPageWrapper>
    ) : null;
}
