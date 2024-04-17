const S = require("fluent-json-schema");

const tripSchema = S.object()
  .prop("attractionIds", S.array().items(S.string()))
  .prop("addedBy", S.string().required());

module.exports = tripSchema;
