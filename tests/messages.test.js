import Joi, { func } from "joi";

describe("Test Custom Messages", function () {
  it("should can use custom messages", function () {
    const schema = Joi.string().min(3).max(5).required().messages({
      "string.min": "{{#label}} panjang harus lebih dari {{#limit}} karakter",
      "string.max": "{{#label}} panjang harus kurang dari {{#limit}} karakter",
    });

    const request = "Fadhillah";
    const result = schema.validate(request);
    console.info(result);
  });

  it("should can use custom messages in object validation", function () {
    const schema = Joi.object({
      email: Joi.string().required().email().messages({
        "any.required": "{{#label}} harus diisi",
        "string.email": "{{#label}} harus valid email",
      }),
      password: Joi.string().required().min(6).max(30).messages({
        "any.required": "{{#label}} harus diisi",
        "string.min": "{{#label}} harus lebih dari {{#limit}} karakter",
        "string.max": "{{#label}} harus kurang dari {{#limit}} karakter",
      }),
    });

    const requestFalse = {};
    const resultFalse = schema.validate(requestFalse);
    console.info(resultFalse);

    const requestTrue = {
      email: "fajar@gmail.com",
      password: "PasswordBangetGakTuch",
    };
    const resultTrue = schema.validate(requestTrue);
    console.info(resultTrue);
  });
});
