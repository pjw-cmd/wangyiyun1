import request from '../utils/request_java.js'

export function get_user_playlist(user_id) {
    return request.get(`/playlist/getListById?user_id=${user_id}`)
}


export function get_user_sim_playlist(user_id) {
    return request.get(`/playlist/getUserSimilarityPlayList?user_id=${user_id}`)
}

export function add_user_playlist_item(params) {
    return request.post('/playlist/addMusicItem', params)
}
export function delete_user_playlist_item(params) {
    return request.post('/playlist/deleteMusicItem', params)
}

export function updateUserPlayList(params){
    return request.post('/playlist/updateUserPlayList', params)
}
