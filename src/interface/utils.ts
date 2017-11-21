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


export interface UtilsType {
    ajax(cfg: AjaxConf): any;
}
