import { ChangeEvent }          from 'react';
import { useState }             from 'react';

import Button                   from '@mui/material/Button';
import CssBaseline              from '@mui/material/CssBaseline';
import TextField                from '@mui/material/TextField';
import Box                      from '@mui/material/Box';
import Typography               from '@mui/material/Typography';
import Container                from '@mui/material/Container';

import { PasswordInput }        from './password.input';
import { authentication }       from '../api/request';

function Login() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            username: data.get('username'),
            password: data.get('password'),
        });
        authentication({username : data.get('username'), password: data.get('password')});
    };

    // const [username, setUsername] = useState("");
    // const handleUsername = (event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     setUsername(event.target.value);
    //     console.log(event.target.value);
    // }

    // const [password, setPassword] = useState("");
    // const handlePassword = (event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     setPassword(event.target.value);
    //     console.log(event.target.value);
    // }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Authentication
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    {/* <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="false"
                    /> */}
                    <PasswordInput/>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ 
                            mt: 3, 
                            mb: 2 
                        }}
                    >
                        Connect
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;