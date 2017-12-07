import * as React from 'react';
import { observer, inject } from 'mobx-react';

@inject((stores: any): any => ({
    list: stores.Test.list,
    getList: stores.Test.getTree,
    getTreeFromGitlab: stores.Test.getTreeFromGitlab
}))
@observer
export default class Test extends React.Component<any, any> {
    componentDidMount() {
        console.log('--- list ---', this.props.list);
        this.props.getList({
            page: 1,
            limit: 10
        });
        this.props.getTreeFromGitlab();
    }

    render () {
        return (
            <div>Test</div>
        )
    }
}
