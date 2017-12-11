import { observable, action, computed } from 'mobx';
import { GetTopicParam } from '../interface';
import utils from 'utils';

class Tree {
    @observable treeData: any = [];

    @action getTreeList(cfg?: any) {
        utils.ajax({
            url: '/query',
        }).then((response) => {
            console.log('--- response ---', response);
            self.treeData = response.data;
        });
    }

    @computed get finalData() {
        return self.treeData.map((item: any, index: number): any => {
            return {
                index,
                name: item.name,
                path: item.path,
                collapsed: false,
                hover: false,
                pathIndex: [],
                children: [],
                leaf: item.type !== 'tree'
            }
        })
    }
}

const self = new Tree();
export default self;
