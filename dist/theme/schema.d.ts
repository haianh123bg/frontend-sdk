import { ThemeDefinition, ThemeState } from './types';

export declare const themeVarsJsonSchema: {
    readonly type: "object";
    readonly additionalProperties: {
        readonly type: "string";
    };
};
export declare const themeDefinitionJsonSchema: {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://redai/sdk/theme-definition.schema.json";
    readonly title: "ThemeDefinition";
    readonly type: "object";
    readonly additionalProperties: false;
    readonly required: readonly ["name"];
    readonly properties: {
        readonly name: {
            readonly type: "string";
            readonly minLength: 1;
        };
        readonly vars: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly properties: {
                readonly light: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "string";
                    };
                };
                readonly dark: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "string";
                    };
                };
            };
        };
    };
};
export declare const themeStateJsonSchema: {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://redai/sdk/theme-state.schema.json";
    readonly title: "ThemeState";
    readonly type: "object";
    readonly additionalProperties: false;
    readonly required: readonly ["themeName", "mode"];
    readonly properties: {
        readonly themeName: {
            readonly type: "string";
            readonly minLength: 1;
        };
        readonly mode: {
            readonly type: "string";
            readonly enum: readonly ["light", "dark", "system"];
        };
    };
};
export type ThemeDefinitionJsonSchema = typeof themeDefinitionJsonSchema;
export type ThemeStateJsonSchema = typeof themeStateJsonSchema;
export type ThemeDefinitionFromSchema = ThemeDefinition;
export type ThemeStateFromSchema = ThemeState;
