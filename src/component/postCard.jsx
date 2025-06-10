import React from 'react';
import appwriteService from "../appwrite/config"; 
import { Link } from 'react-router-dom';
import styled from 'styled-components'; 

const PostCardLink = styled(Link)` /* Styled-components allows styling React components like Link */
    text-decoration: none;
    color: inherit;
    display: block; /* Make the entire card clickable */
`;

const PostCardWrapper = styled.div`
    width: 100%;
    background-color: #F3F4F6; /* bg-gray-100 */
    border-radius: 12px;
    padding: 16px;
    transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:hover {
        background-color: #E5E7EB; /* A slightly darker gray on hover */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow on hover */
    }
`;

const PostCardImageContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
`;

const PostCardImage = styled.img`
    border-radius: 12px;
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
`;

const PostCardTitle = styled.h2`
    font-size: 1.25rem; /* text-xl */
    font-weight: 700;   /* font-bold */
    color: #1A202C;
    margin-top: 0;
    margin-bottom: 0;
`;

// --- React Component ---

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
        <PostCardTitle>
          {title}
        </PostCardTitle>
      </PostCardWrapper>
    </PostCardLink>
  );
}

export default PostCard;