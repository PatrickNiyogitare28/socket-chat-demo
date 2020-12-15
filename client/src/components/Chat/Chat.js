import React,{useState, useEffect} from 'react';
import queryString from 'query-string';
import './Chat.css';
import io from 'socket.io-client/dist/socket.io';
import InfoBar from '../InfoBar/InfoBar';

let socket;
const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const SERVER_ENDPOINT = '192.168.1.211:5000';  
    useEffect(() => {
        const {name, room}  = queryString.parse(location.search);
        socket = io(SERVER_ENDPOINT);
        setName(name);
        setRoom(room);
    
        socket.emit('join', {name,room}, () => {
        
        });
 
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
      
    },[SERVER_ENDPOINT, location.search])


    useEffect(() => {
       socket.on('message', (message) => {
           setMessages([...messages, message]);
       }, [messages])
    })

    const sendMessage = (event) => {
    event.preventDefault();

    
    if(message)
    socket.emit('sendMessage', message, () => setMessage(''));  
    }

    console.log(message+" "+messages);
    return (
        <div className="OuterContainer">
            <InfoBar/>
            <div className="container">
                <input value={message} onChange={(event) => setMessage(event.target.value)} 
                onKeyPress = {event => event.key === 'Enter' ? sendMessage(event) : null} />
            </div>
        </div>
    )
}

export default Chat;