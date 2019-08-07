import {pieces, players} from '../components/chess/chess';

const state = {
    board: [],
    vm: null,   // reference to Board.vue instance
    game: null,
    selected: null,
    onTurn: players.white
};

const mutations = {
    selectTile (state, tile) {
        state.selected = {
            index: tile.index,
            piece: tile.piece
        }
    },
    moveTile (state, to) {
        state.board.splice(to.index, 1, state.board[state.selected.index]);
        state.board.splice(state.selected.index, 1, 0);
        state.onTurn = state.game.onTurn = (state.onTurn === players.white ? players.black : players.white);
        state.selected = null;
    },
    updateBoard (state, board) {
        state.board = board;
        state.vm.tiles = state.board;
    },
    setVm (state, vm) {
        state.vm = vm;
    },
    setGame (state, game) {
        state.game = game;
    }
};

const actions = {
    move: ({commit, dispatch}, tile) => {
        if (!state.selected) {
            dispatch('canSelect', tile).then(res => {
                if (res) {
                    console.log('select');
                    commit('selectTile', tile);
                    dispatch('highlightTiles', tile);
                } else {
                    tile.vm.selected = false;
                }
            });
        } else {
            if (tile.index !== state.selected.index && tile.valid) {
                console.log('move');
                commit('moveTile', tile);
                commit('updateBoard', state.board);
            }
            state.selected = null;
            dispatch('endMove');
        }
    },
    canSelect: ({commit, dispatch}, tile) => {
        if (tile.piece !== pieces.empty) {
            if (state.onTurn === players.white && tile.piece < pieces.bKing)
                return true;
            else if (state.onTurn === players.black && tile.piece >= pieces.bKing)
                return true;
        }
        return false;
    },
    highlightTiles: ({commit, dispatch}, tile) => {
        switch (tile.piece) {
            case pieces.wKing: case pieces.bKing:
                break;
            case pieces.wQueen: case pieces.bQueen:
                break;
            case pieces.wRook: case pieces.bRook:
                break;
            case pieces.wBishop: case pieces.bBishop:
                break;
            case pieces.wKnight: case pieces.bKnight:
                break;
            case pieces.wPawn: case pieces.bPawn:
                dispatch('pawnMove', tile);
                break;
        }
    },
    pawnMove: ({state}, tile) => {
        console.log('pawn move');
        let side = tile.piece > 6 ? -1 : 1; // pieces.bKing = 6,   6+ is black
            let id = tile.index+(8*side);
            // pohyb o 1 dopredu
            if (id < 64 && id >= 0)
                if (state.vm.$children[id].piece === pieces.empty)
                    state.vm.$children[id].valid = true;
            // utok doprava
            if (id+1 < 64 && id+1 >= 0 )
                if (state.vm.$children[id+1].piece !== pieces.empty)
                    state.vm.$children[id+1].valid = true;
            // utok dolava
            if (id-1 < 64 && id-1 >= 0)
                if (state.vm.$children[id-1].piece !== pieces.empty)
                    state.vm.$children[id-1].valid = true;
    },
    endMove: ({state}) => {
        for (let tile of state.vm.$children) {
            tile.valid = false;
            tile.selected = false;
        }
    },
    start: ({commit}, data) => {
        commit('setVm', data.vm);
        commit('updateBoard', data.board);
    },
    setGame: ({commit}, game) => {
        commit('setGame', game);
    }
};

const getters = {
    board: state => {
        return state.board;
    }
};


export default {
    state,
    mutations,
    actions,
    getters
}