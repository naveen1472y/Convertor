const express = require('express');
const app = express();

const cors = require("cors");
const multer = require('multer');
const docxConverter = require('docx-pdf');
const path = require("path")

app.use(cors());

//create storage file storage
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "uploads");
  },
  filename: function (req, file, cb){
    cb(null, file.originalname);
  },
})

const upload = multer({ storage: storage});

app.post("/convert", upload.single("file"), function(req, res, next){
  try {
    if(!req.file){
      return res.status(400).json({
        message: "please upload file"
      })
    }
    //output file path
    let outputPath = path.join(__dirname, "files", `${req.file.originalname}.pdf`)
    docxConverter(req.file.path, outputPath, function(err,result){
      if(err){
        console.log(err);
        return res.status(500).json({
          message: "error converting docx to pdf",
        });
      }
      res.download(outputPath, function(){
        console.log("file Downloaded");
        
      })
  
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
    })
  }
})

app.listen(3000, ()=>{
  console.log("server on");
})