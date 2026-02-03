import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import prettier from "eslint-plugin-prettier/recommended";
import vueConfigTypescript from "@vue/eslint-config-typescript";
import vueConfigPrettier from "@vue/eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },

    // js
    pluginJs.configs.recommended,
    {
        rules: {
            "no-unused-vars": "error",
            "no-undef": "error",
        },
    },

    // ts
    ...tseslint.configs.recommended,
    {
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^(props|_)",
                    varsIgnorePattern: "^(props|_)",
                },
            ],
            "@typescript-eslint/no-explicit-any": "off",
        },
    },

    // vue
    ...pluginVue.configs["flat/recommended"],
    {
        files: ["*.vue", "**/*.vue"],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
            },
        },
    },
    {
        rules: {
            ...vueConfigTypescript.rules,
            ...vueConfigPrettier.rules,
            "prettier/prettier": [
                "warn",
                {
                    singleQuote: false,
                },
            ],
            "vue/multi-word-component-names": "off",
            "vue/attribute-hyphenation": "off",
            "vue/no-v-html": "off",
            "vue/v-on-event-hyphenation": "off",
            "vue/require-v-for-key": "off",
            "vue/no-template-shadow": "error",
            "vue/no-reserved-component-names": "off",
            "vue/attributes-order": "off",
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/no-require-imports": "off",
            "vue/require-default-prop": "error",
        },
    },
    {
        ignores: ["node_modules", ".nuxt", ".output", "dist"],
    },

    // prettier
    prettier,
    {
        rules: {
            "prettier/prettier": ["warn", { singleQuote: false }],
        },
    },
];
