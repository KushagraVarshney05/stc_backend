const nodemailer = require('nodemailer');
const SMTPConnection = require('nodemailer/lib/smtp-connection');
EMAIL_USER="mickuraj.gzb@gmail.com";
EMAIL_PASS="";
 
const transporter = nodemailer.createTransport({
	service: 'gmail',
	type: "SMTP",
	secure: true,
	debug: true,
	host: 'smtp.gmail.com',
	port: 465,
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASS
	}
});
 
const sendSystemEmail = async (email,content ) => {
	let mailOptions = {
		to: `${email}`,
		subject: "HIHIHIH",
		html: `<div>${content}</div>`,
		headers: {
			"x-priority": "1",
			importance: "high"
		}
	};
	try {
		await transporter.sendMail(mailOptions);
	} catch (err) {
		throw err;
	}
};
<<<<<<< HEAD
module.exports = sendSystemEmail;
=======
sendSystemEmail();
>>>>>>> 85cac36d4c34f71460f99821655dcd969d24e0a6
