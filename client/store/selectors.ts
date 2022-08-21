export const GetError = (state: any, type: string) => {
    return state.user.errors.find((err: any) => err.type === type)
}
export const GetActive = (state: any) => {
    return state.tracks.active
}
