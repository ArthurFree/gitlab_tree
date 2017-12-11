import { Param } from './common';

export interface AjaxConf {
    baseURL?: string;
    url?: string,
    method?: string;
    timeout?: number;
    withCredentials?: boolean;
    params?: Param,
    data?: Param,
    [propName: string]: any;
}

export interface JsonpParams {
    baseURL?: string,
    url: string,
    params?: Param,
    timeout?: number,
    success?: any,
    error?: any,
}


export interface UtilsType {
    ajax(cfg: AjaxConf): any;
}
