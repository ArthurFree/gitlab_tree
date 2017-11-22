import Test from './test';

const stores = {
    Test
    // ...store
};

function configureStore() {
    if (module.hot) {
        module.hot.accept();
    }

    return stores;
}



export default configureStore;
