import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImg(query, page = 1) {
    try {
        const response = await axios.get(`${BASE_URL}`, {
            params: {
                key: '36535933-aff750008a9fa1f4912b521bb',
                q: `${query}`,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page,
                per_page: 12
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
}