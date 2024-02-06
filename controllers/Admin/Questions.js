const db = require("../../config/db");
const CustomErrorHandler = require("../../services/CustomErrorHandler");

const addQuestion = async (req, res) => {
    console.log(req.body.questions[0].options);
    try {
        const { companyId, company, questions } = req.body;
        for (const question of questions) {
            try {
                if (question.options.every(option => option === '')) {
                    await db.promise().query(
                        "INSERT INTO CompanyQuestion (CompanyID, Company, Question) VALUES (?, ?, ?)",
                        [companyId, company, question.question]
                    );
                } else {
                    const options = JSON.stringify(question.options);
                    await db.promise().query(
                        "INSERT INTO CompanyQuestion (CompanyID, Company, Question, Options) VALUES (?, ?, ?, ?)",
                        [companyId, company, question.question, options]
                    );
                }
            } catch (error) {
                console.error(error);
                throw error; // Throw error to catch block
            }
        }

        res.status(201).json({ success: true, message: "Questions added successfully" });
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getQuestions = async (req, res, next) => {
    try {
        const data = await db.promise().query(`SELECT distinct Company FROM CompanyQuestion ORDER BY Company ASC`);
        if (!data[0]) {
            return next(CustomErrorHandler.wrongCredentials());
        }
        const companies = data[0].map(company => company.Company);
        const CompanyData = {};
        for (let i = 0; i < companies.length; i++) {
            const data = await db.promise().query(`SELECT * FROM CompanyQuestion WHERE Company = '${companies[i]}'`);
            console.log(data[0]);
            CompanyData[`${companies[i]}`]= data[0];
        }
        console.log(CompanyData);

        return res.status(200).json({ success: true, companies: companies,CompanyData});
    } catch (error) {
        console.log(error);
        return next(CustomErrorHandler.serverError());
    }
}
module.exports = {
    addQuestion,
    getQuestions
};
   