const getSentiment = async (phrase) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Decide whether a phrase's sentiment is positive, neutral, or negative.\n\nphrase: \"${phrase}\"\nSentiment:`,
      temperature: 0,
      max_tokens: 6, // tokens = words
    });

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

getSentiment(
  process.argv.slice(2).join(" ") || "Let's win the world cup for the 6th time!"
);
