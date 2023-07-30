const CustomErrorHandler =  require('../services/CustomErrorHandler');
const db = require("../config/db");

const testController = {
   async fetchAllTest(req,res,next){
         try{
            const Test  = await db.promise().query("SELECT * from TestTable");
            console.log("test");
            res.status(200).json({data: Test[0]});        
         }catch(e){
            next(CustomErrorHandler.serverError);
         }
   },
   async fetchQuestion(req,res,next){
        const {TestID} = req.params;
        try{
               console.log("HU");
               const Questions = await db.promise().query(`SELECT QuestionTable.QuestionID,QuestionTable.Question,QuestionTable.Option1,QuestionTable.Option2,QuestionTable.Option3,QuestionTable.Option4,QuestionTable.Option5,QuestionTable.Option6,QuestionTable.Option7,QuestionTable.Option8, QuestionTable.Marks, QuestionTable.DifficultyLevel, QuestionTable.NegativeMarks from QuestionTable JOIN TestTable ON QuestionTable.TestID = TestTable.TestID where TestTable.TestID = ${parseInt(TestID)} AND TestTable.StartTime < ${Date.now()}`)
               console.log(Questions[0]);
               res.status(200).json({data: Questions[0]});
            }catch(e){
                console.log(e);
               next(CustomErrorHandler.serverError);
        }
   },
   async submitSolution(StudentID, TestID, ResponseArray){
    try{
        const values = ResponseArray.map((element, index) => [TestID, index+1,StudentID, element]);
        const query = `INSERT INTO ResponseTable(testID, QuestionID, StudentID, Response) VALUES ?`;
        await db.promise().query(query, [values]);  
    }catch(error){
        console.error("Error ", error);
    }  
   },
   async Evaluation(StudentID, QuizID, ResponseArray){
    try{
        let score =0;  
        const questions = (await db.promise().query(`SELECT QuestionID, CorrectOption, Marks,NegativeMarks from QuestionTable where TestID = ${TestID}`))[0];;
        questions.forEach((question)=>{
            if(ResponseArray[question.QuestionID-1]==question.CorrectOption)
            {
              score+=question.Marks;
            }
            else{
              score-=question.NegativeMarks;
            }
        })
        console.log(score);
      }catch(err)
      {
          console.error(err);
      }
   }
} 

module.exports =  testController;