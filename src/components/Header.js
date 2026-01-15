import React, {useEffect, useState} from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Header() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            const strTime = `${hours}:${minutes} ${ampm}`;
            setTime(strTime);
        };

        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer); // Clear the interval on component unmount
    }, []);
    const navigate = useNavigate();

    const goToHome = () => {
        
        navigate('/');
    }

    return (
        <header className='header'>
            <div className='header-left'>
                <Link to="/orders">Orders</Link>
                <Link to="/contractors">Contractors</Link>
                <Link to="/suppliers">Suppliers</Link>
            </div>
            <video onClick={goToHome} style={{cursor: 'pointer'}} className='header-video' autoPlay muted loop >
                <source src="/welcome-gif.mp4" type="video/mp4" />
                not supported
            </video>
            <div className='header-right'>
                <Link to="/employees">Employees</Link>
                <Link to="/analytics">Analytics</Link>
            </div>
            <div className="header-clock">{time}</div>
        </header>
    );
}

export default Header;
