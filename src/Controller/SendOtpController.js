const sendOtp = async (req, res, client) => {
  const { chat, phone, otp } = req.body;
  client.getNumberId(phone).then((valid_number) => {
    if (valid_number) {
      client
        .sendMessage(valid_number._serialized, `${chat} ${otp}`)
        .then((response) => {
          res.status(200).send({ status: "success", message: "OTP sent" });
        })
        .catch((err) => {
          res.status(500).send({ status: "failed", message: err });
        });
    } else {
      res
        .status(500)
        .send({ status: "failed", message: "Phone number not found" });
    }
  });
};

module.exports = { sendOtp };
