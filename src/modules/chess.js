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
                dispatch('kingMove', tile);
                break;
            case pieces.wQueen: case pieces.bQueen:
                dispatch('queenMove', tile);
                break;
            case pieces.wRook: case pieces.bRook:
                dispatch('rookMove', tile);
                break;
            case pieces.wBishop: case pieces.bBishop:
                dispatch('bishopMove', tile);
                break;
            case pieces.wKnight: case pieces.bKnight:
                dispatch('knightMove', tile);
                break;
            case pieces.wPawn: case pieces.bPawn:
                dispatch('pawnMove', tile);
                break;
        }
    },
    kingMove: ({state, dispatch}, tile) => {
        let white = tile.piece <= 6;
        let positions = [
            [-1,-1], [-1, 0], [-1, 1], [ 0,-1],
            [ 0, 1], [ 1,-1], [ 1, 0], [ 1, 1]
        ];
        for (let pos of positions) {
            let id = tile.index + pos[0]*12 + pos[1];
            dispatch('isValid', {id: id, player: white}).then(res => {
                state.vm.$children[id].valid = res;
            });
        }
    },
    queenMove: ({state, dispatch}, tile) => {
        dispatch('rookMove', tile);
        dispatch('bishopMove', tile);
    },
    rookMove: ({state, dispatch}, tile) => {
        let white = tile.piece <= 6;
        // up
        for (let i = 1; i < 8; i++) {
            let id = tile.index + 12*i;
            if (state.vm.$children[id].piece === pieces.empty) {
                state.vm.$children[id].valid = true;
            } else {
                dispatch('isValid', {id: id, player: white}).then(res => {
                    state.vm.$children[id].valid = res;
                });
                break;
            }
        }
        // down
        for (let i = 1; i < 8; i++) {
            let id = tile.index - 12*i;
            if (state.vm.$children[id].piece === pieces.empty) {
                state.vm.$children[id].valid = true;
            } else {
                dispatch('isValid', {id: id, player: white}).then(res => {
                    state.vm.$children[id].valid = res;
                });
                break;
            }
        }
        // left
        for (let i = 1; i < 8; i++) {
            let id = tile.index - i;
            if (state.vm.$children[id].piece === pieces.empty) {
                state.vm.$children[id].valid = true;
            } else {
                dispatch('isValid', {id: id, player: white}).then(res => {
                    state.vm.$children[id].valid = res;
                });
                break;
            }
        }
        // right
        for (let i = 1; i < 8; i++) {
            let id = tile.index + i;
            if (state.vm.$children[id].piece === pieces.empty) {
                state.vm.$children[id].valid = true;
            } else {
                dispatch('isValid', {id: id, player: white}).then(res => {
                    state.vm.$children[id].valid = res;
                });
                break;
            }
        }
    },
    bishopMove: ({state, dispatch}, tile) => {
        let white = tile.piece <= 6;
        //     up /
        for (let i = 1; i < 8; i++) {
            let id = tile.index - 12*i + i;
            if (state.vm.$children[id].piece === pieces.empty) {
                state.vm.$children[id].valid = true;
            } else {
                dispatch('isValid', {id: id, player: white}).then(res => {
                    state.vm.$children[id].valid = res;
                });
                break;
            }
        }
        // down \
        for (let i = 1; i < 8; i++) {
            let id = tile.index + 12*i + i;
            if (state.vm.$children[id].piece === pieces.empty) {
                state.vm.$children[id].valid = true;
            } else {
                dispatch('isValid', {id: id, player: white}).then(res => {
                    state.vm.$children[id].valid = res;
                });
                break;
            }
        }
        // down /
        for (let i = 1; i < 8; i++) {
            let id = tile.index +12*i - i;
            if (state.vm.$children[id].piece === pieces.empty) {
                state.vm.$children[id].valid = true;
            } else {
                dispatch('isValid', {id: id, player: white}).then(res => {
                    state.vm.$children[id].valid = res;
                });
                break;
            }
        }
        // up \
        for (let i = 1; i < 8; i++) {
            let id = tile.index -12*i - i;
            if (state.vm.$children[id].piece === pieces.empty) {
                state.vm.$children[id].valid = true;
            } else {
                dispatch('isValid', {id: id, player: white}).then(res => {
                    state.vm.$children[id].valid = res;
                });
                break;
            }
        }
    },
    knightMove: ({state, dispatch}, tile) => {
        let white = tile.piece <= 6;
        let positions = [
            [-2,-1], [-2, 1], [-1, 2], [ 1, 2],
            [ 2, 1], [ 2,-1], [ 1,-2], [-1,-2]
        ];
        for (let pos of positions) {
            let id = tile.index + pos[0]*12 + pos[1];
            dispatch('isValid', {id: id, player: white}).then(res => {
                state.vm.$children[id].valid = res;
            });
        }
    },
    pawnMove: ({state, dispatch}, tile) => {
        let white = tile.piece <= 6;
        let side = white ? 1 : -1; // pieces.bKing = 6
        // 1,2,3,4,5,6 is white
        // 7,8,9,10,11,12 is black

        let id = tile.index+(12*side);
        // move forward
        if (state.vm.$children[id].piece === pieces.empty)
            state.vm.$children[id].valid = true;
        // attack right
        if (state.vm.$children[id+1].piece !== pieces.empty)
            dispatch('canAttack', {id: id+1, player: white}).then(res => {
                state.vm.$children[id+1].valid = res;
            });
        // attack left
        if (state.vm.$children[id-1].piece !== pieces.empty)
            dispatch('canAttack', {id: id-1, player: white}).then(res => {
                state.vm.$children[id-1].valid = res;
            });
        // move forward by 2
        if (
            (white  && tile.index >= 38 && tile.index < 46) ||
            (!white && tile.index >= 98 && tile.index < 106)
        ) {
            let tmp1 = tile.index + (12 * side);
            let tmp2 = tile.index + (24 * side);
            if (    // attack only enemy pieces
                state.vm.$children[tmp1].piece === pieces.empty &&
                state.vm.$children[tmp2].piece === pieces.empty
            )
                state.vm.$children[tmp2].valid = true;
        }
    },
    endMove: ({state}) => {
        for (let tile of state.vm.$children) {
            tile.valid = false;
            tile.selected = false;
        }
    },
    isValid: ({state}, data) => {
        return (data.player && state.vm.$children[data.id].piece > 6) ||
            (!data.player && state.vm.$children[data.id].piece <= 6)  ||
            (state.vm.$children[data.id].piece === pieces.empty);
    },
    canAttack: ({state}, data) => {
        return (data.player && state.vm.$children[data.id].piece > 6) || (!data.player && state.vm.$children[data.id].piece <= 6);
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