//     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//       !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//          !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//           !!!!!!!!!!!!!!!!!!!!!!!!!!!
//            !!!!!!!!!!!!!!!!!!!!!!!!!
//             !!!!!!!!!!!!!!!!!!!!!!!
//              !!!!!!!!!!!!!!!!!!!!!
//        !!!!!!!!!!      !       !!!!!!!!!!
//    !!!!!!!!!!!         !           !!!!!!!!!!!
// !!!!!!!!!!!  DO NOT FORMAT THIS CODE  !!!!!!!!!!!
//    !!!!!!!!!!!         !           !!!!!!!!!!!
//        !!!!!!!!!!      !       !!!!!!!!!!
//                 !!!!!!!!!!!!!!!!

const express = require("express");
const router = express.Router();
const { OpenAI } = require("openai");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const googleAPIKey = process.env.GOOGLE_MAPS_API_KEY;
const openai = new OpenAI({
  apiKey: apiKey,
});

const requestedFormatFromGPT = [
  {
    cityName: "",
    cityInfo: [{ cityCode: "", description: "" }],
    topRestaurants: [
      { name: "", description: "", budget: "" },
      { name: "", description: "", budget: "" },
      { name: "", description: "", budget: "" },
    ],
    topAttractions: [
      { name: "", description: "" },
      { name: "", description: "" },
      { name: "", description: "" },
      { name: "", description: "" },
      { name: "", description: "" },
    ],
    topHotels: [
      { name: "", description: "", budget: "" },
      { name: "", description: "", budget: "" },
      { name: "", description: "", budget: "" },
    ],
  },
];
const secondPartPrompt = `
- City name
- Some info about the city (city regional code, description)
- Top three restaurants (name, description, budget)
- Top five attractions (name, description)
- Top three hotels (name, description, budget)
Ensure that each field is filled correctly with relevant information and that five cities are returned. Double check the city regional code and make sure topHotels and topRestaurants follow the budget prerequisites, only topHotels and TopRestaurants should contain budget in it. The response should be structured in the following format:
${JSON.stringify(requestedFormatFromGPT)}`;

async function fetchPlaceDetails(placeId) {
  console.log("fetching details from google");
  try {
    const detailResponse = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: {
          key: googleAPIKey,
          place_id: placeId,
          fields: ["name", "formatted_address", "photos"],
        },
      }
    );
    return detailResponse.data.result;
  } catch (error) {
    throw new Error("Error fetching place details");
  }
}

async function fetchOpenAi(prompt, count = 1) {
  console.log("fetching from openAI");
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo-0125",
    });
    const gptResponse = completion.choices[0].message.content;
    return gptResponse;
  } catch (error) {
    if (count <= 3) {
      return fetchOpenAi(prompt, count + 1);
    }
    throw new Error(`Error fetching from openAI count-${count}`);
  }
}

function formatResponse(gptResponse, count = 1) {
  console.log("Formatting Response");
  try {
    if (typeof gptResponse === "object") {
      console.log("resp", gptResponse);
      console.log("resp", typeof gptResponse);
      return gptResponse;
    }
    const formattedResponse = JSON.parse(gptResponse);

    console.log("resp2", gptResponse);
    console.log("resp2", typeof gptResponse);
    return formattedResponse;
  } catch (error) {
    if (count <= 3) {
      return formatResponse(gptResponse, count + 1);
    }
    console.log(gptResponse);
    throw new Error(
      `Error formatting response from OpenAI count-${count},${error}`
    );
  }
}

async function fetchDataFromGoogle(arrCity, cityName, countryCode) {
  console.log("fetching data from google");
  try {
    for (const locationType of [
      "topRestaurants",
      "topAttractions",
      "topHotels",
    ]) {
      for (const location of arrCity[locationType]) {
        const googleQuery =
          location.name + ", " + cityName + ", " + countryCode;
        const response = await axios.get(
          "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
          {
            params: {
              key: googleAPIKey,
              input: googleQuery,
              inputtype: "textquery",
              fields: ["place_id"],
            },
          }
        );
        if (
          response.data.status === "OK" &&
          response.data.candidates.length > 0
        ) {
          const placeId = response.data.candidates[0].place_id;
          const placeDetails = await fetchPlaceDetails(placeId);
          if (placeDetails.name) {
            location.address =
              typeof placeDetails.address === "string" &&
              placeDetails.address.trim().length > 5
                ? placeDetails.address
                : "No Address Available";
            location.website =
              typeof placeDetails.website === "string" &&
              placeDetails.website.trim().length > 5
                ? placeDetails.website
                : "No Website Available";

            if (placeDetails.photos && placeDetails.photos.length > 0) {
              const photoReference = placeDetails.photos[0].photo_reference;
              console.log(`${placeDetails.name}`, photoReference.length);
              const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${googleAPIKey}`;
              location.image = photoUrl;
            } else {
              console.log("placeDetails", placeDetails);
              location.image = "No Image Available";
            }
          }
        }
      }
    }
  } catch (error) {
    throw new Error("Error fetching data from Google Maps API");
  }
}

router.post("/post", async (req, res) => {
  try {
    const countryCode = req.body.destination.code;
    const countryName = req.body.destination.name;
    const { season, experience, budget } = req.body;
    let experiencePrompt;
    switch (experience) {
      case "culture":
        experiencePrompt = "cultural experiences";
        break;
      case "nature":
        experiencePrompt = "natural attractions";
        break;
      case "shopping":
        experiencePrompt = "shopping destinations";
        break;
      case "cuisine":
        experiencePrompt = "local cuisine";
        break;
      case "honeymoon":
        experiencePrompt = "honeymoon destinations";
        break;
      default:
        experiencePrompt = "being great travel destinations";
        break;
    }
    const prompt =
      `Provide a list of five major tourism cities in ${countryName}(${countryCode}) during ${season} known for ${experiencePrompt}, along with details about their top restaurants(for a ${budget} budget), attractions, and hotels(for a ${budget} budget). For each city, include the following:` +
      secondPartPrompt;

    const gptResponse = await fetchOpenAi(prompt);
    const formattedResponse = formatResponse(gptResponse);

    for (const arrCity of formattedResponse) {
      await fetchDataFromGoogle(arrCity, arrCity.cityName, countryCode);
    }

    res.json({ response: formattedResponse });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
});

module.exports = router;
