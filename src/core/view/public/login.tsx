import { useState }             from 'react';
import { useNavigate }          from 'react-router-dom';

import Button                   from '@mui/material/Button';
import CssBaseline              from '@mui/material/CssBaseline';
import TextField                from '@mui/material/TextField';
import Box                      from '@mui/material/Box';
import Typography               from '@mui/material/Typography';
import Container                from '@mui/material/Container';
import Alert                    from '@mui/material/Alert';
import AlertTitle               from '@mui/material/AlertTitle';

import { PasswordInput }        from './password.input';
import { useHTTP }              from '../../api/request';
import { useUser }              from '../../config/hook/useUser';

function Login() {

    const { addUser }           = useUser();
    const { connect }           = useHTTP();
    const { getAuthority }      = useHTTP();
    const navigate              = useNavigate();
    const [ error, setError ]   = useState(false);

    const ErrorAlert = () =>{
        return(
            <Alert severity="warning">
                <AlertTitle>Authentication error</AlertTitle>
                Username and/or Password are wrong.
            </Alert>
        )
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        connect({username : data.get('username'), password: data.get('password')}).then(function (response) {
            setError(false);
            if(response.data.value !== undefined){
                navigate("/home");
                if(data.get('username') != null){
                    getAuthority(data.get('username')?.toString())?.then(auths => {
                        addUser({"username" : data.get('username')?.toString()}, response.data.value, auths.data);
                })
                }
            }else{
                setError(true);
            }
        });
    };

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
                    <PasswordInput/>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ 
                            mt: 3, 
                            mb: 2 
                        }}
                    >
                        Connect
                    </Button>
                </Box>
                { error ? <ErrorAlert /> : ""}
            </Box>
        </Container>
    );
}

export default Login;