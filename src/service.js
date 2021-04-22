import axios from "axios";
import { url, queryOptions, throwError} from "./constants.js";

const getXmlAnswer = () => axios.get(url, queryOptions).then((response) => response.data).catch(error => throwError(error));

export { getXmlAnswer };
