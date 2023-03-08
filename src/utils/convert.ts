export const labelToProperty = (str : String ) => {
    
    let tmp = str.trim().split(" ")
    tmp[0] = tmp[0].toLowerCase()

    return tmp.join("")
}