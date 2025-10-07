import { useEffect, useState } from "react";
import axios from "axios";
const API_BASE = import.meta.env.API_BASE;


const postHook = () => {

    const [post, setPost] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        postlist();
    }, []);

    const postlist = async () => {
        try {
            setLoader(true);
            const res = await axios.get(`${API_BASE}/api/postlist`);
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
