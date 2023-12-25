import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: "*"
    }
})
export class GatewayService {

    @WebSocketServer()
    socket: Socket

    @SubscribeMessage("message")
    handleMessage(@MessageBody() body: any, @ConnectedSocket() client: Socket){
        console.log(body);
        console.log("Connected... client: " + client.id);
        this.socket.except(client.id).emit("message", body)
    }
}
