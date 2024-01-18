import "./App.module.scss"
import {DifferenceUseStateAndRedux} from "./components/DifferenceUseStateAndRedux.tsx";
import {DifferenceUseReduxAndReduxThunk} from "./components/DifferenceReduxAndReduxThunk.tsx";

export const App = () => {
    return (
        <>
            <DifferenceUseStateAndRedux/>
            <hr/>
            <DifferenceUseReduxAndReduxThunk/>
        </>
    )
}
