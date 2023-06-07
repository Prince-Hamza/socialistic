import axios from 'axios'
import { toast } from 'react-toastify';


export const interact = async (me, partner) => {

    let data = JSON.stringify({
        "me": {
            "id": me.uid,
            "name": me.displayName ? me.displayName : 'Anonymous',
            "photo": me.photoURL ? me.photoURL : "https://th.bing.com/th/id/R.8ecd3de4a4b57de791895330cf820509?rik=apELQREbj%2fT0oQ&riu=http%3a%2f%2fabdelzaher.cs.illinois.edu%2fimages%2fhead.png&ehk=woU2D0JqIZ5lRV4gZ9UAc69lYaKjywGalBytFcZMmyA%3d&risl=&pid=ImgRaw&r=0"
        },
        "partner": {
            "id": partner.id,
            "name": partner.username,
            "photo": partner.photoURL ? partner.photoURL : "https://th.bing.com/th/id/R.8ecd3de4a4b57de791895330cf820509?rik=apELQREbj%2fT0oQ&riu=http%3a%2f%2fabdelzaher.cs.illinois.edu%2fimages%2fhead.png&ehk=woU2D0JqIZ5lRV4gZ9UAc69lYaKjywGalBytFcZMmyA%3d&risl=&pid=ImgRaw&r=0'"
        }
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