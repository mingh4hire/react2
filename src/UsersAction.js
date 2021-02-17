export function UsersAction(users){
    return ()=>{return {type:"users","users": users}};
}

export default UsersAction;