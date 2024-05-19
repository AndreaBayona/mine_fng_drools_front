import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {useAuth} from "../conntexts/UserContext";
import {Alert, Paper} from "@mui/material";
import {useNavigate} from "react-router-dom";


const users = [{
    email: "andrea@hotmail.com",
    password: "pass",
    role: "admin",

}, {
    email: "juanc@gmail.com",
    password: "pass",
    role: "read-only",

}]


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" >
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
export default function LogIn() {

    const [input, setInput] = React.useState({
        email: "",
        password: "",
        role: "",
    });

    const [emailError, setEmailError] = React.useState(false);
    const [passError, setPassError] = React.useState(false);
    const [authError, setAuthError] = React.useState("");

    const {loginAction} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (event) => {

        event.preventDefault();
        setPassError(input.password === "");
        setEmailError(input.email === "");
        setAuthError(null);

        if (!(emailError || passError)) {

            let foundUser = users.find(user => user.email === input.email && user.password === input.password);
            if (foundUser) {
                console.log("Login success")
                loginAction({
                    token: "123",
                    user: {
                        email: foundUser.email,
                        role: foundUser.role
                    }
                });

                navigate("/loan-opening");
                return;
            }
            else {
                setAuthError("Correo y contraseña no coinciden");
            }

        }
        console.error("Invalid email or password");
    };

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }

    return (
            <Grid container component="main" sx={{ height: '100vh' }}>

                {/*<CssBaseline />*/}
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{


                        backgroundImage: 'url(bg.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square = {false}>
                    <Box

                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Iniciar sesión
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                            <TextField
                                error={emailError}
                                helperText="Debe llenar este campo"
                                onChange={e => handleChange(e)}
                                margin="normal"
                                required = {true}
                                fullWidth
                                id="email"
                                label="correo"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                error={passError}
                                helperText="Debe llenar este campo"
                                err
                                onChange={e => handleChange(e)}
                                margin="normal"
                                required = {true}
                                fullWidth
                                name="password"
                                label="contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Recordarme"
                            />

                            {authError && <Alert severity="error">{authError}</Alert>}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                              Iniciar sesión
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="src/pages/LogIn#" variant="body2">
                                        Recuperar contraseña
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="src/pages/LogIn#" variant="body2">
                                        {"Registrarse"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Grid>
            </Grid>
    );
}

