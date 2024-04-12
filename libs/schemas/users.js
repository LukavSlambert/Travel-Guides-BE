const S = require('fluent-json-schema');

const newUserSchema = S.object()
    .additionalProperties(false)
    .prop('username', S.string().required())
    .prop('email', S.string().required())
    .prop('password', S.string().required())

exports.newUserSchema = newUserSchema;