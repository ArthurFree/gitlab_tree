import * as React from 'react';
import { observer, inject } from 'mobx-react';

@inject((stores: any): any => ({
    list: stores.Test.list
}))
@observer
export default class Test extends React.Component<any, any> {
    componentDidMount() {
        console.log('--- list ---', this.props.list);
    }

    render () {
        return (
            <div>Test</div>
        )
    }
}
