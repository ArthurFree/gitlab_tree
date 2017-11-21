import{ h, render, Component } from 'preact';
import { Provider } from 'mobx-react';

import configureStore from './stores';

const stores = configureStore();

class Root extends Component<any, any> {
    constructor(props: any) {
        super(props);
        console.log('-- stores --', stores);
    }

    componentDidMount() {
        console.log('-- stores --', stores);
    }

    render() {
        return (
            <div>Hello Preact!!!!!!</div>
        )
    }
}

render(
	<Root />,
	document.getElementById('app')
);
