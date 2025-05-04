import { PolicySection, OrganizationInfo } from '../types/privacy';
/**
 * Generates policy text by replacing variables in a template with organization-specific values
 * @param sectionsOrTemplate The policy sections or template string to generate text for
 * @param organizationInfoOrVariables The organization information or variable map to use for replacement
 * @returns The generated policy text or an object with the generated text and metadata
 */
export declare function generatePolicyText(sectionsOrTemplate: PolicySection[] | string, organizationInfoOrVariables: OrganizationInfo | Record<string, string>): string | {
    fullText: string;
    sectionTexts: Record<string, string>;
    missingVariables: string[];
};
