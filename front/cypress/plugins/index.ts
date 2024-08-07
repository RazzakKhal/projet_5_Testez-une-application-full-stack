/**
 * @type {Cypress.PluginConfig}
 */
//  import * as registerCodeCoverageTasks from '@cypress/code-coverage/task';
const registerCodeCoverageTasks = require('@cypress/code-coverage/task');

 export default (on : any, config : any) => {
   return registerCodeCoverageTasks(on, config);
 };
