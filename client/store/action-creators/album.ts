import {Dispatch} from 'react'
import {AlbumsAPI} from '../../api/albumsAPI'
import {AlbumAction, AlbumActionTypes} from '../../types/album'

export const fetchAlbums = (token) => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await AlbumsAPI.getAlbums(token)
            dispatch({type: AlbumActionTypes.FETCH_ALBUMS, payload: response.data})
        } catch (e) {
            dispatch({
                type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
                payload: 'Произошла ошибка загрузки альбомов'
            })
        }
    }
}
export const searchAlbums= (query: string, token: string) => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await AlbumsAPI.searchAlbums(query, token)
            dispatch({type: AlbumActionTypes.FETCH_ALBUMS, payload: response.data})
        } catch (e) {
            dispatch({
                type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
                payload: 'Произошла ошибка поиска альбомов'
            })
        }
    }
}

export const deleteAlbum = (id:string, token: string) => {
    return async (dispatch: any) => {
        try {
            AlbumsAPI.deleteOneAlbum(id,token)
                .then(response=>{
                        dispatch({
                            type: AlbumActionTypes.REMOVE_ALBUM,
                            payload: response.data
                        })
                    }
                )

        } catch (e) {
            dispatch({
                type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
                payload: 'Произошла ошибка удаления альбома'
            })
        }
    }
}