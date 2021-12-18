export const depositMoney = (amt)=>{
    return (dispatch)=>{
        dispatch({
            type: 'deposit',
            payload: amt
        })
    }
}

export const withdrawMoney = (amt)=>{
    return (dispatch)=>{
        dispatch({
            type: 'withdraw',
            payload: amt
        })
    }
}