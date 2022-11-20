import ora from "ora";
import { openai } from "./openai/index.js";

const loading = ora("Loading").start();

const getInput = async (phrase) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      // eslint-disable-next-line no-useless-escape
      prompt: `Write a response in 15 words to the phrase as if you are Kanye West.\n\nphrase: \"${phrase}\"\nresponse:`,
      temperature: 0,
      max_tokens: 15, // tokens = words
    });
    console.log(response.data.choices);
    loading.succeed(response.data.choices[0].text);
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

getInput(process.argv.slice(2).join(" ") || "You rock!");
