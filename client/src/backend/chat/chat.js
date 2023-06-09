import axios from 'axios'
import { toast } from 'react-toastify';


export const interact = async (me, partner) => {

    let data = JSON.stringify({
        "me": me,
        "partner": partner
    })

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:5000/chat/onInteractionForChat?',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    }

    try {
        const resp = await axios.request(config)
        return resp.data
    } catch (ex) {
        toast(ex.toString())
    }

}