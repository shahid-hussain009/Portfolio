import React, { useState } from 'react'
import UI_M from '../../MUI/MUI';
import './auth.css';
import { Link } from 'react-router-dom';

export const SignUp = () => {

    const signUpForm = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
    }
    const [formData, setFormData] = useState(signUpForm)

    const [errors, setErrors] = useState(signUpForm)

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [submitStatus, setSubmitStatus] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Real-time validation for confirm password
        if (name === 'password' || name === 'confirm_password') {
            validateField(name, value);
        }

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    }

    const validateField = (name, value) => {
        const newErrors = { ...errors };

        switch (name) {
            case 'email':
                if (!value) {
                    newErrors.email = 'Email is required';
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    newErrors.email = 'Email is invalid';
                } else {
                    newErrors.email = '';
                }
                break;

            case 'first_name':
                if (!value) {
                    newErrors.first_name = 'First Name is required';
                } else {
                    newErrors.first_name = '';
                }
                break;

            case 'last_name':
                if (!value) {
                    newErrors.last_name = 'Last Name is required';
                } else {
                    newErrors.last_name = '';
                }
                break;

            case 'password':
                if (!value) {
                    newErrors.password = 'Password is required';
                } else if (value.length < 6) {
                    newErrors.password = 'Password must be at least 6 characters';
                } else {
                    newErrors.password = '';
                }
                // Also validate confirm password when password changes
                if (formData.confirm_password && value !== formData.confirm_password) {
                    newErrors.confirm_password = 'Passwords do not match';
                } else if (formData.confirm_password && value === formData.confirm_password) {
                    newErrors.confirm_password = '';
                }
                break;

            case 'confirm_password':
                if (!value) {
                    newErrors.confirm_password = 'Please confirm your password';
                } else if (value !== formData.password) {
                    newErrors.confirm_password = 'Passwords do not match';
                } else {
                    newErrors.confirm_password = '';
                }
                break;

            default:
                break;
        }

        setErrors(newErrors);
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.first_name) {
            newErrors.first_name = 'First Name is required';
        }

        if (!formData.last_name) {
            newErrors.last_name = 'Last Name is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirm_password) {
            newErrors.confirm_password = 'Please confirm your password';
        } else if (formData.confirm_password !== formData.password) {
            newErrors.confirm_password = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('SignUp data:', formData);
            setSubmitStatus('success');
            // Reset form
            setFormData(signUpForm);

            setTimeout(() => {
                setSubmitStatus('');
            }, 3000);
        } else {
            setSubmitStatus('error');
        }
    }

    // Check if form is valid for button styling
    const isFormValid = () => {
        return (
            formData.first_name &&
            formData.last_name &&
            formData.email &&
            formData.password &&
            formData.confirm_password &&
            formData.password === formData.confirm_password &&
            formData.password.length >= 6 &&
            /\S+@\S+\.\S+/.test(formData.email)
        );
    }

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
                                Create Account
                            </UI_M.Typography>
                            <UI_M.Typography
                                variant="body1"
                                color="text.secondary"
                                className="login-subtitle"
                            >
                                Sign up to get started
                            </UI_M.Typography>
                        </UI_M.Box>

                        {/* Status Alerts */}
                        {submitStatus === 'success' && (
                            <UI_M.Alert
                                severity="success"
                                className="alert-rounded"
                                sx={{ width: '100%', mb: 2 }}
                            >
                                Account created successfully! Redirecting...
                            </UI_M.Alert>
                        )}

                        {submitStatus === 'error' && (
                            <UI_M.Alert
                                severity="error"
                                className="alert-rounded"
                                sx={{ width: '100%', mb: 2 }}
                            >
                                Please fix the errors and try again.
                            </UI_M.Alert>
                        )}

                        {/* SignUp Form */}
                        <UI_M.Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                            {/* First Name */}
                            <UI_M.TextField
                                margin="normal"
                                required
                                fullWidth
                                id="first_name"
                                label="First Name"
                                name="first_name"
                                autoFocus
                                value={formData.first_name}
                                onChange={handleChange}
                                error={!!errors.first_name}
                                helperText={errors.first_name}
                                InputProps={{
                                    startAdornment: (
                                        <UI_M.InputAdornment position="start">
                                            <UI_M.Person sx={{ color: 'primary.main', opacity: 0.7 }} />
                                        </UI_M.InputAdornment>
                                    ),
                                }}
                                className="login-input"
                            />

                            {/* Last Name */}
                            <UI_M.TextField
                                margin="normal"
                                required
                                fullWidth
                                id="last_name"
                                label="Last Name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                error={!!errors.last_name}
                                helperText={errors.last_name}
                                InputProps={{
                                    startAdornment: (
                                        <UI_M.InputAdornment position="start">
                                            <UI_M.Person sx={{ color: 'primary.main', opacity: 0.7 }} />
                                        </UI_M.InputAdornment>
                                    ),
                                }}
                                className="login-input"
                            />

                            {/* Email */}
                            <UI_M.TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
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

                            {/* Password */}
                            <UI_M.TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
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

                            {/* Confirm Password */}
                            <UI_M.TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirm_password"
                                label="Confirm Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                error={!!errors.confirm_password}
                                helperText={errors.confirm_password}
                                InputProps={{
                                    startAdornment: (
                                        <UI_M.InputAdornment position="start">
                                            <UI_M.Lock sx={{ color: 'primary.main', opacity: 0.7 }} />
                                        </UI_M.InputAdornment>
                                    ),
                                    endAdornment: (
                                        <UI_M.InputAdornment position="end">
                                            <UI_M.IconButton
                                                aria-label="toggle confirm password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                edge="end"
                                                sx={{ color: 'primary.main' }}
                                            >
                                                {showConfirmPassword ? <UI_M.VisibilityOff /> : <UI_M.Visibility />}
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
                                    // Dynamic button styling based on form validity
                                    opacity: isFormValid() ? 1 : 0.7,
                                    transform: isFormValid() ? 'none' : 'scale(0.98)',
                                }}
                                size="large"
                                disabled={!isFormValid()}
                            >
                                Sign Up
                            </UI_M.Button>

                            {/* Footer Links */}
                            <UI_M.Box sx={{ textAlign: 'center', mt: 3 }}>
                                <UI_M.Typography variant="body2" color="text.secondary">
                                    Already have an account?{' '}
                                    <Link to="/login" className="link-no-style">
                                        <UI_M.Button
                                            variant="text"
                                            size="small"
                                            className="signup-button"
                                        >
                                            Sign In
                                        </UI_M.Button>
                                    </Link>
                                </UI_M.Typography>
                            </UI_M.Box>
                        </UI_M.Box>
                    </UI_M.Paper>
                </UI_M.Box>
            </UI_M.Container>
        </UI_M.Box>
    )
}