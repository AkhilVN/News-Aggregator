const { default: axios } = require('axios');

const getNews = async (preference) => {
    const url = `${process.env.API_URL}latest_headlines?topic=${preference}`;
    try {
        const response = await axios.get(url, {
            headers: {
                'x-api-key': process.env.API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const searchNews = async (keyword) => {
    const url = `${process.env.API_URL}search?q=${keyword}`;
    try {
        const response = await axios.get(url, {
            headers: {
                'x-api-key': process.env.API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = { getNews, searchNews };