import React, { useState } from 'react';
import './toggle.css';

const ToggleVisibility: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
        <div>
            <button onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? 'Hide' : 'Show'} Message
            </button>
            {isVisible && <p>This is a toggleable message!</p>}
        </div>
    );
};

export default ToggleVisibility;
