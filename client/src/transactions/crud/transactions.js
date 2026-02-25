function isEmpty(ob){
    if (!ob) {
        return true;
    }
    for(var key in ob){
        return false;
    }
    return true;
}

export { isEmpty }
