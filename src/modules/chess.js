import {pieces, players} from '../components/chess/chess';

const state = {
    board: [],
    vm: null,   // reference to Board.vue instance
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
        if (to.index !== state.selected.index) {
            state.board.splice(to.index, 1, state.board[state.selected.index]);
            state.board.splice(state.selected.index, 1, 0);
            state.onTurn = (state.onTurn === players.white ? players.black : players.white);
        }
        state.selected = null;
    },
    updateBoard (state, board) {
        state.board = board;
        state.vm.tiles = state.board;
    },
    setVm (state, vm) {
        state.vm = vm;
    }
};

const actions = {
    move: ({commit, dispatch}, tile) => {
        if (!state.selected) {
            dispatch('canSelect', tile).then(res => {
                if (res) {
                    console.log('select')
                    commit('selectTile', tile);
                } else {
                    tile.vm.selected = false;
                }
            });
        } else {
            if (true) { // check if valid move
                commit('moveTile', tile);
                commit('updateBoard', state.board);
            }
            tile.vm.selected = false;
        }
    },
    canSelect: ({commit, dispatch}, tile) => {
        if (tile.piece !== pieces.empty) {
            console.log('piece neni 0');
            if (state.onTurn === players.white && tile.piece < pieces.bKing)
                return true;
            else if (state.onTurn === players.black && tile.piece >= pieces.bKing)
                return true;
        }
        return false;
    },
    validate: ({commit}, tile) => {
        return 'bohaa';
    },
    start: ({commit}, data) => {
        commit('setVm', data.vm);
        commit('updateBoard', data.board);
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