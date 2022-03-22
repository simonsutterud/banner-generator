const express = require("express");
const { spawn } = require("child_process");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const rateLimit = require("express-rate-limit");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./img/logo");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fieldSize: 10 * 1024 * 1024 },
});

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 5 minutes
  max: 10, // limit each IP to 5 requests per windowMs
});

const app = express();

app.use(express.json());

app.use(cors());

app.use(limiter);

app.post("/create-banner", upload.single("logo"), (req, res) => {
  const { clubName, bgColor } = req.body;
  const logoPath = path.join(__dirname + "/" + req.file.path);

  console.log(clubName, bgColor, logoPath);

  const pythonScript = spawn("python3", [
    "bannerGenerator.py",
    clubName.toString(),
    logoPath.toString(),
    bgColor.toString(),
  ]);

  pythonScript.stdout.on("data", (data) => {
    data = data.toString();
    console.log(data);

    if (data) {
      jsonData = JSON.parse(data);
      console.log(jsonData);
      console.log(jsonData.banner);
      console.log(path.join(__dirname + jsonData.banner));
      res.sendFile(path.join(__dirname + jsonData.banner));
    } else {
      res.status(500).json({
        status: "fail",
        message: "Det skjedde en feil. Vennligst prøv igjen om litt!",
      });
    }
    fs.rm(req.file.path, () => console.log("logo deleted"));
    fs.rm(path.join(__dirname + data.banner), () =>
      console.log("banner deleted")
    );
  });

  pythonScript.stderr.on("data", (data) => {
    data = data.toString();
    console.log(data);
    res.status(500).send({
      status: "fail",
      message: "Det skjedde en feil. Vennligst prøv igjen om litt!",
    });
  });

  pythonScript.on("exit", (code) => {
    console.log("Exited with code " + code);
  });
});

app.listen(process.env.PORT || 4000, () =>
  console.log("Listening on port 4000")
);
