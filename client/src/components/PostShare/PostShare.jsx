import React, { useState, useRef, useContext } from "react"
import { UilScenery } from "@iconscout/react-unicons"
import { UilPlayCircle } from "@iconscout/react-unicons"
import { UilLocationPoint } from "@iconscout/react-unicons"
import { UilSchedule } from "@iconscout/react-unicons"
import { Col, Row } from 'react-bootstrap'
import { UilTimes } from "@iconscout/react-unicons"
import { AppContext } from "../../Context"
import AddAssets from "../AddAssets/AddAssets"
import axios from 'axios'
import { domain } from '../../constants/constants'
import { Storage } from '../../backend/storage/uploadFile'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import "./PostShare.css"
const storage = new Storage()

function PostShare(props) {

    var user = firebase.auth().currentUser

    const { appInfo, setAppInfo } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [video, setVideo] = useState(null)
    const [location, setLocation] = useState(null)
    const desc = useRef()
    const today = new Date()

    const [postInfo, setPostInfo] = useState({
        userId: appInfo.userInfo.id,
        text: '',
        images: [],
        videos: [],
        locations: [],
        dates: [],

        likes: [],
        comments: []
    })

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
            },
            (error) => {
                console.error(error);
            }
        )
    }

    // handle Image Change
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0]
            postInfo.images.push(img)
            setPostInfo({ ...postInfo })
        }
    }

    // handle Video Change
    const onVideoChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let vid = event.target.files[0]
            postInfo.videos.push(vid)
            setPostInfo({ ...postInfo })
        }
    }




    const uploadImagesToFirebase = async (postId) => {

        const imagePromises = postInfo.images.map(async (image, index) => {
            const result = await storage.uploadImage(`posts/${postId}/images/image_${index}`, 'image/jpeg', image)
            return result.downloadLink
        })


        const videoPromises = postInfo.videos.map(async (video, index) => {
            const result = await storage.uploadImage(`posts/${postId}/videos/video_${index}`, 'video/mp4', video)
            return result.downloadLink
        })

        const picLinks = await Promise.all(imagePromises)


        const videoLinks = await Promise.all(videoPromises)

        postInfo.images = picLinks
        postInfo.videos = videoLinks

        setPostInfo(postInfo)

        // const result = await storage.uploadImage('/mytestpic', 'image/jpeg', postInfo.images[0])
        // alert(`uploaded successfully ${result.downloadLink}`)

    }



    function getRandomArbitrary(min, max) {
        return Math.trunc(Math.random() * (max - min) + min)
    }


    const handleUpload = async () => {

        const postId = getRandomArbitrary(1, 1000000000)
        await uploadImagesToFirebase(postId)

        alert(`postInfo : ${JSON.stringify(postInfo)}`)

        
        let data = JSON.stringify(postInfo)

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://localhost:5000/posts/create`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data))
                alert(JSON.stringify(response.data))
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            })

    }

    const imageRef = useRef();
    const videoRef = useRef();

    return (
        <Row className="PostShare">

            <img src={appInfo.userInfo.profilePicture} alt="Profile" />


            <div>

                <input
                    type="text"
                    placeholder="What's happening ?"
                    required
                    ref={desc}
                />

                <AddAssets postInfo={postInfo} setPostInfo={setPostInfo} />

                <div className="postOptions">
                    <div
                        className="option"
                        style={{ color: "var(--photo)" }}
                        onClick={() => imageRef.current.click()}
                    >
                        <UilScenery />
                        Photo
                    </div>

                    <div
                        className="option"
                        style={{ color: "var(--video)" }}
                        onClick={() => videoRef.current.click()}
                    >
                        <UilPlayCircle />
                        Video
                    </div>

                    <div
                        className="option"
                        style={{ color: "var(--location)" }}
                        onClick={getLocation}
                    >
                        <UilLocationPoint />
                        Location
                    </div>
                    <div className="option" style={{ color: "var(--shedule)" }}>
                        <UilSchedule />
                        Shedule
                    </div>

                    <button
                        className="button ps-button"
                        onClick={handleUpload}
                        disabled={loading}
                    >
                        {loading ? "uploading" : "Share"}
                    </button>



                    <div style={{ display: "none" }}>
                        <input type="file" ref={imageRef} onChange={onImageChange} />
                    </div>
                    <div style={{ display: "none" }}>
                        <input type="file" ref={videoRef} onChange={onVideoChange} />
                    </div>
                </div>


            </div>



        </Row>
    )
}

export default PostShare

