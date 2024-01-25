import { PluginValidateFn, Types } from "@graphql-codegen/plugin-helpers";
import { logger, validateExtension } from "@integraflow/codegen-doc";
import { GraphQLSchema } from "graphql";
import { SdkPluginConfig } from "./types";

const log = "codegen-sdk:validate:";

/**
 * Validate use of the plugin
 */
export const validate: PluginValidateFn = async (
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  config: SdkPluginConfig,
  outputFile: string
) => {
  const packageName = "@integraflow/codegen-sdk";
  logger.info(log, `Validating ${packageName}`);
  logger.info(log, config);

  const prefix = `${log} Plugin "${packageName}" config requires`;

  validateExtension(packageName, ".ts", outputFile);

  if (!config.documentFile || typeof config.documentFile !== "string") {
    throw new Error(`${prefix} documentFile to be a string path to a document file generated by "typed-document-node"`);
  }
};
