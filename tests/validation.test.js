import Joi, { func } from "joi";

describe("Joi", function () {
  it("should can create schema", function () {
    const schema = Joi.string().min(3).max(100).required();

    const result = schema.validate("e");

    if (result.error) {
      console.info(
        "Validasi gagal seperti yang diharapkan:",
        result.error.message
      );
    }
  });

  it("should can validate basic data type", function () {
    const usernameSchema = Joi.string().email().required();
    const isAdminSchema = Joi.boolean().required();
    const prismaSchema = Joi.number().required().min(10000).max(10000000000);

    const resultUsername = usernameSchema.validate("fajar");
    console.info(resultUsername);

    const resultIsAdmin = isAdminSchema.validate(true);
    console.info(resultIsAdmin);

    const resultPrice = prismaSchema.validate("100000");
    console.info(resultPrice);
  });
});
