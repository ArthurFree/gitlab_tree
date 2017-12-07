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
        }).then((response) => {
            console.log('--- response ---', response);
        });
    }

    @action getTreeFromGitlab(cfg?: any) {
        utils.ajax({
            baseURL: 'http://localhost:8081/',
            url: '/api/v4/projects/fe%2FBs-static-ledger/repository/tree',
        }).then((res) => {
            console.log('--- res ---', res);
        });
    }
}

export default new Test();
