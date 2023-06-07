import React, { useState, useRef } from "react"
import { UilScenery } from "@iconscout/react-unicons"
import { UilPlayCircle } from "@iconscout/react-unicons"
import { UilLocationPoint } from "@iconscout/react-unicons"
import { UilSchedule } from "@iconscout/react-unicons"
import { Col, Row } from 'react-bootstrap'
import firebase from 'firebase/compat/app'
import { UilTimes } from "@iconscout/react-unicons"
import 'firebase/compat/auth'
import "./PostShare.css"


function PostShare(props) {

    var user = firebase.auth().currentUser

    const [postInfo, setPostInfo] = useState([])
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [video, setVideo] = useState(null)
    const [location, setLocation] = useState(null);
    const desc = useRef()
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

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
            let list = postInfo
            list.push({ image: img })
            setPostInfo([...list])
        }
    }

    // handle Video Change
    const onVideoChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let vid = event.target.files[0]
            let list = postInfo
            list.push({ video: vid })
            setPostInfo([...list])
        }
    }



    const imageRef = useRef();
    const videoRef = useRef();

    return (
        <Row className="PostShare">

            <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"} alt="Profile" />


            <div>



                <input
                    type="text"
                    placeholder="What's happen ?"
                    required
                    ref={desc}
                />



                <Row style={{ width: '100%' }} >

                    {/* {postInfo.length} */}


                    {postInfo.map((item, index) => {
                        return (
                            <div>
                                {index === 0 &&
                                    <div>
                                        {item.image &&
                                            <div>
                                                <div className="previewImage">
                                                    <UilTimes onClick={() => setImage(null)} />
                                                    <img src={URL.createObjectURL(item.image)} alt="preview" />
                                                </div>
                                            </div>
                                        }

                                        {item.video &&
                                            <video controls>
                                                <UilTimes onClick={() => setVideo(null)} />
                                                <source src={URL.createObjectURL(item.video)} alt="preview" />
                                            </video>
                                        }

                                    </div>
                                }

                                {index >= 1 &&
                                    <Col lg={3}>
                                        {item.image &&
                                            <div style={{ width: '100px' }}>
                                                <UilTimes onClick={() => setImage(null)} />
                                                <img style={{ width: '100px', height: '100px' }} src={URL.createObjectURL(item.image)} alt="preview" />
                                            </div>
                                        }
                                        {item.video &&
                                            <video controls style={{ width: '100px', height: '100px' }}>
                                                <UilTimes onClick={() => setVideo(null)} />
                                                <source src={URL.createObjectURL(item.video)} alt="preview" />
                                            </video>
                                        }
                                    </Col>
                                }


                            </div>
                        )

                    })}

                </Row>



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
                        // onClick={handleUpload}
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