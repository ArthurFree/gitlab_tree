import { observable, action, computed, runInAction } from 'mobx';
import { GetTopicParam } from '../interface';
import utils from 'utils';
// import { runInAction } from 'mobx/lib/api/action';

class Test {
    @observable list: any = [];

    @action getTree(cfg?: any) {
        let params: GetTopicParam = {
            page: 1,
            limit: 10,
        };
        // this.list = [];
        utils.ajax({
            baseURL: 'https://cnodejs.org/api/v1',
            url: '/topics',
            params,
        }).then((response) => {
            console.log('--- response ---', response);
            // runInAction(() => {
            //     this.list = response.data.data;
            // });
            // this.list = response.data.data;
            self.list = response.data.data;
        });
    }

    @computed get changeData() {
        return this.list.map((item: any) => item.title);
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

const self = new Test()
export default self;
