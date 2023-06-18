import { AxiosResponse } from "axios";
import publicApi from "./publicApi";
import { ContentType, Judger } from "@/types/config.type";



const configApi = {
    getJudgers: async () => {
        const result: AxiosResponse<Array<Judger>> = await publicApi.get('/public/judger');
        return result;
    },
    getContentTypes: async () => {
        const result: AxiosResponse<Array<ContentType>> = await publicApi.get('/public/contentTypes');
        return result;
    },

};

export default configApi;
