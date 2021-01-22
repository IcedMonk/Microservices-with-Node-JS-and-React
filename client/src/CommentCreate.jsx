import React, { useState } from 'react';
import axios from 'axios';

export default ({ postId }) => {
    const [content, setContent] = useState('');

    const onSubmit = async event => {
        event.preventDefault();

        await axios.post(`https://4001-daac66df-85fc-40b8-8dd2-fd5026da8f90.ws-us03.gitpod.io/posts/${postId}/comments`, {
            content
        });

        setContent('');
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};
