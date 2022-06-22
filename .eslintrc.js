module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node":true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "prettier",
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        // "semi" :["error", "always"],
        // "quotes": ["error", "double"],
        "react/prop-types":["off"],
        "no-undef":"error",
        "react/jsx-props-no-spreading":"off",
    },
    "settings":{
        "react":{
            "version": "detect",
        }
    }
};