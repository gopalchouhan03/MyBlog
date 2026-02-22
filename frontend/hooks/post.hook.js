import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = 'https://myblog-backend-t9rr.onrender.com/api';

const postHook = () => {

    const [post, setPost] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        postlist();
    }, []);

    const postlist = async () => {
        try {
            setLoader(true);
            const res = await axios.get(`${API_BASE_URL}/postlist`);
            setLoader(false);
            setPost(res.data.data || []);
        } catch (error) {
            setLoader(true);
            console.log(`fetching post error: ${error}`);
        }

    }

    
    return {
        post,
        loader
    }
}
export default postHook;
