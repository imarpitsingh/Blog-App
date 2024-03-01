import { applyMiddleware, createStore, compose } from "redux";
import crud from "./reducer/crud";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import ReduxThunk from 'redux-thunk';
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: 'persist-key',
    storage
}

const mainReducer = combineReducers({
    blogs: crud
})

// Use compose to apply middleware and enhancers together
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, mainReducer);


const commonData = {
    blogs: {
        items: [
            {
                title: "React",
                category: "Web Development",
                content: "Best framework"
            }
        ]
    }
}

const store = createStore(persistedReducer, commonData, composeEnhancers(applyMiddleware(ReduxThunk)));

const persistor = persistStore(store);

export { store }
export { persistor }