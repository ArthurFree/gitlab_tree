import { observable, action } from 'mobx';
import { GetTopicParam } from '../interface';
import utils from 'utils';

class Test {
    @observable list: any = [];

    @action getTree(cfg?: any) {
        let params: GetTopicParam = {
            page: 1,
            limit: 10,
        };
        utils.ajax({
            baseURL: 'https://cnodejs.org/api/v1',
            url: '/topics',
            params,
        });
    }
}

export default new Test();
