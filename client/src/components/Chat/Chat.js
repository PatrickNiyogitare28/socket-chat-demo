import React,{useState, useEffect} from 'react';
import queryString from 'querystring';
import io from 'socket.io-client';
import './Chat.css';

const Chat = () => {
    useEffect(({location}) => {
        const {name,room}  = queryString.parse(location.search);
        alert(name+" "+room);
    })
    return (
        <h1>Chat</h1>
    )
}

export default Chat;