import React, { Component } from 'react'
import Layout from '../components/layout/layout.js'

export default class Img extends Component {
    constructor(props) {
        super(props)
        this.state = {
            scale: '1 1 1'
        }
        this.scaleBox = this.scaleBox.bind(this)
    }
    scaleBox () {
        this.setState({
            scale: '2 2 2'
        })
    }

    render () {
        return (
            <Layout>
                <a-scene>
                    <a-assets>
                        <img id="boxTexture" src="../static/img/boxbg.jpg"/>
                        <img id="skyTexture" src="../static/img/skybg.jpg"/>
                        <img id="groundTexture" src="../static/img/floorbg.webp"/>
                        <audio src="https://cdn.aframe.io/basic-guide/audio/backgroundnoise.wav" autoPlay="{true}" preload="{true}"></audio>
                    </a-assets>
                    <a-box src="#boxTexture" position="0 2 -5" rotation="0 45 45" onClick={this.scaleBox} scale={this.state.scale}>
                        <a-animation attribute="position" to="0 2.2 -5" direction="alternate" dur="2000" repeat="indefinite"></a-animation>
                        <a-animation attribute="scale" begin="mouseenter" dur="300" to="2.3 2.3 2.3"></a-animation>
                        <a-animation attribute="scale" begin="mouseleave" dur="300" to="2 2 2"></a-animation>
                        <a-animation attribute="rotation" begin="click" dur="2000" to="360 405 45"></a-animation>
                    </a-box>
                    <a-sky src="#skyTexture"></a-sky>
                    <a-plane src="#groundTexture" rotation="-90 0 0" width="30" height="30" repeat="10 10"></a-plane>
                    <a-light type="ambient" color="#445451"></a-light>
                    <a-light type="point" intensity="2" position="2 4 4"></a-light>
                    <a-text value="Hello, A-Frame!" color="#BBB" position="-0.9 0.2 -3" scale="1.5 1.5 1.5"></a-text>
                    <a-camera>
                        <a-cursor></a-cursor>
                    </a-camera>
                </a-scene>
            </Layout>
        )
    }
}