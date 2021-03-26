// @ts-ignore
import * as snapshots from "cypress-plugin-snapshots/plugin";

const Plugins: Cypress.PluginConfig = (on, config) => {
  snapshots.initPlugin(on, config);
};

export default Plugins;
