const nodemailer = require('nodemailer');
var htmlToText = require("nodemailer-html-to-text").htmlToText;
const SMTPConnection = require('nodemailer/lib/smtp-connection');
const {getMailTemplate} = require("./emailTemplates")
EMAIL_USER="mickuraj.gzb@gmail.com";
EMAIL_PASS="pvncgczqwowvstsr";
 
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
 
const sendSystemEmail = async (email,content,type ) => {
	let { subject, html } = getMailTemplate(content, type);
	let mailOptions = {
		to: `${email}`,
		subject,
		html,
		headers: {
			"x-priority": "1",
			importance: "high"
		}
	};
	transporter.use("compile", htmlToText());
	try {
		await transporter.sendMail(mailOptions);
	} catch (err) {
		throw err;
	}
};

module.exports = sendSystemEmail;

