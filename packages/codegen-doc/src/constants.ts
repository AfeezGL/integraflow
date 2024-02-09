export const Doc = {
  MUTATION_TYPES: [
    "update",
    "archive",
    "unarchive",
    "delete",
    "suspend",
    "unsuspend",
    "upgrade",
    "refresh",
    "reset",
    "capture",
    "create",
    "join"
  ],
  SCALAR_STRING_NAMES: ["TimelessDateScalar"],
  SCALAR_STRING_TYPE: "string",
  SCALAR_DATE_NAMES: ["DateTime", "TimelessDateScalar"],
  SCALAR_DATE_TYPE: "Date",
  SCALAR_JSON_NAMES: ["JSON", "JSONObject"],
  SCALAR_JSON_TYPE: "Record<string, unknown>",
};
