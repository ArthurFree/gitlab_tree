import * as React from 'react';
import { observer, inject } from 'mobx-react';
import 'assets/styles/tree.less';
import { Tree, TreeNode} from 'components';

@inject((stores: any): any => ({
    treeData: stores.Tree.treeData,
    finalData: stores.Tree.finalData,
    getTreeList: stores.Tree.getTreeList,
    updateData: stores.Tree.updateData
}))
@observer
export default class TreePage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        this.props.getTreeList().then((response: any) => {
            // this.props.updateData(response.data);
            this.setState({
                data: this.modifyData(response.data)
            });
        });
    }

    componentWillReceiveProps(nextProps: any) {
        // console.log('-- next --', nextProps.finalData.map((item: any) => item));
    }

    handleExpand = (data: any, arr: any[]) => {
        // console.log('--- treepage data --', data);
        // data.children = [];
        // console.log('--- treepage arr --', arr.slice()[0].children.slice());
        if (data.leaf === true || data.children.length !== 0) return;
        this.props.getTreeList({
            params: {
                path: 'client'
            }
        }).then((response: any) => {
            data.children = data.children.concat(this.modifyData(response.data));
            this.setState({
                data: arr
            });
            // console.log('--- treepage after arr --', arr.slice()[0].children.slice());
            // this.props.updateData(arr);
        });
    }

    modifyData = (data: any) => {
        return data.map((item: any, index: any): any => {
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

    render () {
        const { data } = this.state;
        return (
            <div>
                <nav className="gitlabtree_sidebar">
                    {/* <div className="gitlabtree_views">
                        <div className="gitlabtree_view_body">
                            <ul className="jstree_container_ul">
                                <li className="jstree-node jstree-closed">1</li>
                                <li className="jstree-node jstree-closed">2</li>
                                <li className="jstree-node jstree-closed">3</li>
                                <li className="jstree-node jstree-closed">
                                    4
                                    <ul className="jstree_container_ul">
                                        <li className="jstree-node jstree-closed">4.1</li>
                                        <li className="jstree-node jstree-closed">4.2</li>
                                        <li className="jstree-node jstree-closed">
                                            5
                                            <ul className="jstree_container_ul">
                                            <li className="jstree-node jstree-closed">5.1</li>
                                            <li className="jstree-node jstree-closed">5.2</li>
                                            <li className="jstree-node jstree-closed">5.3</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div> */}
                    <TreeNode treeData={data} onExpand={this.handleExpand} />
                </nav>
            </div>
        )
    }
}
