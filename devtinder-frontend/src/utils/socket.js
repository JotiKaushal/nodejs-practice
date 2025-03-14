import io from 'socket.io-client';
import {base_url} from './constants'

export const creatSocketConnection = ()=>{
    if(location.hostname === "localhost"){
        return io(base_url)
        }else{
            return io("/", {path: "/api/socket.io"})
        }
}