import { SerializeOptions } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

var users_in_matchmaking_0 : Socket [];
var users_in_matchmaking_1 : Socket [];

var	game_rooms : number [];

const users_key_status = new Map();

const users_id = new Map();

users_in_matchmaking_0 = [];
users_in_matchmaking_1 = [];

var PI_s = 
{
	M_PI : Math.PI,
	M_2PI : 2 * Math.PI,
	M_PI_2 : Math.PI / 2,
	M_3PI_2 : 3 * (Math.PI / 2)
}

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
		console.log (client.id + " has join the matchmaking");
		users_key_status.set(client.id, 0);
		users_id.set(client.id, -1);
		return;
	};

	handleDisconnect(client: Socket)
	{
		let index_of_client_0: number;
		let index_of_client_1: number;

		console.log (client.id + " has left the matchmaking");
		// client.leave(client.id);
		index_of_client_0 = users_in_matchmaking_0.indexOf(client);
		index_of_client_1 = users_in_matchmaking_1.indexOf(client);

		if (index_of_client_0 != -1)
		{
			users_in_matchmaking_0.splice(index_of_client_0, 1);
			console.log("users in classic matchmaking : " + users_in_matchmaking_0.length);
		}
		else if (index_of_client_1 != -1)
		{
			users_in_matchmaking_1.splice(index_of_client_1, 1);
			console.log("users in bonus matchmaking : " + users_in_matchmaking_1.length);
		}
		users_id.delete(client.id);
		users_key_status.delete(client.id);
		return;	
		// delete users_in_matchmaking_0[index_of_client];
	};

	@SubscribeMessage('send_username')
	async get_username(client: Socket, user_id)
	{
		console.log("USER ID = " + user_id);
	}

	@SubscribeMessage('up_paddle')
	async up_paddle(client: Socket)
	{
		users_key_status.set(client.id, 1);
	}

	@SubscribeMessage('down_paddle')
	async down_paddle(client: Socket)
	{
		users_key_status.set(client.id, -1);
	}

	@SubscribeMessage('stop_paddle')
	async stop_paddle(client: Socket)
	{
		users_key_status.set(client.id, 0);
	}

	@SubscribeMessage('launch_game')
	async launch_game(client: Socket, config)
	{
		console.log(client.id + " aka " + config.login + " trys to launch game, gamemode : " + config.mode + " vs " + config.duel);
		users_id.set(client.id, config.login);

		let launch_game = -1;
		
		if (config.duel == null)
		{
		if (config.mode == 0)
			users_in_matchmaking_0.push(client);
		else
			users_in_matchmaking_1.push(client);
		}

		if (users_in_matchmaking_0.length >= 2) // Classic game
		{
			if (users_id.get(users_in_matchmaking_0[0].id) == users_id.get(users_in_matchmaking_0[1].id))
			{
				console.log("User allready registered !");
				users_in_matchmaking_0.pop();
				return ;
			}
			launch_game = 0;
			var players: Socket[];
			players = [];

			players[0] = users_in_matchmaking_0[0];
			players[1] = client;

			users_in_matchmaking_0 = [];

			console.log(users_in_matchmaking_0.length);

			console.log("2 Users or more are looking for a Classic game");

			players[0].join(client.id);
			players[1].join(client.id);
		}

		else if (users_in_matchmaking_1.length >= 2) // Bonus game
		{
			if (users_id.get(users_in_matchmaking_1[0].id) == users_id.get(users_in_matchmaking_1[1].id))
			{
				console.log("User allready registered !");
				users_in_matchmaking_1.pop();
				return ;
			}
			launch_game = 1;
			var players: Socket[];
			players = [];

			players[0] = users_in_matchmaking_1[0];
			players[1] = client;

			users_in_matchmaking_1 = [];

			console.log(users_in_matchmaking_1.length);

			console.log("2 Users or more are looking for a Bonus game");

			players[0].join(client.id);
			players[1].join(client.id);
		}

		if (launch_game != -1) //if launch_game == 0 -> Classic game else if == 1 -> Bonus game
		{
			var positions = 
			{
				paddle_l_pos_z : 0,
				paddle_r_pos_z : 0,
				paddle_l_pos_x : 0,
				paddle_r_pos_x : 0,
				paddle_h_2 : 0,
				arena_top_pos : 0,
				arena_bot_pos : 0,
			
				arena_left_pos : 0,
				arena_right_pos : 0,
				ball_pos_x : 0,
				ball_pos_z : 0,
				ball_speed : 0.5,
				ball_angle : Math.PI,
				PosDiff : 0,
				BaseSpeed : 0.5,
				SpeedIncrease : 0.02,
				SpeedLimit : 1.5,
				RightHit : 0,
				LeftHit : 0,
				RightScore : 0,
				LeftScore : 0
			}

			positions.paddle_l_pos_x = config.plx;
			positions.paddle_r_pos_x = config.prx;
			positions.paddle_h_2 = config.ph_2;
			positions.arena_top_pos = config.at;
			positions.arena_bot_pos = config.ab;
			positions.arena_left_pos = config.al;
			positions.arena_right_pos = config.ar;

			let win = 0;
			let score_limit = 7;

			while (win == 0)
			{
				await sleep(10);
				//Update paddle pos according to players imput
				if (users_key_status.get(players[1].id) == 1 && positions.paddle_r_pos_z - positions.paddle_h_2 > positions.arena_top_pos + 0.1)
				{
					positions.paddle_r_pos_z -= 0.5;
				}

				else if (users_key_status.get(players[1].id) == -1 && positions.paddle_r_pos_z + positions.paddle_h_2 < positions.arena_bot_pos - 0.1)
				{
					positions.paddle_r_pos_z += 0.5;
				}

				if (users_key_status.get(players[0].id) == 1 && positions.paddle_l_pos_z - positions.paddle_h_2 > positions.arena_top_pos + 0.1)
				{
					positions.paddle_l_pos_z -= 0.5;
				}

				else if (users_key_status.get(players[0].id) == -1 && positions.paddle_l_pos_z + positions.paddle_h_2 < positions.arena_bot_pos - 0.1)
				{
					positions.paddle_l_pos_z += 0.5;
				}

				positions.ball_pos_x += Math.cos(positions.ball_angle) * positions.ball_speed;
				positions.ball_pos_z += (Math.sin(positions.ball_angle) * -1) * positions.ball_speed;
		
				this.server.to(client.id).emit("update_positions", {bpx: positions.ball_pos_x, bpz: positions.ball_pos_z, lpz: positions.paddle_l_pos_z, rpz: positions.paddle_r_pos_z})

				positions.PosDiff = 0;
		
				if (positions.ball_pos_x >= positions.paddle_l_pos_x - 1 && positions.ball_pos_x <= positions.paddle_l_pos_x + 1 && (positions.ball_pos_z - 0.5 <= positions.paddle_l_pos_z + positions.paddle_h_2 && positions.ball_pos_z + 0.5 >= positions.paddle_l_pos_z - positions.paddle_h_2))
				{
					if (positions.LeftHit == 0)
					{
						positions.LeftHit = 1;
						positions.PosDiff = positions.ball_pos_z - positions.paddle_l_pos_z;
					
						positions.ball_angle = Math.PI - positions.ball_angle;
						if (positions.ball_angle > PI_s.M_2PI)
							positions.ball_angle -= PI_s.M_2PI;
						else if (positions.ball_angle < 0)
							positions.ball_angle += PI_s.M_2PI;
						if (positions.ball_angle - (positions.PosDiff/30) < PI_s.M_PI_2 || positions.ball_angle - (positions.PosDiff/30) > PI_s.M_3PI_2)
							positions.ball_angle -= positions.PosDiff/30;
					
						if (positions.ball_angle > PI_s.M_PI_2 - 0.15 && positions.ball_angle < PI_s.M_3PI_2 - 0.5)
							positions.ball_angle = PI_s.M_PI_2 - 0.15
						else if (positions.ball_angle < PI_s.M_3PI_2 + 0.15 && positions.ball_angle > PI_s.M_PI_2 + 0.5)
							positions.ball_angle = PI_s.M_3PI_2 + 0.15
					
						if (positions.ball_speed < positions.SpeedLimit)
							positions.ball_speed += positions.SpeedIncrease;
							this.server.to(client.id).emit("change_ball_color", 0);
					}
					positions.RightHit = 0;
				}
		
				//Hit right bar
				if (positions.ball_pos_x >= positions.paddle_r_pos_x - 1 && positions.ball_pos_x <= positions.paddle_r_pos_x + 1 && (positions.ball_pos_z - 0.5 <= positions.paddle_r_pos_z + positions.paddle_h_2 && positions.ball_pos_z + 0.5 >= positions.paddle_r_pos_z - positions.paddle_h_2))
				{
					if (positions.RightHit == 0)
					{
					positions.RightHit = 1;
					positions.PosDiff = positions.ball_pos_z - positions.paddle_r_pos_z;
					
					positions.ball_angle = PI_s.M_PI - positions.ball_angle;
					if (positions.ball_angle > PI_s.M_2PI)
						positions.ball_angle -= PI_s.M_2PI;
					else if (positions.ball_angle < 0)
						positions.ball_angle += PI_s.M_2PI;
					if (positions.ball_angle + (positions.PosDiff/30) > PI_s.M_PI_2 && positions.ball_angle + (positions.PosDiff/30) < PI_s.M_3PI_2)
						positions.ball_angle += positions.PosDiff/30;
					
					if (positions.ball_angle < PI_s.M_PI_2 + 0.15)
						positions.ball_angle = PI_s.M_PI_2 + 0.15;
					else if (positions.ball_angle > PI_s.M_3PI_2 - 0.15)
						positions.ball_angle = PI_s.M_3PI_2 - 0.15;
					
					if (positions.ball_speed < positions.SpeedLimit)
						positions.ball_speed += positions.SpeedIncrease;
						this.server.to(client.id).emit("change_ball_color", 1);
					}
					positions.LeftHit = 0;
				}

				//Top and bot hit conditions
				if (positions.ball_pos_z <= positions.arena_top_pos || positions.ball_pos_z >= positions.arena_bot_pos)
				{
					positions.ball_angle = PI_s.M_2PI - positions.ball_angle;
					if (positions.ball_angle > PI_s.M_2PI)
						positions.ball_angle -= PI_s.M_2PI;
					else if (positions.ball_angle < 0)
						positions.ball_angle += PI_s.M_2PI;
				}
		
				//Goal conditions
				if (positions.ball_pos_x <= positions.arena_left_pos)
				{
					positions.RightScore += 1;
					if (positions.RightScore == score_limit)
						win = 1;
					this.server.to(client.id).emit("update_score", {ls: positions.LeftScore, rs: positions.RightScore});
					resetParams(0, positions);
				}
		
				if (positions.ball_pos_x >= positions.arena_right_pos)
				{
					positions.LeftScore += 1;
					if (positions.LeftScore == score_limit)
						win = 1;
					this.server.to(client.id).emit("update_score", {ls: positions.LeftScore, rs: positions.RightScore});
					resetParams(1, positions);
				}
			}
		}
	};
};

function sleep(ms)
{
	return new Promise(resolve => setTimeout(resolve, ms));
}

function resetParams(x : number, positions: any)
{
	positions.ball_pos_x = 0;
	positions.ball_pos_z = 0;

	positions.paddle_l_pos_z = 0;
	positions.paddle_r_pos_z = 0;

	if (x == 0)
		positions.ball_angle = Math.PI;
	else
		positions.ball_angle = Math.PI * 2;
	positions.ball_speed = positions.BaseSpeed;
	positions.LeftHit = 0;
	positions.RightHit = 0;
};
