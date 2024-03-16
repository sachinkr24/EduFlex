import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Appbar from './Appbar.jsx';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {signUp} from '../Logics/Signup.js';
import {useNavigate} from 'react-router-dom';


export default function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [alignment, setAlignment] = useState('USER');

    const handleChange = (e) => {
        setAlignment(e.target.value);
    };

    const navigate = useNavigate();

    return <div>
        <Appbar></Appbar>
        <div style={{
                paddingTop : 150,
                marginBottom : '10', 
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Typography variant="h6">
                    Welcome to EduFlex !! Signup Below
                </Typography>
        </div>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Card variant='outlined' style={{
                padding : '10px',
                width : '400px',
            }}>
                <div style={{
                    marginBottom : '10px',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <ToggleButtonGroup
                        color="primary"
                        exclusive
                        value={alignment}
                        aria-label="Platform"
                        onChange={handleChange}
                    >
                    <ToggleButton value="USER">USER</ToggleButton>
                    <ToggleButton value="ADMIN">ADMIN</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <TextField label="Username" variant="outlined" style={{
                    width : "100%",
                    marginBottom : '10px',
                }} onChange={(e) => {
                    setUsername(e.target.value);
                }} />
                <TextField label="Email" variant="outlined" style={{
                    width : "100%",
                    marginBottom : '10px',
                }} onChange={(e) => {
                    setEmail(e.target.value);
                }} />
                <TextField type='password' label="Password" variant="outlined" style={{
                    width : "100%",
                    marginBottom : '10px',
                }} onChange={(p) => {
                    setPassword(p.target.value);
                }} />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Button size={'large'} variant='contained' onClick={() => signUp({
                        alignment,
                        email,  
                        password,
                        username,
                    }, navigate)}>signup</Button>
                    <Typography style={{justifyContent : 'center', cursor: 'pointer', color: '#1976d2'}} variant='caption' onClick={() => {
                        navigate('/signin');
                    }}>Already have a account?</Typography>
                </div>
            </Card>
        </div>
    </div>
}