import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"
import styled from 'styled-components';

const LoginPageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%; /* flex items-center justify-center w-full */
    min-height: 100vh; /* Optional: ensures it takes full viewport height for centering */
    padding: 20px; /* Optional: adds padding around the form on smaller screens */
    box-sizing: border-box; /* Include padding in element's total width/height */
`;

const LoginCard = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 512px; /* mx-auto w-full max-w-lg (512px) */
    background-color: #F3F4F6; /* bg-gray-100 */
    border-radius: 12px; /* rounded-xl */
    padding: 40px; /* p-10 (40px) */
    border: 1px solid rgba(0, 0, 0, 0.1); /* border border-black/10 */
    box-sizing: border-box;
`;

const LogoContainer = styled.div`
    margin-bottom: 8px; /* mb-2 */
    display: flex; /* flex */
    justify-content: center; /* justify-center */
`;

const LogoWrapper = styled.span`
    display: inline-block; /* inline-block */
    width: 100%; /* w-full */
    max-width: 100px; /* max-w-[100px] */
`;

const LoginTitle = styled.h2`
    text-align: center; /* text-center */
    font-size: 2rem; /* text-2xl (32px) */
    font-weight: 700; /* font-bold */
    line-height: 1.25; /* leading-tight */
    color: #1A202C; /* A common dark text color */
    margin-top: 0;
    margin-bottom: 0;
`;

const LoginSubtitle = styled.p`
    margin-top: 8px; /* mt-2 (8px) */
    text-align: center; /* text-center */
    font-size: 1rem; /* text-base (16px) */
    color: rgba(0, 0, 0, 0.6); /* text-black/60 */
    margin-bottom: 0; /* Ensures no extra space if error message follows */
`;

const SignUpLink = styled(Link)` /* Styling the React Router Link component */
    font-weight: 500; /* font-medium */
    color: #4C51BF; /* text-primary (assuming a purple/blue primary color) */
    transition: all 200ms ease-in-out; /* transition-all duration-200 */
    text-decoration: none; /* Remove default underline */

    &:hover {
        text-decoration: underline; /* hover:underline */
    }
`;

const ErrorMessage = styled.p`
    color: #DC2626; /* text-red-600 */
    margin-top: 32px; /* mt-8 (32px) */
    text-align: center; /* text-center */
    font-size: 1rem;
`;

const LoginForm = styled.form`
    margin-top: 32px; /* mt-8 (32px) */
`;

const FormFields = styled.div`
    /* space-y-5 is handled by margin-bottom on individual Input components typically */
`;

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            console.log("1. Appwrite login session:", session); // CHECK THIS

            if (session) {
                const userData = await authService.getCurrentUser()
                console.log("2. User data from authService.getCurrentUser():", userData); // CHECK THIS

                // If userData is falsy, this block will not execute
                if (userData) {
                    dispatch(authLogin({ userData })); // Ensure you're dispatching an object with a 'userData' property
                    console.log("3. Dispatched userData to Redux."); // CHECK THIS
                    navigate("/")
                } else {
                    // This else block will execute if getCurrentUser returns null/undefined
                    setError("Failed to retrieve user data after successful login.");
                    console.error("User data was null or undefined after login.");
                }
            } else {
                setError("Login failed: Appwrite session was not returned.");
                console.error("Appwrite session was null or undefined.");
            }
        } catch (error) {
            setError(error.message)
            console.error("Login error:", error); // Log any caught errors
        }
    }

    return (
        <LoginPageWrapper>
            <LoginCard>
                <LogoContainer>
                    <LogoWrapper>
                        <Logo width="100%" />
                    </LogoWrapper>
                </LogoContainer>
                <LoginTitle>Sign in to your account</LoginTitle>
                <LoginSubtitle>
                    Don&apos;t have any account?&nbsp;
                    <SignUpLink to="/signup">Sign Up</SignUpLink>
                </LoginSubtitle>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <LoginForm onSubmit={handleSubmit(login)}>
                    <FormFields>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type="submit">
                            Sign in
                        </Button>
                    </FormFields>
                </LoginForm>
            </LoginCard>
        </LoginPageWrapper>
    );
}

export default Login