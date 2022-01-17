import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

let game_room = "placeHolder";

var users_in_matchmaking : Socket [];

const users_key_status = new Map();

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
		// client.join(client.id);
		users_in_matchmaking.push(client);
		console.log (client.id + " has join the matchmaking");
		users_key_status.set(client.id, 0);

		if (users_in_matchmaking.length >= 2)
		{
			var players: Socket[];
			players = [];

			players[0] = users_in_matchmaking[0];
			players[1] = client;

			users_in_matchmaking = [];

			console.log(users_in_matchmaking.length);

			console.log("2 Users or more are looking for a game");

			players[0].join(client.id);
			players[1].join(client.id);
			
			this.server.to(client.id).emit("launch_game");

			// players[0].emit("launch_game");
			// players[1].emit("launch_game");

			
			//Lancer la game ICI
		}

		//Changer le status de l'user pour chercher une game
		//Le recontacter quand une autre personne est disponible
	};
	  
	handleDisconnect(client: Socket)
	{
		let index_of_client: number;

		console.log (client.id + " has left the matchmaking");
		// client.leave(client.id);
		index_of_client = users_in_matchmaking.indexOf(client);

		users_in_matchmaking.splice(index_of_client, 1); 
		console.log(users_in_matchmaking.length);		
		// delete users_in_matchmaking[index_of_client];
	};

	launch_game(client: Socket)
	{
		// // client.leave(client.id);
		// client.join(game_room);
		console.log("Launch Game");
	}
	  
	@SubscribeMessage('back_test')
	async testFct()
	{
		console.log("Back function CALLED");
	};


	@SubscribeMessage('up_paddle')
	async up_paddle(client: Socket)
	{
		users_key_status.set(client.id, 1);
		console.log(client.id + users_key_status.get(client.id));
	}

	@SubscribeMessage('down_paddle')
	async down_paddle(client: Socket)
	{
		users_key_status.set(client.id, -1);
		console.log(client.id + users_key_status.get(client.id));
	}

	@SubscribeMessage('stop_paddle')
	async stop_paddle(client: Socket)
	{
		users_key_status.set(client.id, 0);
		console.log(client.id + users_key_status.get(client.id));
	}
}
