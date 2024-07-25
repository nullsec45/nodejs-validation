import Joi, { func } from "joi";

describe("Joi", function () {
  it("should can validate object", function () {
    const loginSchema = Joi.object({
      username: Joi.string().required().min(3).max(100).email(),
      password: Joi.string().required().min(6).max(100),
    });

    const request = {
      username: "fajar@gmail.com",
      password: "Kepolo123",
    };

    const result = loginSchema.validate(request, {
      abortEarly: true,
    });

    console.info(result);
  });

  it("should can validate nested object", function () {
    const createUserSchema = Joi.object({
      id: Joi.string().required().max(100),
      mame: Joi.string().required().max(100),
      address: Joi.object({
        street: Joi.string().required().max(200),
        city: Joi.string().required().max(100),
        country: Joi.string().required().max(100),
        zipCode: Joi.string().required().max(100),
      }).required(),
    });

    const request = {
      address: {},
    };

    const result = createUserSchema.validate(request, {
      abortEarly: false,
    });

    // console.info(result);
    if (result.error) {
      result.error.details.forEach((value) => {
        console.info(`${value.path} : ${value.message}`);
      });
    }
  });
});
