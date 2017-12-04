import * as React from 'react';
import { observer, inject } from 'mobx-react';

export default class Tree extends React.Component<any, any> {
    componentDidMount() {
        // console.log('--- props children ---', this.props.children);
        // React.Children.forEach(this.props.children, (item: any) => {
        //     console.log('--- props children item ---', item.type.isTreeNode)
        // })
    }

    renderTreeNode = (child: React.ReactElement<any>, index: number, level: number = 0): any => {
        const childProps = {};
        return React.cloneElement(child, childProps);
    }

    render () {
        return (
            <div>
                <ul className="tree_ul">
                    {/* React.Children.map(this.props.children, this.renderTreeNode) */}
                    {this.props.children}
                </ul>
            </div>
        )
    }
}
