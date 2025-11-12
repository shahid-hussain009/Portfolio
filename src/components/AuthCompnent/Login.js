import React, { useState } from 'react';

import UI_M from '../../MUI/MUI';
import './auth.css';

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Login data:', formData);
            setSubmitStatus('success');
            setFormData({ email: '', password: '' });

            setTimeout(() => {
                setSubmitStatus('');
            }, 3000);
        } else {
            setSubmitStatus('error');
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <UI_M.Box className="login-container fade-in">
            {/* Animated background elements */}
            <UI_M.Box className="login-bubble-1" />
            <UI_M.Box className="login-bubble-2" />

            <UI_M.Container component="main" maxWidth="sm">
                <UI_M.Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <UI_M.Paper className="login-paper">
                        {/* Header Section */}
                        <UI_M.Box sx={{ textAlign: 'center', mb: 3 }}>
                            <UI_M.Typography
                                component="h1"
                                variant="h3"
                                gutterBottom
                                className="login-title"
                            >
                                Welcome Back
                            </UI_M.Typography>
                            <UI_M.Typography
                                variant="body1"
                                color="text.secondary"
                                className="login-subtitle"
                            >
                                Sign in to your account to continue
                            </UI_M.Typography>
                        </UI_M.Box>

                        {/* Status Alerts */}
                        {submitStatus === 'success' && (
                            <UI_M.Alert
                                severity="success"
                                className="alert-rounded"
                                sx={{ width: '100%', mb: 2 }}
                            >
                                Login successful! Redirecting...
                            </UI_M.Alert>
                        )}

                        {submitStatus === 'error' && (
                            <UI_M.Alert
                                severity="error"
                                className="alert-rounded"
                                sx={{ width: '100%', mb: 2 }}
                            >
                                Please fix the errors above and try again.
                            </UI_M.Alert>
                        )}

                        {/* Login Form */}
                        <UI_M.Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                            <UI_M.TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={formData.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                InputProps={{
                                    startAdornment: (
                                        <UI_M.InputAdornment position="start">
                                            <UI_M.Email sx={{ color: 'primary.main', opacity: 0.7 }} />
                                        </UI_M.InputAdornment>
                                    ),
                                }}
                                className="login-input"
                            />

                            <UI_M.TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={errors.password}
                                InputProps={{
                                    startAdornment: (
                                        <UI_M.InputAdornment position="start">
                                            <UI_M.Lock sx={{ color: 'primary.main', opacity: 0.7 }} />
                                        </UI_M.InputAdornment>
                                    ),
                                    endAdornment: (
                                        <UI_M.InputAdornment position="end">
                                            <UI_M.IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                                sx={{ color: 'primary.main' }}
                                            >
                                                {showPassword ? <UI_M.VisibilityOff /> : <UI_M.Visibility />}
                                            </UI_M.IconButton>
                                        </UI_M.InputAdornment>
                                    ),
                                }}
                                className="login-input"
                            />

                            <UI_M.Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className="login-button"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    py: 1.5,
                                }}
                                size="large"
                            >
                                Sign In
                            </UI_M.Button>

                            {/* Divider */}
                            <UI_M.Box sx={{ my: 3 }}>
                                <UI_M.Divider>
                                    <UI_M.Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                                        Or continue with
                                    </UI_M.Typography>
                                </UI_M.Divider>
                            </UI_M.Box>

                            {/* Social Login Buttons */}
                            <UI_M.Grid container spacing={2} sx={{ mb: 3 }}>
                                <UI_M.Grid item xs={4}>
                                    <UI_M.Button
                                        fullWidth
                                        variant="outlined"
                                        startIcon={<UI_M.Google />}
                                        className="social-button"
                                        sx={{ py: 1 }}
                                    >
                                        Google
                                    </UI_M.Button>
                                </UI_M.Grid>
                                <UI_M.Grid item xs={4}>
                                    <UI_M.Button
                                        fullWidth
                                        variant="outlined"
                                        startIcon={<UI_M.Facebook />}
                                        className="social-button"
                                        sx={{ py: 1 }}
                                    >
                                        Facebook
                                    </UI_M.Button>
                                </UI_M.Grid>
                                <UI_M.Grid item xs={4}>
                                    <UI_M.Button
                                        fullWidth
                                        variant="outlined"
                                        startIcon={<UI_M.GitHub />}
                                        className="social-button"
                                        sx={{ py: 1 }}
                                    >
                                        GitHub
                                    </UI_M.Button>
                                </UI_M.Grid>
                            </UI_M.Grid>

                            {/* Footer Links */}
                            <UI_M.Box sx={{ textAlign: 'center', mt: 3 }}>
                                <UI_M.Typography variant="body2" color="text.secondary">
                                    Don't have an account?{' '}
                                    <UI_M.Button
                                        variant="text"
                                        size="small"
                                        className="signup-button"
                                    >
                                        Sign Up
                                    </UI_M.Button>
                                </UI_M.Typography>
                                <UI_M.Button
                                    variant="text"
                                    size="small"
                                    className="forgot-button"
                                    sx={{ mt: 1 }}
                                >
                                    Forgot password?
                                </UI_M.Button>
                            </UI_M.Box>
                        </UI_M.Box>
                    </UI_M.Paper>
                </UI_M.Box>
            </UI_M.Container>
        </UI_M.Box>
    );
};

export default Login;