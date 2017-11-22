import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
// import * as React from 'react';

// import configureStore from './stores';
import configureStore from 'stores';
import Test from './views/test';

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
                    Hello react!!!!!!
                    <Test />
                </div>
            </Provider>
        )
    }
}

ReactDOM.render(
	<Root />,
	document.getElementById('app')
);
