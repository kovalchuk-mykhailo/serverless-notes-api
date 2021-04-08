require("dotenv").config();

const fs = require("fs");
const AWS = require("aws-sdk");

const { Buffer } = require("buffer");

const getImgBuffer = (base64) => {
  const base64str = base64.replace(/^data:image\/\w+;base64,/, "");

  return Buffer.from(base64str, "base64");
};

const s3 = new AWS.S3({
  // accessKeyId: process.env.AWS_ACCESS_KEY,
  // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

const S3_BUCKET_NAME = "my-s3bucket-test-001";
const directoryPath = "wallpapers/";
const fileName = `${directoryPath}texture_default.jpg`;

const uploadFile = () => {
  fs.readFile(fileName, (err, data) => {
    if (err) throw err;

    const params = {
      Bucket: S3_BUCKET_NAME, // pass your bucket name
      Key: fileName, // file will be saved as testBucket/contacts.csv
      Body: JSON.stringify(data, null, 2),
      // Body: getImgBuffer(JSON.stringify(data, null, 2)),
      // Body: data,
      // ContentEncoding: "base64",
      ContentType: "image/jpeg",
    };

    console.log(`File read successfully as ${data}`);

    s3.upload(params, function (s3Err, data) {
      if (s3Err) throw s3Err;

      console.log(`File uploaded successfully at ${JSON.stringify(data)}`);
      console.log(`File uploaded successfully at ${data.Location}`);
    });
  });
};

// console.log("KEY: ", process.env.AWS_ACCESS_KEY);
// console.log("SECRET_KEY: ", process.env.AWS_SECRET_ACCESS_KEY);

uploadFile();
