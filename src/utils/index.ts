import axios from 'axios';
import { Param, AjaxConf, UtilsType } from '../interface';

class Utils implements Utils {
    ajax(cfg: AjaxConf) {
        let axiosInstance = axios.create({
            // 接口基础地址
            baseURL: '',
            // 接口请求方法，默认为 GET
            method: 'get',
            // 请求超时时间限制
            timeout: 5000,
            // 使用 cross-site Access-Control 请求设置
            withCredentials: false
            // response 的数据类型，可选参数: arraybuffer, blob, document, json, text, stream
        });

        axiosInstance.interceptors.request.use(function (config: any): any {
            return config;
        }, function (err: any): any {
            return Promise.reject(err);
        });

        axiosInstance.interceptors.response.use(function (response: any): any {
            const config = response.config;
            return config;
        }, function (err: any): any {
            return Promise.reject(err);
        });

        return axiosInstance.request(cfg);
    }
}


export default new Utils();
