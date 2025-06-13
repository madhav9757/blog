
import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import styled from 'styled-components';

const SignupPageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
`;

const SignupCard = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 512px; /* max-w-lg (512px) */
    background-color: #F3F4F6; /* bg-gray-100 */
    border-radius: 12px;
    padding: 40px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
`;

const LogoContainer = styled.div`
    margin-bottom: 8px;
    display: flex;
    justify-content: center;
`;

const LogoWrapper = styled.span`
    display: inline-block;
    width: 100%;
    max-width: 100px;
`;

const SignupTitle = styled.h2`
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.25;
    color: #1A202C;
    margin-top: 0;
    margin-bottom: 0;
`;

const SignupSubtitle = styled.p`
    margin-top: 8px;
    text-align: center;
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 0;
`;

const SignInLink = styled(Link)` /* Styling the React Router Link component */
    font-weight: 500;
    color: #4C51BF; /* Assuming a purple/blue primary color for links */
    transition: all 200ms ease-in-out;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const ErrorMessage = styled.p`
    color: #DC2626;
    margin-top: 32px;
    text-align: center;
    font-size: 1rem;
`;

const FormFields = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    /* Spacing between inputs is handled by margin-bottom on individual Input components */
`;

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <SignupPageWrapper>
            <SignupCard>
                <LogoContainer>
                    <LogoWrapper>
                        <Logo width="100%" />
                    </LogoWrapper>
                </LogoContainer>
                <SignupTitle>Sign up to create account</SignupTitle>
                <SignupSubtitle>
                    Already have an account?&nbsp;
                    <SignInLink to="/login">Sign In</SignInLink>
                </SignupSubtitle>
                {error && <ErrorMessage>{error}</ErrorMessage>}

                <form onSubmit={handleSubmit(create)}>
                    <FormFields>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
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
                        <Button type="submit" > {/* Assuming Button handles w-full */}
                            Create Account
                        </Button>
                    </FormFields>
                </form>
            </SignupCard>
        </SignupPageWrapper>
    );
}


export default Signup
