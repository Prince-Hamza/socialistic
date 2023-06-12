import React, { useContext, useMemo, useState } from 'react'
import { Col } from 'react-bootstrap'
import { AppContext } from '../../Context'
import { UilTimes } from "@iconscout/react-unicons"
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

function AddAssets({ postInfo, setPostInfo }) {
    const { appInfo, setAppInfo } = useContext(AppContext)
    const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY })
    const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [video, setVideo] = useState(null)
    const [location, setLocation] = useState(null)
    const [calendar, setCalendar] = useState(null)


    const removeAsset = (assetType, assetIndex) => {
        postInfo[assetType].splice(assetIndex, 1)
        setPostInfo({ ...postInfo })
    }



    return (
        <div style={Styles.flexView}>

            {postInfo.images.map((image, index) => {
                return (
                    <div style={Styles.asset} className="previewImage">
                        <UilTimes onClick={() => { removeAsset('images', index) }} />
                        <img src={URL.createObjectURL(image)} alt="preview" />
                    </div>
                )
            })}


            {postInfo.videos.map((video, index) => {
                return (
                    <div style={{ width: '100px', height: '100px', ...Styles.asset }} className='previewImage' >
                        <UilTimes onClick={() => { removeAsset('videos', index) }} />
                        <video controls style={{ width: '100%', height: '100px' }} >
                            <source src={URL.createObjectURL(video)} alt="preview" />
                        </video>
                    </div>
                )
            })}



            {postInfo.locations.map((location) => {
                return (
                    <div style={{ width: '100%', height: 'auto' }} >
                        {isLoaded &&
                            <GoogleMap
                                mapContainerStyle={{ width: '100%', height: '500px' }}
                                center={center}
                                zoom={10}
                            />
                        }
                    </div>
                )
            })}
            


            {/* {isLoaded &&
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '500px' }}
                    center={center}
                    zoom={10}
                />
            } */}


        </div>
    )
}

export default AddAssets



const Styles = ({
    flexView: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    asset: {
        margin: '1px'
    }
})
