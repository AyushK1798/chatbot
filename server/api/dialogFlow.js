import express from "express";
import dialogflow from "dialogflow";
import config from "../config/chat.js";

const projectId = config.googleProjectId;
const sessionId = config.dialogFlowSessionID;

// Create a new session
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const router = express.Router();

router.post("/textQuery", async (req, res) => {
  // The text query request.
  if (!req.body.text) {
    res.send("Please send text");
  } else {
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: req.body.text,
          // The language used by the client (en-US)
          languageCode: "en-US",
        },
      },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log("Detected intent");
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`No intent matched.`);
    }
    res.send(result);
  }
});
export default router;
