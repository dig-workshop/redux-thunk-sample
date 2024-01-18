import {pokemonSlice, setPending, setPokemon, setRejected} from "../src/redux/slices/PokemonSlice";
import {getAndSetPokemonThunk} from "../src/redux/thunks/PokemonThunk";

describe('PokemonSlice tests', () => {
    describe('reducerについて', () => {
        it('setPendingのaction時、ステートが正しく更新されていること', () => {
            const beforeState = pokemonSlice.getInitialState()
            expect(beforeState).toEqual({
                status: "initial",
                name: "initial",
                imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/999.png",
            })

            const state = pokemonSlice.reducer(
                beforeState,
                setPending()
            )

            expect(state).toEqual({
                status: 'pending',
                name: '取得中...',
                imageUrl: '取得中...'
            })
        })

        it('setPokemonのaction時、ステートが正しく更新されていること', () => {
            const beforeState = pokemonSlice.getInitialState()
            expect(beforeState).toEqual({
                status: "initial",
                name: "initial",
                imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/999.png",
            })

            const state = pokemonSlice.reducer(
                beforeState,
                setPokemon({
                    name: 'name',
                    imageUrl: 'image'
                })
            )

            expect(state).toEqual({
                status: 'fulfilled',
                name: 'name',
                imageUrl: 'image'
            })
        })

        it('setRejectedのaction時、ステートが正しく更新されていること', () => {
            const beforeState = pokemonSlice.getInitialState()
            expect(beforeState).toEqual({
                status: "initial",
                name: "initial",
                imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/999.png",
            })

            const state = pokemonSlice.reducer(
                beforeState,
                setRejected()
            )

            expect(state).toEqual({
                status:'rejected',
                name:'取得失敗',
                imageUrl:'https://img.freepik.com/free-vector/red-prohibited-sign-no-icon-warning-or-stop-symbol-safety-danger-isolated-vector-illustration_56104-912.jpg?w=1480&t=st=1704434917~exp=1704435517~hmac=83f54db37c704470ca4b7cd5607efaacc682376f90b7f7f64611ff3cbbc2669b'
            })
        })
    })

    describe('extraReducerについて', () => {
        it('pendingの時、ステートが正しく更新されていること', () => {
            const beforeState = pokemonSlice.getInitialState()
            expect(beforeState).toEqual({
                status: "initial",
                name: "initial",
                imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/999.png",
            })

            const action = {
                type: getAndSetPokemonThunk.pending.type
            }
            const afterState = pokemonSlice.reducer(beforeState, action)

            expect(afterState).toEqual({
                status:'pending',
                name:'取得中...',
                imageUrl:'取得中...'
            })
        })

        it('fulfilledの時、ステートが正しく更新されていること', () => {
            const beforeState = pokemonSlice.getInitialState()
            expect(beforeState).toEqual({
                status: "initial",
                name: "initial",
                imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/999.png",
            })

            const action = {
                type: getAndSetPokemonThunk.fulfilled.type,
                payload: {
                    name:'name',
                    imageUrl:'image'
                },
            }
            const afterState = pokemonSlice.reducer(beforeState, action)

            expect(afterState).toEqual({
                status:'fulfilled',
                name:'name',
                imageUrl:'image'
            })
        })

        it('rejectedの時、ステートが正しく更新されていること', () => {
            const beforeState = pokemonSlice.getInitialState()
            expect(beforeState).toEqual({
                status: "initial",
                name: "initial",
                imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/999.png",
            })

            const action = {
                type: getAndSetPokemonThunk.rejected.type
            }
            const afterState = pokemonSlice.reducer(beforeState, action)

            expect(afterState).toEqual({
                status:'rejected',
                name:'取得失敗',
                imageUrl:'https://img.freepik.com/free-vector/red-prohibited-sign-no-icon-warning-or-stop-symbol-safety-danger-isolated-vector-illustration_56104-912.jpg?w=1480&t=st=1704434917~exp=1704435517~hmac=83f54db37c704470ca4b7cd5607efaacc682376f90b7f7f64611ff3cbbc2669b'
            })
        })
    })
})