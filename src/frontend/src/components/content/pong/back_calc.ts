// import { send_score } from '.';
// import { change_ball_color } from '.';

var positions = {
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

var PI_s = 
{
	M_PI : Math.PI,
	M_2PI : 2 * Math.PI,
	M_PI_2 : Math.PI / 2,
	M_3PI_2 : 3 * (Math.PI / 2)
}

export function init_positions(bar_left_pos_z : number, bar_right_pos_z : number, bar_left_pos_x : number, bar_right_pos_x : number, paddle_height_2 : number, arena_top_position : number, arena_bot_position : number, arena_left_position : number, arena_right_position : number)
{
	positions.paddle_l_pos_z = bar_left_pos_z;
	positions.paddle_r_pos_z = bar_right_pos_z;
	positions.paddle_l_pos_x = bar_left_pos_x;
	positions.paddle_r_pos_x = bar_right_pos_x;
	positions.paddle_h_2 = paddle_height_2;
	positions.arena_top_pos = arena_top_position + 1;
	positions.arena_bot_pos = arena_bot_position - 1;
	positions.arena_left_pos = arena_left_position + 1;
	positions.arena_right_pos = arena_right_position - 1;
}

export function treat_input_up_r_bar ()
{
	if (positions.paddle_r_pos_z - positions.paddle_h_2 > positions.arena_top_pos + 0.1)
		{
	    	positions.paddle_r_pos_z -= 0.5;
		}
};

export function treat_input_down_r_bar ()
{
	if (positions.paddle_r_pos_z + positions.paddle_h_2 < positions.arena_bot_pos - 0.1)
	{
		positions.paddle_r_pos_z += 0.5;
	}
};

export function treat_input_up_l_bar ()
{
	if (positions.paddle_l_pos_z - positions.paddle_h_2 > positions.arena_top_pos + 0.1)
	{
		positions.paddle_l_pos_z -= 0.5;
	}
};

export function treat_input_down_l_bar ()
{
	if (positions.paddle_l_pos_z + positions.paddle_h_2 < positions.arena_bot_pos - 0.1)
	{
		positions.paddle_l_pos_z += 0.5;
	}
};

export function get_l_paddles_pos()
{
	return (positions.paddle_l_pos_z);
};

export function get_r_paddles_pos()
{
	return (positions.paddle_r_pos_z);
};


function resetParams(x : number)
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


export function update_ball()
{
	positions.ball_pos_x += Math.cos(positions.ball_angle) * positions.ball_speed;
	positions.ball_pos_z += (Math.sin(positions.ball_angle) * -1) * positions.ball_speed;

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
			// change_ball_color(0);
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
		// change_ball_color(1);
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
		// send_score(positions.LeftScore, positions.RightScore);
		resetParams(0);
	}

	if (positions.ball_pos_x >= positions.arena_right_pos)
	{
		positions.LeftScore += 1;
		// send_score(positions.LeftScore, positions.RightScore);
		resetParams(1);
	}
};

export function get_ball_pos_x ()
{
	return (positions.ball_pos_x);
};

export function get_ball_pos_z ()
{
	return (positions.ball_pos_z);
};

export function get_score()
{
	return (positions.RightScore, positions.LeftScore);
};
