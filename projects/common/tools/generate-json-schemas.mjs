import tsj from "ts-json-schema-generator";
import fs from "fs";

/** @type {(import("ts-json-schema-generator").Config & { outputFileName: string })[]} */
const configs = [
  {
    path: "src/typings/works/index.ts",
    type: "ProjectDataSchema",
    outputFileName: "works_projects.json",
  },
  {
    path: "src/typings/works/index.ts",
    type: "ContributionTranslationDataSchema",
    outputFileName: "works_contributions_translation.json",
  },
  {
    path: "src/typings/works/index.ts",
    type: "ContributionOpenSourceDataSchema",
    outputFileName: "works_contributions_opensource.json",
  },
];
const schemaDir = "schema/";
const tsconfigPath = "tsconfig.json";

// Create schema directory if it doesn't exist
if(!fs.existsSync(schemaDir)) {
  fs.mkdirSync(schemaDir);
}

// Generate and write schemas
for(const config of configs) {
  const chema = tsj.createGenerator({
    ...config,
    tsconfig: tsconfigPath,
    jsDoc: "none",
    minify: true,
  }).createSchema(config.type);
  const schemaString = JSON.stringify(chema, null, 2);

  fs.writeFile(`${schemaDir}${config.outputFileName}`, schemaString, err => {
    if(err) throw err;
  });
}
