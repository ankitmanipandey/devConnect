import io from 'socket.io-client'
import { BACKEND_URL } from './constants'

export const createSocketConnection = () => {
    return io(BACKEND_URL)
}