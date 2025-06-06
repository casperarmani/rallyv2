const typescriptTransform = require("i18next-scanner-typescript");

module.exports = {
  input: ["src/**/*.{ts,tsx}", "!src/next-auth*.ts"],
  options: {
    nsSeparator: false,
    defaultNs: "app",
    defaultValue: "__STRING_NOT_TRANSLATED__",
    lngs: ["en"],
    ns: ["app", "home"],
    plural: false,
    removeUnusedKeys: true,
    func: {
      list: ["t"],
    },
    resource: {
      loadPath: "public/locales/{{lng}}/{{ns}}.json",
      savePath: "public/locales/{{lng}}/{{ns}}.json",
    },
  },
  format: "json",
  fallbackLng: "en",
  transform: typescriptTransform(),
};
