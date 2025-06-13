import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from 'styled-components';

const PostFormWrapper = styled.form`
    display: flex; /* flex */
    flex-wrap: wrap; /* flex-wrap */
    padding: 16px; /* Added padding around the form */

    /* Basic responsive adjustments */
    @media (max-width: 768px) {
        flex-direction: column; /* Stack columns on small screens */
    }
`;

const MainContentArea = styled.div`
    width: 66.666667%; /* w-2/3 */
    padding-left: 8px; /* px-2 */
    padding-right: 8px; /* px-2 */
    box-sizing: border-box;

    @media (max-width: 768px) {
        width: 100%; /* Full width on small screens */
        padding-left: 0;
        padding-right: 0;
    }
`;

const SideContentArea = styled.div`
    width: 33.333333%; /* w-1/3 */
    padding-left: 8px; /* px-2 */
    padding-right: 8px; /* px-2 */
    box-sizing: border-box;

    @media (max-width: 768px) {
        width: 100%; /* Full width on small screens */
        padding-left: 0;
        padding-right: 0;
        margin-top: 20px; /* Space between stacked columns */
    }
`;

const FeaturedImageContainer = styled.div`
    width: 100%; /* w-full */
    margin-bottom: 16px; /* mb-4 */
    text-align: center; /* Center the image if it's smaller than container */
`;

const FeaturedImage = styled.img`
    width: 100%;
    max-height: 200px; /* Limit height for preview */
    object-fit: cover; /* Cover container while maintaining aspect ratio */
    border-radius: 8px; /* rounded-lg */
    display: block; /* Remove extra space below image */
    margin-left: auto;
    margin-right: auto;
`;

const InputSpacing = styled.div`
    margin-bottom: 16px; /* mb-4 for Input components */
`;

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
    if (post) {
        console.log("Updating existing post...");
        console.log("Form data:", data);

        const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
        console.log("Uploaded file (if any) for update:", file);

        if (file) {
            console.log("Deleting old featured image:", post.featuredImage);
            appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
            ...data,
            featuredImage: file ? file.$id : undefined,
        });
        console.log("Updated dbPost:", dbPost);

        if (dbPost) {
            console.log("Navigating to:", `/post/${dbPost.$id}`);
            navigate(`/post/${dbPost.$id}`);
        } else {
            console.error("Failed to update post in Appwrite.");
        }
    } else {
        console.log("Creating new post...");
        console.log("Form data:", data);

        const file = await appwriteService.uploadFile(data.image[0]);
        console.log("Uploaded file for new post:", file);

        if (file) {
            data.featuredImage = file.$id;
            console.log("Data before creating post:", data);
            const dbPost = await appwriteService.createPost({ ...data, userID: userData.$id });
            console.log("Created dbPost:", dbPost);

            if (dbPost) {
                console.log("Navigating to:", `/post/${dbPost.$id}`);
                navigate(`/post/${dbPost.$id}`);
            } else {
                console.error("Failed to create post in Appwrite.");
            }
        } else {
            console.error("Failed to upload featured image for new post.");
        }
    }
};

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <PostFormWrapper onSubmit={handleSubmit(submit)}>
            <MainContentArea>
                <InputSpacing>
                    <Input
                        label="Title :"
                        placeholder="Title"
                        {...register("title", { required: true })}
                    />
                </InputSpacing>
                <InputSpacing>
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                </InputSpacing>
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </MainContentArea>
            <SideContentArea>
                <InputSpacing>
                    <Input
                        label="Featured Image :"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                </InputSpacing>
                {post && (
                    <FeaturedImageContainer>
                        <FeaturedImage
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                        />
                    </FeaturedImageContainer>
                )}
                <InputSpacing>
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        {...register("status", { required: true })}
                    />
                </InputSpacing>
                <Button type="submit">
                    {post ? "Update" : "Submit"}
                </Button>
            </SideContentArea>
        </PostFormWrapper>
    );
}