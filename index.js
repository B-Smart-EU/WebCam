
/*require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: 'Reo36udbf2AAAAAAAAAADIG1GIeCbVN2fYfi77swNpixjwpz3ceEXB2q4L_56kfb' });*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//const nodemailer = require('nodemailer');

//const cors = require('cors')
const path = require('path');

/*
//-------------Servidor socket------------------
const http = require('http')
const server = http.createServer(app)
global.io = require('socket.io').listen(server)

server.listen(3001, () => {
	console.log("Socket en 3001");
});
//---------------------------------------------
*/
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cors());

app.listen(81, () => {
	console.log("Servidor Port 81");
});

app.use(express.static(path.join(__dirname, '/public')));

app.get("/", (req, res) => {
	res.setHeader('Content-Type', 'text/html');
	res.status(200)
	res.sendFile(path.join(__dirname, '/public', '/index.html'));
});





app.get("/data", (req, res) => {
	res.setHeader('Content-Type', 'text/html');
	res.status(200)
	res.sendFile(path.join(__dirname, '/public', '/data.html'));
});

/*
app.post('/experiencia', (req, res) => {

	core.db.findRadio(req.body)

		.then(tagInfo => {
			core.db.addUser(req.body, tagInfo)
				.then(model => {
					res.setHeader('Content-Type', 'application/json');
					res.status(200).send({
						success: true,
						message: `¡Ya puedes empezar la experiencia con el Radio #${tagInfo.id}!`
					});
					console.log(`Se asigna el radio ${tagInfo.id}`)
				})
				.catch(err => {
					console.log(err)
					res.setHeader('Content-Type', 'application/json');
					res.status(200).send({
						success: false,
						name: err.name,
						message: err.msj,
					});
				})
		})
		.catch(err => {
			console.log(err)
			res.setHeader('Content-Type', 'application/json');
			res.status(200).send({
				success: false,
				name: err.name,
				message: err.msj,
			});
		})
*/

	/*const nombreU = req.body.nombre;
	const apellidoU = req.body.apellido;
	const correoU = req.body.correo;
	const tipoDocU = req.body.tipoDoc;
	const cedulaU = req.body.cedula;
	const ciudadU = req.body.ciudad;
	const celularU = req.body.celular;

	var docRef = db.collection('users').doc();
	var setAda = docRef.set({
		nombre: nombreU,
		apellido: apellidoU,
		tipo_Documento:tipoDocU,
		documento: cedulaU,
		ciudad: ciudadU,
		correo: correoU,
		celular: celularU,
	});
	//var order = db.orderBy("apellido", "asc");
	console.log(nombreU + " " + apellidoU + " agregado a la base de datos.")
	const queryString = "Insert into users (nombre, apellido)"*/
//});

//--------------------Video--------------------------------------------------------------------------------

app.get('/video', function (req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.status(200)
	res.sendFile(path.join(__dirname, '/public', '/inicio.html'));
})

app.post('/mail', function (req, res) {
	videoLink = req.body;
	console.log('email', body.email);
	res.setHeader('Content-Type', 'application/json');
	res.status(200).send({
		success: true,
		message: '¡Mail enviado!'
	});
});
/*
io.on('connection', function (socket) {
	console.log('Usuario Conectado');

	socket.on('saveVideo', (object) => {
		infoUsuario = object;
		console.log('El video fue subido y llega el link');
		console.log(infoUsuario);

		core.db.findByPrimaryKey(infoUsuario.cedula, 'user').then(function (modelo) {

			console.log("              LINK VIDEO  " + infoUsuario.linkVideo+ "  correo"+modelo.correo);
			dbx.sharingCreateSharedLinkWithSettings({ path: infoUsuario.linkVideo })
				.then(function (response) {
					infoUsuario.linkVideo = response.url;
					console.log(response.url);
					// Para enviar correos
					var transporter = nodemailer.createTransport({
						//hotmail descomentar: // host: "smtp-mail.outlook.com", // hostname
						host: 'smtp.gmail.com',
						port: 465, //borrar para hotmail
						secure: true, // use SSL  //borrar para homtail
						auth: {
							user: 'expoavonbs@gmail.com',
							pass: 'expoavonbsmart1'
						}
					});

					var mailOptions = {
						from: 'expoavonbs@gmail.com',

						to: modelo.correo,
						subject: 'Tu video de expo Avon 2019',
						text: 'Hola ' + infoUsuario.nombre + ' ' + modelo.apellido + '. ' + "\n \n" + "Tu video se encuentra en el link: " + response.url + "\n \n" + ' ¡Gracias por participar!.'
					};

					transporter.sendMail(mailOptions, function (error, info) {
						if (error) {
							console.log(error);
						} else {
							console.log('Email sent: ' + info.response);
						}
					});
				})
				.catch(function (error) {
					console.log(error);
				});

		}).catch(function (error) {
			console.log(error);

		})
*/


		/*
				res.setHeader('Content-Type', 'application/json');
			res.status(200).send({
				success:true,
				radio:tagInfo.id,
				message:'¡Ya puedes empezar con la experiencia!'
			});
			console.log(`Se asigna el radio ${tagInfo.id}`)*/


//	});
//});

/*app.get("/rtags", (req, res) => {
	core.db.restoreBackUpTag().then(p => {
		res.setHeader('Content-Type', 'application/json');
		res.status(200).send({
			success: true,
			msj: 'tags restaurados'
		});
	})
});

app.get("/rusers", (req, res) => {
	core.db.restoreBackUpUsers().then(p => {
		res.setHeader('Content-Type', 'application/json');
		res.status(200).send({
			success: true,
			msj: 'tags restaurados'
		});
	})
});

app.get("/btags", (req, res) => {
	core.db.createBackUpTag().then(p => {
		res.setHeader('Content-Type', 'application/json');
		res.status(200).send({
			success: true,
			msj: 'backup de tags creado'
		});
	})
});

app.get("/busers", (req, res) => {
	core.db.createBackUpUser().then(p => {
		res.setHeader('Content-Type', 'application/json');
		res.status(200).send({
			success: true,
			msj: 'backup de usuarios creado'
		});
	})
});

*/