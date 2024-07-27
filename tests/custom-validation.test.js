import Joi, { func } from "joi";

describe("custom validation", function () {
  it("should can create custom validation", function () {
    const registerSchema = Joi.object({
      username: Joi.string().required().min(3).max(100).email(),
      password: Joi.string()
        .required()
        .min(6)
        .max(100)
        .custom((value, helpers) => {
          if (value.startsWith("sayang")) {
            return helpers.error("password.wrong");
          }
          return value;
        })
        .messages({
          "password.wrong": "password can not start with sayang",
        }),
      confirmPassword: Joi.string().required().min(6).max(100),
    })
      .custom((value, helpers) => {
        if (value.password !== value.confirmPassword) {
          return helpers.error("register.password.different");
        }
        return value;
      })
      .messages({
        "register.password.different":
          "password and confirmPassword is different",
      });

    const requestFalse = {};
    const resultFalse = registerSchema.validate(requestFalse, {
      abortEarly: false,
    });
    console.info(resultFalse);

    const requestTrue = {
      username: "sayang@kamu.com",
      password: "TOlol123",
      confirmPassword: "TOlol123",
    };
    const resultTrue = registerSchema.validate(requestTrue, {
      abortEarly: false,
    });
    console.info(resultTrue);
  });
});
