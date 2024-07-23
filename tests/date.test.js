import Joi from "joi";

describe("Date Validate", function () {
  it("should can validate date", () => {
    const birdhDataSchema = Joi.date().required().max("now").min("1-1-1988");

    const result = birdhDataSchema.validate("1-1-1986");
    console.info(result);
    console.info(typeof result);
    console.info(typeof result.value);
    console.info(typeof result.error);

    const result2 = birdhDataSchema.validate("12-25-1995");
    console.info(result2);

    const result3 = birdhDataSchema.validate("12-25-2025");
    console.info(result3);
  });
});
