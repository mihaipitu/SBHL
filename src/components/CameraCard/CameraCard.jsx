import React, { Component } from 'react';
import Camera from 'react-camera';
import { Card } from 'components/Card/Card.jsx';

export class CameraCard extends Component {

    constructor(props) {
        super(props);
        this.takePicture = this.takePicture.bind(this);

        this.interval = setInterval(this.takePicture, 4000);
    }

    takePicture() {
        this.camera.capture()
            .then(blob => {
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function () {
                    let base64capture = reader.result;

                    fetch('http://192.168.43.236:5000/index/', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            image: base64capture
                        })
                    }).then(function (resp) {
                        console.log(resp);
                    }).catch(function (reason) {
                        console.log(reason);
                    });
                }
            })
    }

    render() {
        return (
            <Card statsIcon="fa fa-clock-o"
                title="Webcam feed"
                category="Shop feed"
                content={
                    <div style={style.cam}>
                        <Camera ref={(cam) => {
                            this.camera = cam;
                        }} />
                    </div>}
            />
        );
    }
}

const style = {
    cam: {
        position: 'relative',
        // height: '350px',
        // width: '550px'
    }
}



export default CameraCard;