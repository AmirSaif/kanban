import {useAuth} from "../auth/AuthContext";
export const SettingsPage = () => {
    const {user, role, logout} = useAuth();
    return <div style={{ padding: '1rem' }}>
        <ul>
            <li>User: {user}</li>
            <li>Role: {role}</li>
        </ul>
        <button onClick={logout}>Logout</button>
    </div>;
};