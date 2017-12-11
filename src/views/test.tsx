import * as React from 'react';
import { observer, inject } from 'mobx-react';

@inject((stores: any): any => ({
    list: stores.Test.list,
    getList: stores.Test.getTree,
    getTreeFromGitlab: stores.Test.getTreeFromGitlab
}))
@observer
export default class Test extends React.Component<any, any> {
    componentWillMount() {
        /* const func =  */
        this.props.getList({
            page: 1,
            limit: 10
        });
        // console.log('----func ---', func);
        // func.then((data: any) => {
        //     console.log('-- daat', data);

        // })
        // this.props.getTreeFromGitlab();
    }

    componentWillReceiveProps(nextProps: any) {
        console.log('--- nexrProps ---', nextProps.list.length);
    }

    render () {
        return (
            <div>Test</div>
        )
    }
}
