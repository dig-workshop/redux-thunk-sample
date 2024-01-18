import {vi} from 'vitest'
import {render} from "@testing-library/react";
import {useDispatch, useSelector} from "react-redux";
import {screen} from '@testing-library/dom'
import {userEvent} from '@testing-library/user-event'
import {DifferenceUseReduxAndReduxThunk} from "../src/components/DifferenceReduxAndReduxThunk";
import {getAndSetPokemonThunk} from "../src/redux/thunks/PokemonThunk";

vi.mock('react-redux')
vi.mock('../src/redux/thunks/PokemonThunk')

describe('app tests', () => {
    it('redux-thunkのボタンを押した時、dispatchでgetAndSetPokemonThunkを呼んでいること', async () => {
        // useSelectorをmockしないとレンダリングできない
        vi.mocked(useSelector).mockReturnValueOnce({})

        // useDispatchの返り値にspyを入れることで呼び出しのテストをする
        const spyDispatch = vi.fn()
        vi.mocked(useDispatch).mockReturnValueOnce(spyDispatch)

        // dispatchに入れるthunk関数の返り値はvoidなのでmockして返り値を入れてテストする(lintに怒られるので無視する)
        vi.mocked(getAndSetPokemonThunk).mockReturnValueOnce(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            'hoge'
        )

        render(<DifferenceUseReduxAndReduxThunk/>)

        const reduxThunkButton = screen.getByText('pokeAPIのレスポンスをreduxステートにセット(redux-thunk)')
        await userEvent.click(reduxThunkButton)

        // redux-thunkを使うことでviewのテストではapiの呼び出しをテストしなくて良くなる
        expect(spyDispatch).toHaveBeenCalledWith('hoge')
        expect(getAndSetPokemonThunk).toHaveBeenCalled()
    })
})