import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import configureStore from 'stores';
import TreePage from './views/tree_view';
import Test from './views/test';

import 'assets/styles/index.less';

const stores = configureStore();

class Root extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        console.log('-- stores --', stores);
    }

    componentDidMount() {
        console.log('-- stores --', stores);
    }

    render() {
        return (
            <Provider {...stores}>
                <div>
                    <TreePage />
                    {/* <Test /> */}
                </div>
            </Provider>
        )
    }
}

ReactDOM.render(
	<Root />,
	document.getElementById('app')
);
