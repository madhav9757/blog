import React, { useEffect, useState } from 'react';
import styled from 'styled-components'; 
import { useNavigate, useParams } from 'react-router-dom';
import { Container, PostForm } from '../component';
import appwriteService from "../appwrite/config";

const EditPostPageWrapper = styled.div`
    padding-top: 32px;    /* py-8 = 2rem = 32px */
    padding-bottom: 32px; /* py-8 = 2rem = 32px */
`;

function EditPost() {
    const [post, setPosts] = useState(null); 
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((fetchedPost) => { 
                if (fetchedPost) {
                    setPosts(fetchedPost); 
                } else {
                    navigate('/'); 
                }
            }).catch(error => { 
                console.error("Error fetching post for edit:", error);
                navigate('/');
            });
        } else {
            navigate('/'); 
        }
    }, [slug, navigate]); 

    return post ? ( 
        <EditPostPageWrapper>
            <Container>
                <PostForm post={post} />
            </Container>
        </EditPostPageWrapper>
    ) : null; 
}

export default EditPost;