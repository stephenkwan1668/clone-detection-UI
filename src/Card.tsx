import React from 'react';
import './Card.css';

interface CardProps {
    title: string;
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
    return (
        <div className="card">
            <h2>{title}</h2>
            <div>{children}</div>
        </div>
    );
};

export default Card;
