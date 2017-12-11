import * as React from 'react';
import { observer, inject } from 'mobx-react';
import 'assets/styles/tree.less';
import { Tree, TreeNode} from 'components';

@inject((stores: any): any => ({
    treeData: stores.Tree.treeData,
    finalData: stores.Tree.finalData,
    getTreeList: stores.Tree.getTreeList
}))
@observer
export default class TreePage extends React.Component<any, any> {

    componentWillMount() {
        this.props.getTreeList();
    }

    componentWillReceiveProps(nextProps: any) {
        console.log('-- next --', nextProps.finalData.map((item: any) => item));
    }

    render () {
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
                    <TreeNode treeData={this.props.finalData} />
                </nav>
            </div>
        )
    }
}
