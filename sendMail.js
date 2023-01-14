const nodemailer = require('nodemailer');
const SMTPConnection = require('nodemailer/lib/smtp-connection');
EMAIL_USER="mickuraj.gzb@gmail.com";
EMAIL_PASS="uwqtiqsrhdtgojtj";
 
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
 
const sendSystemEmail = async () => {
	let mailOptions = {
		from: `mickuraj.gzb@gmail.com`,
		to: `akhilrajsrivastava.lko@gmail.com`,
		subject: "HIHIHIH",
		html: "<div>sdhfs</div>",
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
sendSystemEmail();