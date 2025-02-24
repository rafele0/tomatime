
function add(newTitle, newDescription){
    let task;
    if(!newTitle)
        return "inserisci un titolo";
    task = {
        title : newTitle,
        description : newDescription
    };
    return task;
}

module.exports=add;