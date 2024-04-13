export const signIn = async (obj, navigate) => {
    try {
        const role = obj.alignment;
        const endpoint = role === 'ADMIN' ? 'admin' : 'users';

        const response = await fetch(`http://localhost:3000/${endpoint}/login`, {
            method: 'POST',
            body: JSON.stringify({
                email: obj.email,
                password: obj.password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            if (data && data.token) {
                alert('Login Successful');
                localStorage.setItem('token', data.token);
                navigate(`/${endpoint}`);
            }
        } else {
            throw new Error('Failed to login');
        }
    } catch (error) {
        console.error('Fetch Error:', error.message);
    }
};
