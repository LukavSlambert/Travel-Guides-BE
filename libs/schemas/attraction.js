const S = require("fluent-json-schema");

const newAttractionSchema = S.object()
  .prop("city", S.string().required())
  .prop("name", S.string().required())
  .prop("addedBy", S.string().required())
  .prop("address", S.string().required())
  .prop("image", S.string())
  .prop("bookingLink", S.string())
  .prop("description", S.string().maxLength(400))
  .prop("priceRange", S.string().enum(["cheap", "average", "expensive"]))
  .prop("destination", S.object().prop("countryCode", S.string()))
  .prop("season", S.string().enum(["summer", "winter", "fall", "spring"]))
  .prop(
    "experience",
    S.string().enum(["culture", "nature", "shopping", "food"])
  )
  .prop(
    "attractionType",
    S.string().enum(["hotel", "restaurant", "activity"]).required()
  )
  .prop("country", S.string().required());

module.exports = newAttractionSchema;
