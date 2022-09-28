import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  // //Find the absolute path of the data directory
  // const dataDirectory = path.join(process.cwd(), "data");
  // //Read the file data.json
  // const fileContents = await fs.readFile(dataDirectory + "/data.json", "utf8");
  // //Return the content of the data file in json format

  const importAll = (r) => {
    return r.keys().map(r);
  };
  const listOfImages = importAll(
    require.context("/public/images/", false, /\.(png|jpe?g|svg|webp|gif)$/)
  );

  res.status(200).json(listOfImages);
}
