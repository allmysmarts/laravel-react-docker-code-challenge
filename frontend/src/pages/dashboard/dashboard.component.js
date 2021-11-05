import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import './dashboard.css';

import axios from "axios";

export default function Dashboard() {

    const [image, setImage] = useState(null);
    const [size, setSize] = useState("");

    const [validation, setValidation] = useState([]);

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        if(!token) {
            navigate('/sign-in');
        }
    });

    const onChangeFileHandler = (event) => {
        var file = event.target.files[0];
        
        if (validateSize(event)) {
            setImage(file);
        }
    }

    const fileUploadHandler = () => {
        const data = new FormData();
        
        data.append('image', image);
        data.append('size', size);

        axios.post("http://api.myapp.com/api/generate", 
            data, {
                headers: {
                    'Authorization': localStorage.getItem("token"),
                },
                responseType: 'blob'
            })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                const filename = size === 'all' ? 'all.zip' : `${size}_${image.name}`;
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                error.response.data.text().then(result => {
                    setValidation(JSON.parse(result));
                });
            })
    };

    const validateSize = (event) => {
        let file = event.target.files[0];
        let size = 30000;
        let err = '';
        
        if (file && file.size > size) {
            err = file.type + ' is too large, please pick a smaller file\n';
            console.log(err);
        }
       return true;
    };

    return (
        <div className="upload-wrapper">
            <div className="upload-inner">
                <form method="post">
                    <div className="form-group files">
                        <label>Upload Your File </label>
                        <input type="file" name="file" className="form-control" accept="image/*" onChange={onChangeFileHandler} />
                    </div>
                    {validation.image && (
                        <div className="alert alert-danger mt-1">
                            {validation.image[0]}
                        </div>
                    )}
                    <div className="generate-wrapper mt-2">
                        <select className="form-select" value={size} onChange={(e) => setSize(e.target.value)}>
                            <option value="">Open this select menu</option>
                            <option value="origin">Original</option>
                            <option value="square">Square</option>
                            <option value="small">Small (256 x 256)</option>
                            <option value="all">All</option>
                        </select>
                        <button type="button" className="btn btn-info" onClick={fileUploadHandler}>Upload File</button>
                    </div>
                    {validation.size && (
                        <div className="alert alert-danger mt-1">
                            {validation.size[0]}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}