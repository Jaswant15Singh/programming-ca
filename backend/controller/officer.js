const { executeQuery } = require("../utils/db");

const updateOfficer = async (req, res) => {
  const { officer_id } = req.params;
  const { officer_name, officer_address, officer_email, officer_contact } =
    req.body;

  try {
    if (!officer_id) {
      return res.status(400).json({
        message: "Missing officer ID",
        success: false,
      });
    }

    const result = await executeQuery(
      `UPDATE officer_def 
       SET officer_name = $1,
           officer_address = $2,
           officer_email = $3,
           officer_contact = $4
       WHERE officer_id = $5
       RETURNING *`,
      [
        officer_name,
        officer_address,
        officer_email,
        officer_contact,
        officer_id,
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Officer not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Officer updated successfully",
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

const getComplantsByUsers = async (req, res) => {
  try {
    const { officer_id } = req.body;
    const result = await executeQuery(
      `select * from users_def ud 
inner join complaint_def cd on ud.user_id =cd.user_id
inner join officer_def od on od.officer_id =cd.assigned_officer where od.officer_id=$1`,
      [officer_id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "No complaints",
        success: false,
        data: [],
      });
    }
    res.status(200).json({ data: result.rows });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

const updateComplaintStatusByOfficer = async (req, res) => {
  try {
    const { complaint_id, officer_id } = req.body;
    const result = await executeQuery(
      `UPDATE complaint_def set status="resolved" where complaint_id=$1 
        and assigned_officer=$2`,
      [complaint_id, officer_id]
    );

    res.status(200).json({ message: "Status has been updated", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};
module.exports = {
  updateOfficer,
  getComplantsByUsers,
  updateComplaintStatusByOfficer,
};
