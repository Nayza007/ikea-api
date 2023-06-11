module.exports = (schema) => (input) => {
  const { value, error } = schema.validate(input);
  if (error) {
    console.log("1");
    throw error;
  }
  return value;
};
