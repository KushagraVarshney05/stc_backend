const db = require("../../config/db");
const CustomErrorHandler = require("../../services/CustomErrorHandler");

const addQuestion = async (req, res) => {
    console.log(req.body.questions[0].options);
    try {
        const { companyId, company, questions } = req.body;
        questions.forEach(async (question) => {
            if (question.options.every(option => option === '')) {
                       
            const data=await db.promise().query(`INSERT INTO CompanyQuestions (CompanyID, Company, Question) VALUES ('${companyId}', '${company}', '${question.question}')`);
            }
            else{
            const data=await db.promise().query(`INSERT INTO CompanyQuestions (CompanyID, Company, Question, Options) VALUES ('${companyId}', '${company}', '${question.question}', '${question.options}')`);
            }
            

            
        });

        

        res.status(201).json({ success: true, message: "Questions added successfully" });
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
module.exports = {
    addQuestion,
};
   