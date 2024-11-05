// app/follow.tsx
'use client'
import { useState } from 'react';

const FollowPage = () => {
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleFollow = async (e: React.FormEvent) => {
        e.preventDefault();

        // Send the data to your API route
        const response = await fetch('/api/follow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url, message }),
        });

        if (response.ok) {
            // Handle successful response
            alert('Follow and connection request sent!');
        } else {
            // Handle error response
            alert('Failed to send request.');
        }
    };

    return (
        <div>
            <h1>Follow and Connect on LinkedIn</h1>
            <form onSubmit={handleFollow}>
                <div>
                    <label htmlFor="url">LinkedIn Profile URL:</label>
                    <input
                        type="text"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message">Connection Request Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send Request</button>
            </form>
        </div>
    );
};

export default FollowPage;
