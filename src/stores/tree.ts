import { observable, action } from 'mobx';
import { GetTopicParam } from '../interface';
import utils from 'utils';

class Tree {
    @observable treeData: any = [];

    @action getTreeFromGitlab(cfg?: any) {
        utils.ajax({
            baseURL: 'http://172.29.20.24/api/v4',
            url: '/projects/fe%2FBs-static-ledger/repository/tree'
        }).then((res) => {
            console.log('--- res ---', res);
        });
    }
}

export default new Tree();
