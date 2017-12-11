import axios from 'axios';
import { Param, AjaxConf, UtilsType, JsonpParams } from '../interface';

class Utils implements Utils {

    noop() {}

    isFunction(func: any) {
        return typeof func === 'function';
    }

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
            // const config = response.config;
            return response;
        }, function (err: any): any {
            return Promise.reject(err);
        });

        return axiosInstance.request(cfg);
    }

    jsonp(cfg: JsonpParams) {
        const config = Object.assign({}, {
            baseURL: 'http://172.29.20.24/api/v4',
            url: '',
            params: {},
            timeout: 5000,
            success: this.noop,
            error: this.noop,
        }, cfg);
        const self = this;
        let abortTimeout: any;
        let responseData: any;
        let hyphens: string = '?';

        if (!config.url) throw new Error('url不能为空');

        // load/error 事件监听函数
        function statusEvent(event: any) {
            clearTimeout(abortTimeout);
            document.head.removeChild(scriptEle);
            console.log('--- this ----', this);
            if (event.type === 'error' || !responseData) {
                self.isFunction(config.error) && config.error();
            } else {
                self.isFunction(config.success) && config.success();
            }

            console.log('---- success ---', event);
        }

        const scriptEle = document.createElement('script');

        scriptEle.addEventListener('load', statusEvent, false);

        scriptEle.addEventListener('error', statusEvent, false);

        const query = Object.keys(config.params).map((item: any) => `${item}=${config.params[item]}`).join('&');

        if (config.url.indexOf('?') > -1) {
            hyphens = '&';
        }

        scriptEle.src = `${config.baseURL}${config.url}${hyphens}${query}`;

        document.head.appendChild(scriptEle);

        if (config.timeout) {
            abortTimeout = setTimeout(() => {
                document.head.removeChild(scriptEle);
                throw new Error('请求超时!!!');
            }, config.timeout)
        }
    }
}


export default new Utils();
