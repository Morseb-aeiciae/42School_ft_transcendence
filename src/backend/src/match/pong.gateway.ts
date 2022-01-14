import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

let game_room = "placeHolder";

var users_in_matchmaking : string [];
users_in_matchmaking = [];

@WebSocketGateway({
	cors: {origin:'http://localhost',
	methods: ['GET', 'POST'],
	credentials: true}
})
export class PongGateway
{
	@WebSocketServer()
	server: Server;

	afterInit(server: Server)
	{
		console.log("game socket init !");
	}

	handleConnection(client: Socket)
	{
		client.join(client.id);
		users_in_matchmaking.push(client.id);

		if (users_in_matchmaking.length >= 2)
		{
			console.log("2 Users or more are looking for a game");
			//Mettre les deux users dans la meme room
			//les contacter pour leur dire que la game est prête
			//Les sortir de la tab des user en matchmaking
		}

		//Changer le status de l'user pour chercher une game
		//Le recontacter quand une autre personne est disponible
	};
	  
	handleDisconnect(client: Socket)
	{
		client.leave(client.id);
		delete users_in_matchmaking[client.id];
	};

	launch_game(client: Socket)
	{
		client.leave(client.id);
		client.join(game_room);
	}
	  
	@SubscribeMessage('back_test')
	async testFct()
	{
		console.log("Back function CALLED");
	};
}
