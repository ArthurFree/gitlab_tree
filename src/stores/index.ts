import Test from './test';
import Tree from './tree';

const stores = {
    Test,
    Tree
    // ...store
};

function configureStore() {
    if (module.hot) {
        module.hot.accept();
    }

    return stores;
}



export default configureStore;
