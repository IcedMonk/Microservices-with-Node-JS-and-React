import React, { useState } from "react";
import axios from "axios";

export default () => {
    const [title, setTitle] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        await axios.post(
            "https://4000-daac66df-85fc-40b8-8dd2-fd5026da8f90.ws-us03.gitpod.io/posts",
            {
                title,
            }
        );

        setTitle("");
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};
