import Handlebars from "handlebars";
import fs from "fs";

interface ITemplateVars {
  [key: string]: string | number
}

interface IParseMailTemplate {
  file: string,
  vars: ITemplateVars
}

class HandlebarsMailTemplate {
  async parse({ file, vars }: IParseMailTemplate) {
    const templateFileContent = await fs.promises.readFile(file, { encoding: "utf-8" });
    const parseTemplate = Handlebars.compile(templateFileContent);

    return parseTemplate(vars);
  };
};

export { HandlebarsMailTemplate };
