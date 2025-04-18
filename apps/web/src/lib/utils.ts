import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as yaml from "js-yaml";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert YAML string to JSON object
 * @param yamlString YAML string
 * @returns JSON object
 */
export function yamlToJson(yamlString: string): any {
  try {
    return yaml.load(yamlString);
  } catch (error) {
    console.error("Error parsing YAML:", error);
    return {};
  }
}

/**
 * Convert JSON object to YAML string
 * @param json JSON object
 * @returns YAML string
 */
export function jsonToYaml(json: any): string {
  try {
    return yaml.dump(json, {
      indent: 2,
      lineWidth: -1,
      noRefs: true,
    });
  } catch (error) {
    console.error("Error converting to YAML:", error);
    return "";
  }
}
