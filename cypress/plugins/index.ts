// @ts-ignore
import { addMatchImageSnapshotPlugin } from "cypress-image-snapshot/plugin";

const Plugins: Cypress.PluginConfig = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);
};

export default Plugins;
