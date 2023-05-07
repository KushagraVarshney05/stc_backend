const kue = require("kue");

const Queue = kue.createQueue({
	redis: "redis://127.0.0.1:6379"
});

const sendSystemEmail = require("../sendMail")
const { NODE_ENV } = require("..");
Queue.process("sendSystemEmailJob", async (job, done) => {
	let { data } = job;
	console.log(job.data);
	try {
	//console.log(sendSystemEmail);
		await sendSystemEmail(data.email, data, data.mailType);
		
		console.log(
			`${data.mailType} email sent to ${data.email} at ${(
				Date.now()
			)}`
		);
		done();
	} catch (err) {
		console.log(err);
		done(err);
	}
});

Queue.process("InsertInto", async (job, done) => {
	let { data } = job;
	try {
		await sendGeneralEmail(data.email, data.subject, data.content);
		
		console.log(
			`${data.mailType} email sent to ${data.email} at ${Date(
				Date.now()
			)}`
		);
		done();
	} catch (err) {
		console.log(err);
		
		done(err);
	}
});