import { Client } from 'fb-watchman';
var client = new Client();
client.capabilityCheck(
  { optional: [], required: ['relative_root'] },
  function (error, resp) {
    if (error) {
      // error will be an Error object if the watchman service is not
      // installed, or if any of the names listed in the `required`
      // array are not supported by the server

      console.error(error);
    }
    // resp will be an extended version response:
    // {'version': '3.8.0', 'capabilities': {'relative_root': true}}
    console.log(resp);
  }
);
