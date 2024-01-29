import { useNavigate }          from 'react-router-dom';

import Button                   from '@mui/material/Button';
import CssBaseline              from '@mui/material/CssBaseline';
import TextField                from '@mui/material/TextField';
import Box                      from '@mui/material/Box';
import Typography               from '@mui/material/Typography';
import Container                from '@mui/material/Container';

import { PasswordInput }        from './password.input';
import { useHTTP }              from '../api/request';
import { useUser }              from '../config/hook/useUser';
//import { useLocalStorage }      from '../config/hook/useLocalStorage';

function Login() {

    const { addUser } = useUser();
    //const { setItem } = useLocalStorage();
    const { connect } = useHTTP();
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(event.currentTarget)
        connect({username : data.get('username'), password: data.get('password')}).then(function (response) {
            navigate("/home");
            if(data.get('username') != null){
                //setItem("user", data.get('username')?.toString());
                //setItem("token", response.data.value);
                addUser({"username" : data.get('username')?.toString()}, response.data.value);
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