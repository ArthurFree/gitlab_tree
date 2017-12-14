import { observable, action, computed } from 'mobx';
import { GetTopicParam } from '../interface';
import utils from 'utils';

class Tree {
    @observable treeData: any = [];

    @action getTreeList(cfg?: any) {
        cfg = cfg || {};
        return utils.ajax(Object.assign({
            url: '/query',
        }, cfg));
    }

    @action updateData(data: any) {
        self.treeData = data.map((item: any, index: number): any => {
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
        });
    }

    @computed get finalData() {
        return self.treeData.map((item: any) => item);
    }

    // @computed get finalData() {
    //     return self.treeData.map((item: any, index: number): any => {
    //         return {
    //             index,
    //             name: item.name,
    //             path: item.path,
    //             collapsed: false,
    //             hover: false,
    //             pathIndex: [],
    //             children: [],
    //             leaf: item.type !== 'tree'
    //         }
    //     })
    // }
}

const self = new Tree();
export default self;
