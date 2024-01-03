const db = require("../../config/db");
const CustomErrorHandler = require("../../services/CustomErrorHandler");

const addCompanyData = async (req, res, next) => {
  const {
    companyName,
    companyNumOfRounds,
    companyCTC,
    companyEligibility,
    companyJOBProfile,
    companyFirstRoundName,
    companyFirstRoundDescrip,
    companyFirstRoundDuration,
    companySecondRoundName,
    companySecondRoundDescrip,
    companySecondRoundDuration,
    companyThirdRoundName,
    companyThirdRoundDescrip,
    companyThirdRoundDuration,
    companyFourthRoundName,
    companyFourthRoundDescrip,
    companyFourthRoundDuration,
    companyAdditionalRoundDescrip,
    companyReportApprovalStatus,
    companyPracticeDetails,
    companyReportAddedBy,
    companyReportYear,
    reportFeedBack,
  } = req.body;
  console.log(req.body);
  try {
    const data = await db
      .promise()
      .query(
        `INSERT INTO companydatadivided (companyID,companyNumOfRounds,companyCTC,companyEligibility,companyJOBProfile,companyFirstRoundName,companyFirstRoundDescrip,companyFirstRoundDuration,companySecondRoundName,companySecondRoundDescrip,companySecondRoundDuration,companyThirdRoundName,companyThirdRoundDescrip,companyThirdRoundDuration,companyFourthRoundName,companyFourthRoundDescrip,companyFourthRoundDuration,companyAdditionalRoundDescrip,companyPracticeDetails,companyReportAddedBy,companyReportYear,reportFeedBack) VALUES ('${companyName}','${companyNumOfRounds}','${companyCTC}','${companyEligibility}','${companyJOBProfile}','${companyFirstRoundName}','${companyFirstRoundDescrip}','${companyFirstRoundDuration}','${companySecondRoundName}','${companySecondRoundDescrip}','${companySecondRoundDuration}','${companyThirdRoundName}','${companyThirdRoundDescrip}','${companyThirdRoundDuration}','${companyFourthRoundName}','${companyFourthRoundDescrip}','${companyFourthRoundDuration}','${companyAdditionalRoundDescrip}','${companyPracticeDetails}','${companyReportAddedBy}','${companyReportYear}','${reportFeedBack}')`
      );

    res.status(201).json({ data: data[0] });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};
const getCompanyDataDivided = async (req, res, next) => {
  try {
    const data = await db.promise().query(`SELECT *
        FROM companydatadivided
        LEFT JOIN company ON companydatadivided.companyID = company.companyID
        LEFT JOIN users ON companydatadivided.companyReportAddedBy = users.userID
        LEFT JOIN class ON company.companyClass = class.classID`);

    if (!data[0]) {
      return next(CustomErrorHandler.wrongCredentials());
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(CustomErrorHandler.serverError());
  }
};
const updateCompanyData = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.body);

  const {
    companyNumOfRounds,
    companyCTC,
    companyEligibility,
    companyJOBProfile,
    companyFirstRoundName,
    companyFirstRoundDescrip,
    companyFirstRoundDuration,
    companySecondRoundName,
    companySecondRoundDescrip,
    companySecondRoundDuration,
    companyThirdRoundName,
    companyThirdRoundDescrip,
    companyThirdRoundDuration,
    companyFourthRoundName,
    companyFourthRoundDescrip,
    companyFourthRoundDuration,
    companyAdditionalRoundDescrip,
    companyReportApprovalStatus,
    companyPracticeDetails,
    companyReportAddDate,
    companyReportAddedBy,
    companyReportYear,
    reportFeedBack,
  } = req.body;

  try {
    const data = await db
      .promise()
      .query(
        `UPDATE companydatadivided SET companyNumOfRounds = ?, companyCTC = ?, companyEligibility = ?, companyJOBProfile = ?, companyFirstRoundName = ?, companyFirstRoundDescrip = ?, companyFirstRoundDuration = ?, companySecondRoundName = ?, companySecondRoundDescrip = ?, companySecondRoundDuration = ?, companyThirdRoundName = ?, companyThirdRoundDescrip = ?, companyThirdRoundDuration = ?, companyFourthRoundName = ?, companyFourthRoundDescrip = ?, companyFourthRoundDuration = ?, companyAdditionalRoundDescrip = ?, companyReportApprovalStatus = ?, companyPracticeDetails = ?, companyReportAddDate = ?, companyReportAddedBy = ?, companyReportYear = ?, reportFeedBack = ? WHERE dataID = ?`,
        [
          companyNumOfRounds,
          companyCTC,
          companyEligibility,
          companyJOBProfile,
          companyFirstRoundName,
          companyFirstRoundDescrip,
          companyFirstRoundDuration,
          companySecondRoundName,
          companySecondRoundDescrip,
          companySecondRoundDuration,
          companyThirdRoundName,
          companyThirdRoundDescrip,
          companyThirdRoundDuration,
          companyFourthRoundName,
          companyFourthRoundDescrip,
          companyFourthRoundDuration,
          companyAdditionalRoundDescrip,
          companyReportApprovalStatus,
          companyPracticeDetails,
          companyReportAddDate,
          companyReportAddedBy,
          companyReportYear,
          reportFeedBack,
          id,
        ]
      );
    res.status(201).json({ data: data[0] });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};
const deleteCompanyData = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  try {
    // Delete the company record
    const data = await db
      .promise()
      .query(`DELETE FROM companydatadivided WHERE dataID = ${parseInt(id)}`);

    res.status(201).json({ data: data[0] });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};
const getCompanyData = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  try {
    const data = await db.promise().query(`SELECT *
            FROM companydatadivided
            LEFT JOIN company ON companydatadivided.companyID = company.companyID
            LEFT JOIN users ON companydatadivided.companyReportAddedBy = users.userID
            LEFT JOIN class ON company.companyClass = class.classID WHERE companydatadivided.companyID = ${parseInt(
              id
            )}`);

    if (!data[0]) {
      return next(CustomErrorHandler.wrongCredentials());
    }

    return res.status(200).json({ data: data[0] });
  } catch (error) {
    console.log(error);
    return next(CustomErrorHandler.serverError());
  }
};
module.exports = {
  addCompanyData,
  getCompanyDataDivided,
  updateCompanyData,
  deleteCompanyData,
  getCompanyData,
};
