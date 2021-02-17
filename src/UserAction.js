export function UserAction(user){
    return ()=> ({type:"user", "user": user});
}

export default UserAction;