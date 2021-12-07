import loading from './loading.gif'

export default function Spinner(props){
    return (
        <div className="text-center" style={{margin:"5%  0%"}}>
            <img src={loading} alt="loading..."/>
        </div>
    )
}
