import { AjaxResponse } from "rxjs/ajax";

const getResponse = <T>(response: AjaxResponse<T>): T => response.response;
export default getResponse;
