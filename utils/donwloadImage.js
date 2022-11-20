import request from "request";
import fs from "fs";

export default (url, path, callback) => {
  // eslint-disable-next-line no-unused-vars
  request.head(url, (err, res, body) => {
    request(url).pipe(fs.createWriteStream(path)).on("close", callback);
  });
};
