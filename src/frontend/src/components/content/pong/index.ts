
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { init_score } from './score_init';
import { updateScore } from './score';
import { init_paddles } from './paddles_init';
import { init_ball } from './ball_init';
import { init_arena } from './arena_init';
import { init_audio } from './audio_init';
import { init_plane } from './plane_init';
import { moveSun } from './update_sun';
import { moveBall } from './update_ball';
import { updateAudioVisualizer } from './update_audio';
import { updateplane } from './update_plane';
import { launchFirework } from './fireworks';

import { init_positions, treat_input_up_r_bar } from './back_calc';
import { treat_input_down_r_bar } from './back_calc';
import { treat_input_up_l_bar } from './back_calc';
import { treat_input_down_l_bar } from './back_calc';
import { get_l_paddles_pos, get_r_paddles_pos } from './back_calc';
import { get_ball_pos_x } from './back_calc';
import { get_ball_pos_z } from './back_calc';
import { update_ball } from './back_calc';
import { get_score } from './back_calc';

//Faire une structure de configuration (longueuer/largeur terrain / barres)

var config = {
	arena_w : 80,
	arena_w_2 : 0,
	arena_h : 50,
	arena_h_2 : 0,
	arena_size : 0,

	paddle_w : 1,
	paddle_h : 10,
	paddle_h_2 : 0
}
config.paddle_h_2 = config.paddle_h / 2;
config.arena_h_2 = config.arena_h / 2;
config.arena_w_2 = config.arena_w / 2;

var canResetCam = false;

//Camera =====
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 30;
camera.position.y = 43;
camera.rotation.x = -0.86;

//Render =====
const renderer = new THREE.WebGLRenderer( { antialias: true } );
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2( 0x000000, 0.001 );

//PostProcessing =====
const BLOOM_SCENE: number = 1;

const bloomLayer = new THREE.Layers();
bloomLayer.set( BLOOM_SCENE );

const params = {
	exposure: 1,
	bloomStrength: 2,
	bloomThreshold: 0,
	bloomRadius: 0,
	scene: "Scene with Glow"
};

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.toneMapping = THREE.ReinhardToneMapping;
document.body.appendChild( renderer.domElement );

const renderScene = new RenderPass( scene, camera );

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

const bloomComposer = new EffectComposer( renderer );
bloomComposer.renderToScreen = false;
bloomComposer.addPass( renderScene );
bloomComposer.addPass( bloomPass );

const finalPass = new ShaderPass(
	new THREE.ShaderMaterial( {
		uniforms: {
			baseTexture: { value: null },
			bloomTexture: { value: bloomComposer.renderTarget2.texture }
		},
		vertexShader:`			varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,
		fragmentShader:`			uniform sampler2D baseTexture;
		uniform sampler2D bloomTexture;
		varying vec2 vUv;
		void main() {
			gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
		}`,
		defines: {}
	} ), "baseTexture"
);
finalPass.needsSwap = true;
const width = window.innerWidth;
const height = window.innerHeight;
bloomComposer.setSize( width / 2 , height / 2);

const finalComposer = new EffectComposer( renderer );
finalComposer.addPass( renderScene );
finalComposer.addPass( finalPass );


//Orbit Control (for spectators only) =====
const controls_mouse = new OrbitControls( camera, renderer.domElement );
controls_mouse.maxPolarAngle = Math.PI * 0.5;
controls_mouse.minDistance = 1;
controls_mouse.maxDistance = 1000;
//End of Orbit Control

//Window Resize =====
window.onresize = function ()
{
	const width = window.innerWidth;
	const height = window.innerHeight;

	if (height > width)
	{
		camera.fov = 75 * (height / width);
		camera.aspect = 1;
	}
	else
	{
		camera.fov = 75;
		camera.aspect = width / height;
	}
	camera.updateProjectionMatrix();

	renderer.setSize( width, height );

	bloomComposer.setSize( width / 2, height / 2);
	finalComposer.setSize( width, height );
};

//Var Setup =====
var PI_s = 
{
	M_PI : Math.PI,
	M_2PI : 2 * Math.PI,
	M_PI_2 : Math.PI / 2,
	M_3PI_2 : 3 * (Math.PI / 2)
}

var Leftcol = 0x0ae0ff;
var Rightcol = 0xff13a5;

var audio_s = init_audio(scene, BLOOM_SCENE, config);

//Sun =====
var IncreaseBrightness: boolean = true;
var SunMesh: THREE.Group;
var gltfloader = new GLTFLoader().setPath( 'models/' );

gltfloader.load( 'SunFull.gltf', function ( gltf:any )
{
	gltf.scene.traverse( function ( child:any )
	{
		if(child instanceof THREE.Mesh)
		{
			child.material.emissiveIntensity = 0.3;
			child.position.set(0, 11, - config.arena_h_2 - 3);
		}
	} );
	SunMesh = gltf.scene;
	scene.add( gltf.scene );
} );

//Init fcts============================
var plane_s = init_plane(scene);

var score_s = init_score(scene, config);
updateScore(score_s);

let paddles_s = init_paddles(scene, Leftcol, Rightcol, BLOOM_SCENE, config);
let arena_s = init_arena(scene, BLOOM_SCENE, config);
let ball_s = init_ball(scene, BLOOM_SCENE);

//Keys =====
let controls =
{
	UpArrow : false,
	DownArrow : false,
	Wkey : false,
	Skey : false,
}

const onKeyDown = function ( event: any )
{
	switch ( event.code )
	{
		case 'KeyW':
			controls.Wkey = true;
			break;
		case 'KeyS':
			controls.Skey = true;
			break;
		case 'ArrowUp':
			controls.UpArrow = true;
			break;
		case 'ArrowDown':
			controls.DownArrow = true;
			break;
		case 'Space':
			if (canResetCam == true)
			{
				controls_mouse.reset();
				camera.rotation.x = -0.86;
				controls_mouse.update();
			}
			canResetCam = false;
			break;
	}
};

const onKeyUp = function ( event: any )
{
	switch ( event.code )
	{
		case 'KeyW':
			controls.Wkey = false;
			break;
		case 'KeyS':
			controls.Skey = false;
			break;

		case 'ArrowUp':
			controls.UpArrow = false;
			break;
		case 'ArrowDown':
			controls.DownArrow = false;
			break;
	}
};

document.addEventListener( 'keydown', onKeyDown );
document.addEventListener( 'keyup', onKeyUp );

//Stars
const vertices = [];

for ( let i = 0; i < 1000; i ++ ) {

	const x = THREE.MathUtils.randFloatSpread( 500 );
	const y = THREE.MathUtils.randFloatSpread( 500 );
	const z = THREE.MathUtils.randFloatSpread( 500 );

	if (x < config.arena_w_2 + 10 && x > - config.arena_w_2 - 10 && y > -10 && y < 60 && z < config.arena_h_2 + 10 && z > - config.arena_h_2 - 10)
		i--;
	else
		vertices.push( x, y, z );

}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

const material = new THREE.PointsMaterial( { color: 0x888888 } );

const points = new THREE.Points( geometry, material );

scene.add( points );

export function send_score (l_score : number, r_score : number)
{
	score_s.LeftScore = l_score;
	score_s.RightScore = r_score;
	updateScore(score_s);
	launchFirework(scene, ball_s.ball.position.x + 1,0,ball_s.ball.position.z, 20, 25, ball_s.ball_outline.material.color);

	ball_s.ball_outline.material.color.setHex(0xffffff);
	ball_s.light.color.setHex(0xffffff);
	ball_s.pos_history_x.unshift(0);
	ball_s.pos_history_z.unshift(0);
	ball_s.pos_history_x.pop();
	ball_s.pos_history_z.pop();

	ball_s.after_reset = 1;
};

export function change_ball_color(i : number)
{
	ball_s.after_reset = 0;
	if (i == 0)
	{
		(ball_s.trainee_msh[0] as any).material = ball_s.trainee_cmat;
		ball_s.trainee_wmat.color.setHex(paddles_s.left_col);
		(ball_s.trainee_msh[0] as any).material.color.setHex(paddles_s.left_col);
		ball_s.ball_outline.material.color.setHex(paddles_s.left_col);
		ball_s.light.color.setHex(paddles_s.left_col);
	}
	else
	{
		(ball_s.trainee_msh[0] as any).material = ball_s.trainee_cmat;
		ball_s.trainee_wmat.color.setHex(paddles_s.right_col);
		(ball_s.trainee_msh[0] as any).material.color.setHex(paddles_s.right_col);
		ball_s.ball_outline.material.color.setHex(paddles_s.right_col);
		ball_s.light.color.setHex(paddles_s.right_col);
	}
};

init_positions(paddles_s.bar_left.position.z, paddles_s.bar_right.position.z, paddles_s.bar_left.position.x, paddles_s.bar_right.position.x, config.paddle_h_2, arena_s.top.position.z, arena_s.bot.position.z, arena_s.left.position.x, arena_s.right.position.x);

//La game loop ======
const animate = function ()
{
	paddles_s.bar_right.position.z = get_r_paddles_pos();
	paddles_s.bar_right_out.position.z = paddles_s.bar_right.position.z;
	paddles_s.bar_left.position.z = get_l_paddles_pos();
	paddles_s.bar_left_out.position.z = paddles_s.bar_left.position.z;

	canResetCam = true;
	requestAnimationFrame( animate );

	ball_s.ball.position.x = get_ball_pos_x();
	ball_s.ball.position.z = get_ball_pos_z();
	ball_s.ball_outline.position.x = ball_s.ball.position.x;
	ball_s.ball_outline.position.z = ball_s.ball.position.z;
	ball_s.light.position.x = ball_s.ball.position.x;
	ball_s.light.position.z = ball_s.ball.position.z;

	//===================Trainee========================

	ball_s.pos_history_x.unshift(ball_s.ball.position.x);
	ball_s.pos_history_z.unshift(ball_s.ball.position.z);
	ball_s.pos_history_x.pop();
	ball_s.pos_history_z.pop();

	if (ball_s.trainee_msh[ball_s.history_depth] != null)
	{
		scene.remove(ball_s.trainee_msh[ball_s.history_depth]);
		ball_s.trainee_msh.pop();
	}
	(ball_s.trainee as any) = new THREE.Shape();

	(ball_s.trainee as any).moveTo(ball_s.pos_history_x[0], ball_s.pos_history_z[0] - 0.5);
	(ball_s.trainee as any).lineTo(ball_s.pos_history_x[1], ball_s.pos_history_z[1] - 0.5);
	(ball_s.trainee as any).lineTo(ball_s.pos_history_x[1], ball_s.pos_history_z[1] + 0.5);
	(ball_s.trainee as any).lineTo(ball_s.pos_history_x[0], ball_s.pos_history_z[0] + 0.5);

	ball_s.old_trainee_pos_x = ball_s.pos_history_x[0 + 1];
	ball_s.old_trainee_pos_z = ball_s.pos_history_z[0 + 1] + 0.25;
	(ball_s.trainee_geo as any) = new THREE.ShapeGeometry((ball_s.trainee as any));

	if (ball_s.after_reset == 1)
	{
		ball_s.trainee_wmat.color.setHex(0xffffff);
		(ball_s.trainee_msh as any).unshift (new THREE.Mesh((ball_s.trainee_geo as any), ball_s.trainee_wmat));
	}
	else
		(ball_s.trainee_msh as any).unshift (new THREE.Mesh((ball_s.trainee_geo as any), ball_s.trainee_cmat));

	(ball_s.trainee_msh[0] as any).rotation.x += PI_s.M_PI_2;
	(ball_s.trainee_msh[0] as any).layers.enable( BLOOM_SCENE );
	scene.add(ball_s.trainee_msh[0]);

	//===================Trainee========================

	//backend I guess
	//Ne doit pas se lancer dans le front mais tourner en boucle dans le back
	update_ball();

	//frontend side
	updateAudioVisualizer(audio_s);
	IncreaseBrightness = moveSun(SunMesh, IncreaseBrightness);
	updateplane(plane_s, audio_s);

	//frontend
	if (controls.UpArrow == true)
		treat_input_up_r_bar();	
	if (controls.Wkey == true)
		treat_input_up_l_bar();
	if (controls.DownArrow == true)
		treat_input_down_r_bar();
	if (controls.Skey == true)
		treat_input_down_l_bar();

	bloomComposer.render();
	finalComposer.render();
};
animate();