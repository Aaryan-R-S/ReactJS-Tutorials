import React, {useEffect, useState} from 'react';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default function News(props){
    const [artcl, setArtcl] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalArticles, setTotalArticles] = useState(0);
    const [page, setPage] = useState(1);
    // const [pgsz, setPgsz] = useState(props.pgsz);
    // const [country, setCountry] = useState(props.country);
    // const [category, setCategory] = useState(props.category);
    // const [apiKey,setApiKey] = useState(props.apiKey);
    
    const updateNews = async()=>{
        document.title = `${
            props.category.charAt(0).toUpperCase() + props.category.slice(1)
        } - News Monkey`
        let apiUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pgsz}`;
        props.setProgress(20);
        setLoading(true);
        let myData = await fetch(apiUrl);
        props.setProgress(50);
        let parsedData = await myData.json();
        props.setProgress(75);
        // console.log(parsedData);
        setLoading(false);
        setArtcl(parsedData.articles)
        setTotalArticles(parsedData.totalResults)
        props.setProgress(100);
    }

    useEffect(()=>{
        updateNews();
        // eslint-disable-next-line
    }, []);
    
    // Prev Btn
    // const handlePrev = async ()=>{
    //     // console.log("Prev");
    //     setPage(page-1);
    //     updateNews();
    // }
    
    // Next btn
    // const handleNext = async ()=>{
    //     // console.log("Next");
    //     setPage(page+1);
    //     updateNews();
    // }
    
    // Infinite Scroll 
    const fetchMoreData = async ()=>{
        setPage(page+1);
        setLoading(true);
        let apiUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pgsz}`;
        let myData = await fetch(apiUrl);
        let parsedData = await myData.json();
        // console.log(parsedData);
        setLoading(false);
        setArtcl(artcl.concat(parsedData.articles))
        setTotalArticles(parsedData.totalResults)
    }

    return (
        <>
            <h2 className="text-center" style={{marginTop:"70px"}}>NewsMonkey - Top {
                    props.category.charAt(0).toUpperCase() + props.category.slice(1)
                } Headlines
            </h2>
            {loading && <Spinner/>}
            <InfiniteScroll dataLength={artcl.length} 
                next={fetchMoreData} 
                hasMore={artcl.length < totalArticles} 
                loader={<Spinner/>}
                >
                <div className="container">
                    <div className="row">
                        {artcl.map((element)=>{
                            return (<div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title?element.title:"Something went wrong"} description={element.description?element.description.slice(0, 149):"Something went wrong"} imgUrl={element.urlToImage?element.urlToImage:"https://images.livemint.com/img/2021/12/03/600x338/415be322-4602-11eb-bc1d-4bfe13e32b0e_1608858841050_1608858879986_1638494350428.jpg"} newsUrl={element.url?element.url:"https://www.indiatoday.in/"} author={element.author?element.author:"Unknown"} date={element.publishedAt? (new Date(element.publishedAt)).toLocaleString():"Recently"} sourceName={element.source.name?element.source.name:"Unknown"}/>
                            </div>);
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* Prev/Next Btn code */}
            {/* {loading===false &&
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={page<=1} className="btn btn-dark" onClick={handlePrev}>&larr; Previous</button>
                    <button type="button" disabled={page>=Math.ceil(totalArticles/pgsz)} className="btn btn-dark" onClick={handleNext}>Next &rarr;</button>
                </div>
            } */}
        </>
    )
}

News.propTypes = {
    pgsz: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
    apiKey: PropTypes.string
}

News.defaultProps = {
    pgsz:12,
    country:"in",
    category: "general",
}
