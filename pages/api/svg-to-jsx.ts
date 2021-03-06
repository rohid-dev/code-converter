import { transform } from "@svgr/core";
import { NextApiRequest, NextApiResponse } from "next";
import httpStatusCode from "../../utils/httpStatusCode";
import prettify from "../../utils/prettier";
require("@svgr/plugin-svgo");
require("@svgr/plugin-jsx");
require("@svgr/plugin-prettier");

const ConvertSvgToJsx = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    let jsx = await transform(req.body.svg, req.body.config, req.body.state);
    jsx = prettify(jsx);
    res.status(httpStatusCode.OK).send({ jsx });
  } catch (error) {
    res.status(httpStatusCode.BAD_REQUEST).send({ message: error.message });
  }
};
export default ConvertSvgToJsx;
