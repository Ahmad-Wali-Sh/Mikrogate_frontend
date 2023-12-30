import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Context } from '../context/Context';

export const useSocket = () => {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const newSocket = io('http://10.80.200.2:4001/');

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket');
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from WebSocket');
        });
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };

        
    }, []);
    return socket;
};
export const useRealtime = () => {

    const socket = useSocket()
    const token = useContext(Context);
    const USER_API = process.env.REACT_APP_USER;
    const API_URL = USER_API?.slice(0, -8);

    const NotifySubmit = (content, taskId, to, assigned) => {
        socket?.emit("message", "This is a New Message");
        const Form = new FormData();
        Form.append("content", content);
        Form.append("task", taskId);
        assigned && Form.append('user_ids', assigned)
        axios
          .post(API_URL + "notification_create_" + to, Form, {
            headers: {
              Authorization: "Token " + token?.user?.token,
            },
          })
          .then(() => {
            console.log("Successful.");
          }).catch((e) => console.error(e))
      };

      const NotifySubmitContract = (content, contractId, to, assigned) => {
        socket?.emit("message", "This is a New Message");
        const Form = new FormData();
        Form.append("content", content);
        Form.append("contract", contractId);
        assigned && Form.append('user_ids', assigned)
        axios
          .post(API_URL + "notification_create_" + to, Form, {
            headers: {
              Authorization: "Token " + token?.user?.token,
            },
          })
          .then(() => {
            console.log("Successful.");
          }).catch((e) => console.error(e))
      };

    return {NotifySubmit, NotifySubmitContract};
};

