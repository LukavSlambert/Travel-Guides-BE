const S = require("fluent-json-schema");

const newAttractionSchema = S.object()
  .id("Attraction")
  .prop(
    "attractionType",
    S.string()
      .enum(["hotel", "restaurant", "activity"])
      .default("user")
      .required()
  )
  .prop("country", S.string().required())
  .prop("city", S.string().required())
  .prop("name", S.string().required())
  .prop("addedBy", S.string().required())
  .prop("address", S.string().required())
  .prop("image", S.string().format("url"))
  .prop("bookingLink", S.string().format("url"))
  .prop("description", S.string().maxLength(400))
  .prop("priceRange", S.string().enum(["cheap", "average", "expensive"]))
  .required();

module.exports = newAttractionSchema;
