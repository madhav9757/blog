import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostCardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const PostCardWrapper = styled.div`
  max-width: 280px;
  width: 100%;
  margin: auto;
  background: linear-gradient(to bottom right, #f7f7fc, #e6e9f0);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  }
`;

const PostCardImageContainer = styled.div`
  width: 100%;
  height: 140px;  /* smaller image height */
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const PostCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const PostCardTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  color: #222;
  text-align: center;
  margin-top: 6px;
`;

function PostCard({ $id, title, featuredImage }) {
  return (
    <PostCardLink to={`/post/${$id}`}>
      <PostCardWrapper>
        <PostCardImageContainer>
          <PostCardImage
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
          />
        </PostCardImageContainer>
        <PostCardTitle>{title}</PostCardTitle>
      </PostCardWrapper>
    </PostCardLink>
  );
}

export default PostCard;
