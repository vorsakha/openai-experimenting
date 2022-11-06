import * as dotenv from "dotenv";
import ora from "ora";
import { Configuration, OpenAIApi } from "openai";
import downloadImage from "./utils/donwloadImage.js";

dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const loading = ora("Loading").start();

const generateImage = async (input) => {
  try {
    const response = await openai.createImage({
      prompt: input,
      n: 1,
      size: "256x256", // 256x256 | 512×512 | 1024×1024
    });

    downloadImage(
      response.data.data[0].url,
      `./images/${input.replace(/\s/g, "_")}.png`,
      () => loading.succeed(`Image downloaded successfully.`)
    );
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

generateImage(
  process.argv.slice(2).join(" ") || "a spacesuited parrot terraforming mars"
);
