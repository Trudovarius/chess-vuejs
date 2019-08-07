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
                dispatch('knightMove', tile);
                break;
            case pieces.wPawn: case pieces.bPawn:
                dispatch('pawnMove', tile);
                break;
        }
    },
    knightMove: ({state}, tile) => {
        let white = tile.piece <= 6;
        let positions = [
            [-2,-1], [-2,1],
            [-1, 2], [ 1,2],
            [2, 1], [2,-1], [1,-2], [-1,-2]
        ];
        for (let pos of positions) {
            let id = tile.index + pos[0]*12 + pos[1];
            if (white && state.vm.$children[id].piece > 6 || state.vm.$children[id].piece === pieces.empty) {
                state.vm.$children[id].valid = true;
            }
            if (!white && state.vm.$children[id].piece <= 6 || state.vm.$children[id].piece === pieces.empty) {
                state.vm.$children[id].valid = true;
            }
        }
    },
    pawnMove: ({state}, tile) => {
        let white = tile.piece <= 6;
        let side = white ? 1 : -1; // pieces.bKing = 6
        // 1,2,3,4,5,6 is white
        // 7,8,9,10,11,12 is black

        let id = tile.index+(12*side);
        // move forward
        if (id < 120 && id >= 24)
            if (state.vm.$children[id].piece === pieces.empty)
                state.vm.$children[id].valid = true;
        // attack right
        if (id+1 < 120 && id+1 >= 24 )
            if (state.vm.$children[id+1].piece !== pieces.empty)
                if (    // attack only enemy pieces
                    (white && state.vm.$children[id+1].piece > 6) ||
                    (!white && state.vm.$children[id+1].piece <= 6)
                )
                    state.vm.$children[id+1].valid = true;
        // attack left
        if (id-1 < 120 && id-1 >= 24)
            if (state.vm.$children[id-1].piece !== pieces.empty)
                if (    // attack only enemy pieces
                    (white && state.vm.$children[id-1].piece > 6) ||
                    (!white && state.vm.$children[id-1].piece <= 6)
                )
                    state.vm.$children[id-1].valid = true;
        // move forward by 2
        console.log(tile)
        if (
            (white  && tile.index >= 38 && tile.index < 46) ||
            (!white && tile.index >= 98 && tile.index < 106)
        ) {
            let tmp = tile.index + (24 * side);
            if (    // attack only enemy pieces
                (white && state.vm.$children[tmp].piece > 6) ||
                (!white && state.vm.$children[tmp].piece <= 6) ||
                state.vm.$children[tmp].piece === pieces.empty
            )
                state.vm.$children[tmp].valid = true;
        }
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