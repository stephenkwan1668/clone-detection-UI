import React, { useState } from 'react';

const NameForm: React.FC = () => {
    const [name, setName] = useState<string>('please fill in your name'); // Initial value is an empty string

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // Prevents page reload
        alert(`Hello, ${name}!`);
        setName(''); // Reset the input field
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default NameForm;
