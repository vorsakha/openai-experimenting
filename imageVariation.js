import * as dotenv from "dotenv";
import ora from "ora";
import fs from "fs";
import { Configuration, OpenAIApi } from "openai";
import downloadImage from "./utils/donwloadImage.js";

dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const loading = ora("Loading").start();

const generateImageVariation = async (image) => {
  try {
    const response = await openai.createImageVariation(
      fs.createReadStream(image),
      4,
      "256x256" // 256x256 | 512×512 | 1024×1024
    );

    response.data.data.forEach((image, index) => {
      downloadImage(image.url, `./images/${index}.png`, () =>
        loading.succeed(`Image ${index} downloaded successfully.`)
      );
    });
  } catch (error) {
    if (error.response) {
      loading.fail(error.response.status);
      console.log(error.response.data);
    } else {
      loading.fail(error.message);
      console.log(error.message);
    }
  }
};

generateImageVariation(process.argv.slice(2).join(" ") || "./example.png");
