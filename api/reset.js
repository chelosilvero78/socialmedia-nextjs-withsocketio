const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const baseUrl = require("../utils/baseUrl");
const isEmail = require("validator/lib/isEmail");
const options = {
  auth: {
    api_key: process.env.sendGrid_api
  }
};

const transporter = nodemailer.createTransport(sendGridTransport(options));

// CHECK USER EXISTS AND SEND EMAIL FOR RESET PASSWORD(COMPRUEBE QUE EL USUARIO EXISTE Y ENVÍE UN CORREO ELECTRÓNICO PARA RESTABLECER LA CONTRASEÑA)
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!isEmail(email)) {
      return res.status(401).send("Email Invalido");
    }

    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.expireToken = Date.now() + 3600000;

    await user.save();

    const href = `${baseUrl}/reset/${token}`;

    const mailOptions = {
      to: user.email,
      from: "singh.inder5880@gmail.com",
      subject: "Solicitud de restablecimiento de contraseña",
      html: `<p>Hola ${user.name
        .split(" ")[0]
        .toString()}, Hubo una solicitud de restablecimiento de contraseña. <a href=${href}> Haga clic en este enlace para restablecer la contraseña </a>   </p>
      <p>Este token es válido por solo 1 hora.</p>`
    };

    transporter.sendMail(mailOptions, (err, info) => err && console.log(err));

    return res.status(200).send("Correo electrónico enviado con éxito");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// VERIFY THE TOKEN AND RESET THE PASSWORD IN DB (VERIFICAR EL TOKEN Y RESTABLECER LA CONTRASEÑA EN DB)s

router.post("/token", async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token) {
      return res.status(401).send("No autorizado");
    }

    if (password.length < 6)
      return res.status(401).send("La contraseña debe tener al menos 6 caracteres");

    const user = await UserModel.findOne({ resetToken: token });

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    if (Date.now() > user.expireToken) {
      return res.status(401).send("Token caducado. Generar una nueva");
    }

    user.password = await bcrypt.hash(password, 10);

    user.resetToken = "";
    user.expireToken = undefined;

    await user.save();

    return res.status(200).send("Password actualizado");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
