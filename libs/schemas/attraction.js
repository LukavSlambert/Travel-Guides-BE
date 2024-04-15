const S = require("fluent-json-schema");

const newAttractionSchema = S.object()
  .prop(
    "attractionType",
    S.string().enum(["hotel", "restaurant", "activity"]).required()
  )
  .prop("country", S.string().required())
  .prop("city", S.string().required())
  .prop("name", S.string().required())
  .prop("addedBy", S.string().required())
  .prop("address", S.string().required())
  .prop("image", S.string())
  .prop("bookingLink", S.string())
  .prop("description", S.string().maxLength(400))
  .prop("priceRange", S.string().enum(["cheap", "average", "expensive"]))
  .required();

module.exports = newAttractionSchema;
