import ReactDOM from 'react-dom/client'
import './index.module.scss'
import {Provider} from 'react-redux'
import {store} from "./redux/store.ts";
import {App} from "./App.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App/>
    </Provider>
)
