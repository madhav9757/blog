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
    width: 100%;
    background-color: #ffffff; /* Clean white background */
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08); /* Soft, subtle shadow */
    transition: all 0.3s ease-in-out; /* Smooth transition for hover effects */
    display: flex;
    flex-direction: column;
    overflow: hidden; /* Ensure nothing breaks out of rounded corners */

    &:hover {
        transform: translateY(-5px); /* Lift effect on hover */
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); /* More pronounced shadow on hover */
    }
`;

const PostCardImageContainer = styled.div`
    width: 100%;
    height: 180px; /* Fixed height for image container */
    display: flex;
    justify-content: center;
    align-items: center; /* Center image vertically if smaller */
    margin-bottom: 16px;
    border-radius: 8px; /* Slightly smaller border-radius for the image inside */
    overflow: hidden; /* Hide parts of image that might overflow fixed height */
`;

const PostCardImage = styled.img`
    border-radius: 8px; /* Rounded corners for the image itself */
    width: 100%;
    height: 100%; /* Fill the container height */
    object-fit: cover; /* Cover the area, cropping if necessary */
    display: block;
`;

const PostCardTitle = styled.h2`
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Modern font stack */
    font-size: 1.35rem; /* Slightly larger title */
    font-weight: 700;
    color: #333333; /* Darker, softer black for text */
    margin-top: 0;
    margin-bottom: 0;
    line-height: 1.3;
    text-align: center; /* Center the title */
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