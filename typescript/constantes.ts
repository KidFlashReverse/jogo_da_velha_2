export const winCoordinateInfo = (numberWin: number | undefined) => {
    switch(numberWin){
        case 0:
            return {indexs: [0, 1, 2], rotate: 0}
        case 1:
            return {indexs: [3, 4, 5], rotate: 0}
        case 2:
            return {indexs: [6, 7, 8], rotate: 0}
        case 3:
            return {indexs: [0, 3, 6], rotate: 90}
        case 4:
            return {indexs: [1, 4, 7], rotate: 90}
        case 5:
            return {indexs: [2, 5, 8], rotate: 90}
        case 6:
            return {indexs: [0, 4, 8], rotate: 45}
        case 7:
            return {indexs: [2, 4, 6], rotate: 135} 
    }

    return {indexs: [], rotate: 0} 
}