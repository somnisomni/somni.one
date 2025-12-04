import tsj from "ts-json-schema-generator";
import fs from "fs";

/** @type {(import("ts-json-schema-generator").Config & { output: string })[]} */
const configs = [
  {
    path: "src/typings/works/index.ts",
    type: "ProjectDataSchema",
    output: "schema/works_projects.json",
  },
  {
    path: "src/typings/works/index.ts",
    type: "ContributionTranslationDataSchema",
    output: "schema/works_contributions_translation.json",
  },
  {
    path: "src/typings/works/index.ts",
    type: "ContributionOpenSourceDataSchema",
    output: "schema/works_contributions_opensource.json",
  },
];
const tsconfigPath = "tsconfig.json";

for(const config of configs) {
  const chema = tsj.createGenerator({
    ...config,
    tsconfig: tsconfigPath,
    jsDoc: "none",
    minify: true,
  }).createSchema(config.type);
  const schemaString = JSON.stringify(chema, null, 2);

  fs.writeFile(config.output, schemaString, err => {
    if(err) throw err;
  });
}
