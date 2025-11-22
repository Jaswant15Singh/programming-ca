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
           officer_contact = $4,
           updated_date = NOW()
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

module.exports = { updateOfficer };
