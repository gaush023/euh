import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore();

function Dashboard() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (!user) {
                navigate('/login');
            }
        });
        return unsubscribe;
    }, [navigate]);

    useEffect(() => {
        const fetchUsers = async () => {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const usersData = querySnapshot.docs.map(doc => doc.data());
            setUsers(usersData);
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>This is the main dashboard page.</p>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        <strong>Name:</strong> {user.name} <br />
                        <strong>Age:</strong> {user.age} <br />
                        <strong>Interests:</strong> {user.interests.join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;