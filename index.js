const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const app = require("express")();
const bodyParser = require("body-parser");
const { sendOtp } = require("./src/Controller/SendOtpController");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox"],
  },
});

client.on("qr", (qr) => qrcode.generate(qr, { small: true }));

client.on("ready", () => console.log("Client already to use"));

app.post("/send-otp", (req, res) => {
  sendOtp(req, res, client);
});

client.initialize();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
