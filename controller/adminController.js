const AdminData = require("../models/adminData");
const generateToken = require("../utils/generateToken");

const adminController = {
    login: async (req, res) => {
        try {
            const { loginid, password } = req.body;
            console.log("LOGIN : ", loginid, password);
            console.log("LOGIN : ", req.body);
            if (!loginid) {
                return res.status(404).json({ message: "Login id is mandatory" });
            }
            else if (!password) {
                return res.status(404).json({ message: "Password is mandatory" });
            }

            const result = await AdminData.find({ loginId: loginid });
            const admin = result[0];
            console.log("ADMIN :", admin);
            console.log("admin.password  :", admin.password, password);

            if (admin) {
                console.log("PASSWORD CHECK :", admin.password === password);
                if (admin.password === password) {
                    const token = generateToken(admin.loginId);
                    res.status(200).json({ token, admin: { id: admin._id, loginID: admin.loginId, name: admin.name, email: admin.email } });
                }
                else {
                    return res.status(404).json({ message: "Password doesn't match" });
                }
            }
            else {
                return res.status(404).json({ message: "Admin not found" });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

module.exports = adminController;
