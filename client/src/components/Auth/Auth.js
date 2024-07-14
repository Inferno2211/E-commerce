import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Icon from './icon';
import useStyles from './styles';
// import Input from './Input';


const SignUp = () => {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const classes = useStyles();

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };

    const googleSuccess = async (response) => {
        const decoded = jwt_decode(response.credential);
        console.log(decoded);
        localStorage.setItem('token', response.credential);
        localStorage.setItem('user', JSON.stringify(decoded));
        navigate('/');
    };

    const googleError = (error) => {
        console.log(error)
        alert('Google Sign In was unsuccessful. Try again later');
    }

    return (
        <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
            {/* <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    { isSignup && (
                    <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                    </>
                    )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    { isSignup ? 'Sign Up' : 'Sign In' }
                </Button>
                <GoogleLogin onSuccess={googleSuccess} onError={googleError} /> */}

                <GoogleOAuthProvider clientId='165461974597-f3rjo7k88q4etvuscbi8vakorule7p7l.apps.googleusercontent.com'>
                    <GoogleLogin
                        clientId="779797726498-uerdj407au8i7auqtijc65t721kg6nau.apps.googleusercontent.com"
                        render={(renderProps) => (
                        <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                            Google Sign In
                        </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
                </GoogleOAuthProvider>

                <Grid container justify="flex-end">
                    <Grid item>
                    <Button onClick={switchMode}>
                        { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                    </Button>
                    </Grid>
                </Grid>
        </Paper>
        </Container>
    );
};

export default SignUp;