const stores = {
    // ...store
};

function configureStore() {
    if (module.hot) {
        module.hot.accept();
    }

    return stores;
}



export default configureStore;
