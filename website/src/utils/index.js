import axios from 'axios';

const API_URL = "http://localhost:8800/api-v1";

export const API = axios.create({
    baseURL: API_URL,
    responseType: "json",
});

export const apiRequest = async ({ url, token, data, method }) => {
    try {

        const result = await API(url, {
            method: method || "GET",
            data: data,
            headers: {
                "content-type": "application/json",
                Authorization: token ? `Bearer ${token}` : ""
            }
        })

        return result?.data;

    } catch (error) {
        const err = error.response.data;
        console.log(err);
        return { status: err.status, message: err.message };
    }
};

export const handleFileUpload = async (uploadFile) => {
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("upload_preset", "jobportal");

    try {

        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dbtq4qk6s/image/upload/",
            formData
        );

        return response.data.secure_url;

    } catch (error) {
        console.log(error)
    }

};

export const updateUrl = ({
    pageNum,
    query,
    camLoc,
    sort,
    navigate,
    location,
    jType,
    exp,
}) => {
    const params = new URLSearchParams();

    if (pageNum && pageNum > 1) {
        params.set("page", pageNum);
    }

    if (query) {
        params.set("search", query);
    }

    if (camLoc) {
        params.set("location", camLoc);
    }

    if (sort) {
        params.set("sort", sort);
    }

    if (jType) {
        params.set("jtype", jType);
    }

    if (exp) {
        params.set("exp", exp);
    }

    const newUrl = `${location.pathname}?${params.toString()}`;
    navigate(newUrl, { replace: true });

    return newUrl;

};
