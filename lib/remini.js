const axios = require("axios");
const FormData = require("form-data");

async function remini(imageBuffer, mode = "enhance") {
  return new Promise(async (resolve, reject) => {
    const validModes = ["enhance", "recolor", "dehaze"];
    if (!validModes.includes(mode)) mode = "enhance";

    const apiUrl = `https://inferenceengine.vyro.ai/${mode}`;
    
    try {
      const formData = new FormData();
      formData.append("model_version", 1);
      formData.append("image", Buffer.from(imageBuffer), {
        filename: "enhanced_image.jpg",
        contentType: "image/jpeg",
      });

      const response = await axios.post(apiUrl, formData, {
        headers: {
          ...formData.getHeaders(),
          "User-Agent": "okhttp/4.9.3",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip",
        },
        responseType: "arraybuffer",
      });

      resolve(Buffer.from(response.data));
    } catch (error) {
      reject(`❌ Error processing image: ${error.message}`);
    }
  });
}

module.exports.remini = remini;
