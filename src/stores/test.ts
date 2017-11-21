import { observable, action } from 'mobx';
import utils from '../utils';

class Test {
    @observable list: any = [];

    @action getTree(cfg?: any) {
        utils.ajax({
            baseURL: 'https://cnodejs.org/api/v1',
            url: '/topics',
            params: {

            }
        })
    }
}
