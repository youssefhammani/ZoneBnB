import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

export default function RegisterPage() {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', {
                username,
                email,
                password
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={handleSubmit} >
                    <input type="text"
                        placeholder="Your name"
                        value={username}
                        onChange={(ev) => setUserName(ev.target.value)}
                    />
                    <input type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <input type="password"
                        placeholder="password"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                    />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
