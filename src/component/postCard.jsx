import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostCardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
`;

const PostCardWrapper = styled.article`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  position: relative;
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${PostCardWrapper}:hover & {
    transform: scale(1.05);
  }
`;

const ContentWrapper = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PostTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReadMoreText = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 0.875rem;
  color: #667eea;
  font-weight: 500;
  margin-top: auto;
  padding-top: 12px;
  transition: gap 0.2s ease;
  
  &::after {
    content: '→';
    margin-left: 6px;
    transition: margin-left 0.2s ease;
  }
  
  ${PostCardWrapper}:hover & {
    &::after {
      margin-left: 10px;
    }
  }
`;

function PostCard({ $id, title, featuredImage }) {
  return (
    <PostCardLink to={`/post/${$id}`}>
      <PostCardWrapper>
        <ImageWrapper>
          <PostImage
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            loading="lazy"
          />
        </ImageWrapper>
        <ContentWrapper>
          <PostTitle>{title}</PostTitle>
          <ReadMoreText>Read more</ReadMoreText>
        </ContentWrapper>
      </PostCardWrapper>
    </PostCardLink>
  );
}

export default PostCard;
