import * as React from 'react';
import { observer, inject } from 'mobx-react';
import * as classNames from 'classnames';
import './tree.less';

const finishData = [
    {
        name: 'client',
        path: 'client',
        collapsed: false,
        children: [
            {
                name: '',
                path: '',
                collapsed: false,
                leaf: true
            }
        ],
        leaf: false
    }
]

const mockData = [
    {
        "id": "33ef0c129103241e552fcd47b5973ac5bfc350f2",
        "name": "client",
        "type": "tree",
        "path": "client",
        "mode": "040000"
    },
    {
        "id": "14cf5ec058b35907c2abd56f2354f9efb539aeb0",
        "name": "public",
        "type": "tree",
        "path": "public",
        "mode": "040000"
    },
    {
        "id": "068bcc3fa04a4a999cb7e7da12c089d27efa6031",
        "name": ".babelrc",
        "type": "blob",
        "path": ".babelrc",
        "mode": "100644"
    },
    {
        "id": "198885c119b3cbf0187bfbe9031eaf68ce5276e7",
        "name": ".eslintrc.js",
        "type": "blob",
        "path": ".eslintrc.js",
        "mode": "100644"
    },
    {
        "id": "ac87c25f54d5a04c1af9c2aafc74b28b8edce5d3",
        "name": ".gitignore",
        "type": "blob",
        "path": ".gitignore",
        "mode": "100644"
    },
    {
        "id": "51a76625f76a97063c8f5eace2ad05f7b85a3b9c",
        "name": ".npmrc",
        "type": "blob",
        "path": ".npmrc",
        "mode": "100644"
    },
    {
        "id": "c74cb8b5438be189183a2973d56852152dfcd404",
        "name": "Config.js",
        "type": "blob",
        "path": "Config.js",
        "mode": "100644"
    },
    {
        "id": "e5cee3a094d486357766c3d6be8e03e9284a9cb9",
        "name": "README.md",
        "type": "blob",
        "path": "README.md",
        "mode": "100644"
    },
    {
        "id": "93a0ec46efd060d2513ae78b8ab6ec7aac34e6c1",
        "name": "build.sh",
        "type": "blob",
        "path": "build.sh",
        "mode": "100755"
    },
    {
        "id": "f69a79c94dbff6305bf87722fca420a473f4044d",
        "name": "package.json",
        "type": "blob",
        "path": "package.json",
        "mode": "100644"
    },
    {
        "id": "cfc5be9ffbb114e65d24657d9ec45acc50466d35",
        "name": "webpack.config.dev.babel.js",
        "type": "blob",
        "path": "webpack.config.dev.babel.js",
        "mode": "100644"
    },
    {
        "id": "eb41d6aab657f2548c8417b6521ea6f4d9d66442",
        "name": "webpack.config.dll.babel.js",
        "type": "blob",
        "path": "webpack.config.dll.babel.js",
        "mode": "100644"
    },
    {
        "id": "265f2b0e802e488ccecf3660a050d8c6eb2beefb",
        "name": "webpack.config.js",
        "type": "blob",
        "path": "webpack.config.js",
        "mode": "100644"
    },
    {
        "id": "afc1db63d7368d965c184239f75a089a10ce4aca",
        "name": "webpack.config.prod.babel.js",
        "type": "blob",
        "path": "webpack.config.prod.babel.js",
        "mode": "100644"
    }
];

const clientMockData = [
    {
        "id": "d53f7c28005dc99092f4bf7dc16c3d15d5e78b81",
        "name": "components",
        "type": "tree",
        "path": "client/components",
        "mode": "040000"
    },
    {
        "id": "172b94ec645ce854e808aad89730776cceb8ad91",
        "name": "pages",
        "type": "tree",
        "path": "client/pages",
        "mode": "040000"
    },
    {
        "id": "b77cc99adce17113908698b709612289244f4ceb",
        "name": "template",
        "type": "tree",
        "path": "client/template",
        "mode": "040000"
    },
    {
        "id": "1f0082ebfbb96840622aedf1a52d82b6baf04def",
        "name": "utils",
        "type": "tree",
        "path": "client/utils",
        "mode": "040000"
    },
    {
        "id": "d66826168ee04eebbe45899b73122ff880ad67a3",
        "name": "Root.js",
        "type": "blob",
        "path": "client/Root.js",
        "mode": "100644"
    }
];

export default class TreeNode extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        console.log('---- props-data ----', this.props.treeData);
    }
    // static defaultProps = {
    //     data: finishData
    // }

    // data: any[] = []
    state: any = {
        data: []
    }

    isHover: boolean = false

    componentWillReceiveProps(nextProps: any) {
        console.log('---- componentWillReceiveProps props data ----'/* , nextProps.treeData.slice()[0].children.slice() */);
        this.setState({
            data: nextProps.treeData
        });
    }

    componentDidMount() {
        const data = mockData.map((item: any, index: number): any => {
            let pathArr: number[] = [];
            if (item.name === 'client') {
                return {
                    index,
                    name: item.name,
                    path: item.path,
                    collapsed: false,
                    hover: false,
                    pathIndex: pathArr.push(index),
                    children: clientMockData.map((value: any, ind: number): any => {
                        return {
                            index: ind,
                            name: value.name,
                            path: value.path,
                            collapsed: false,
                            hover: false,
                            pathIndex: pathArr.push(ind),
                            children: [],
                            leaf: value.type !== 'tree'
                        }
                    }),
                    leaf: item.type !== 'tree'
                }
            }
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

        // this.setState({
        //     data,
        // });
    }

    renderTree = (data: any[]) => {
        const commonClass = ['icon', 'iconfont'];
        let node = data.map((item: any, index: number, arr: any[]): any => {
            const collapsed = item.collapsed;
            return (
                <li className="tree_node" key={index}
                    // onMouseEnter={this.handleMouse(item, true, this.handleMouseCb)}
                    // onMouseLeave={this.handleMouse(item, false, this.handleMouseCb)}
                    onClick={this.handleClick(item, arr)}>

                    <div className={ classNames('tree_node_shadow', { 'tree_node_shadow_hover': item.hover }) }
                        onMouseEnter={this.handleMouseEnter(item)}
                        onMouseLeave={this.handleMouseLeave(item)}></div>

                    <div className="tree_node_content"
                        onMouseEnter={this.handleMouseEnter(item)}
                        onMouseLeave={this.handleMouseLeave(item)}>
                        {
                            !item.leaf ? (
                                <i className={classNames(...commonClass, {
                                    'tree_icon-triangle': !collapsed,
                                    'tree_triangle': !collapsed,
                                    'tree_icon-triangle-right': collapsed,
                                    'tree_triangle_right': collapsed
                                })}></i>
                            ) : null
                        }

                        <i className={classNames(...commonClass, {
                            'tree_icon-folder': !item.leaf,
                            'tree_folder': !item.leaf,
                            'tree_icon-file': item.leaf,
                            'tree_file': item.leaf
                        })}></i>

                        <span className="tree_node_text">{ item.name }</span>
                    </div>

                    {/* <div className="tree_node_content">

                    </div> */}

                    {
                        item.collapsed && item.children && !item.leaf && item.children.length !== 0 ? (
                            <ul className="tree_inner_ul">
                                { this.renderTree(item.children) }
                            </ul>
                        ) : null
                    }
                </li>
            )
        })

        return node;
    }

    handleClick = (currData: any, arr: any[]) => {
        const self = this;
        return function (event: any) {
            const { onExpand } = self.props;
            if (onExpand && typeof onExpand === 'function') onExpand(currData, arr);
            self.handleCommonMouse.call(self, currData, 'collapsed', true, event);
        }
    }

    handleMouseEnter = (currData: any) => {
        const self = this;
        return function (event: any) {
            if (self.isHover) return;
            self.isHover = true;
            self.handleCommonMouse.call(self, currData, 'hover', false, event, true);
        }
    }

    handleMouseLeave = (currData: any) => {
        const self = this;
        return function (event: any) {
            if (!self.isHover) return;
            self.isHover = false;
            self.handleCommonMouse.call(self, currData, 'hover', false, event, false);
        }
    }

    handleCommonMouse = (currData: any, property: string, isPropagation?: boolean, event?: any, value?: boolean) => {
        isPropagation ? event.stopPropagation() : null;
        currData[property] = value == undefined ? !currData[property] : value;
        // console.log('--- this ---', this);
        this.setState({
            data: [...this.state.data]
        });
    }

    render () {
        const { data } = this.state;
        return (
            <ul className="tree_default tree_container_ul">
                {this.renderTree(data)}
            </ul>
        )
    }
}
