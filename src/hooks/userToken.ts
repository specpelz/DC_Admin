

const userToken = () => {
    const userToken = localStorage.getItem("DC_Token") ? localStorage.getItem("DC_Token") : null;
    
    return {token:userToken};
}

export default userToken;