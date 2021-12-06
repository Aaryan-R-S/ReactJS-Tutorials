import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
    constructor(props){
        super(props);
        // console.log("Initialized a constructor for News Component");
        this.state = {
            artcl: [],
            loading: true,
            totalArticles:0,
            page: 1,
            pgsz: this.props.pgsz,
            country: this.props.country,
            category: this.props.category,
            apiKey: this.props.apiKey
        }
        document.title = `${
            this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
        } - News Monkey`
    }

    async updateNews(){
        let apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.state.country}&category=${this.state.category}&apiKey=${this.state.apiKey}&page=${this.state.page}&pageSize=${this.state.pgsz}`;
        this.props.setProgress(20);
        this.setState({loading:true});
        let myData = await fetch(apiUrl);
        this.props.setProgress(50);
        let parsedData = await myData.json();
        this.props.setProgress(75);
        // console.log(parsedData);
        this.setState({
            loading: false,
            artcl:parsedData.articles, 
            totalArticles: parsedData.totalResults
        })
        this.props.setProgress(100);
    }

    // runs after render()
    async componentDidMount(){
        this.updateNews();
    }
    
    // Prev Btn
    handlePrev = async ()=>{
        // console.log("Prev");
        await this.setState({
            page: this.state.page-1
        })
        this.updateNews();
    }
    
    // Next btn
    handleNext = async ()=>{
        // console.log("Next");
        await this.setState({
            page: this.state.page+1
        })
        this.updateNews();
    }

    // Infinite Scroll 
    fetchMoreData = async ()=>{
        await this.setState({
            page: this.state.page+1
        })
        let apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.state.country}&category=${this.state.category}&apiKey=${this.state.apiKey}&page=${this.state.page}&pageSize=${this.state.pgsz}`;
        // this.setState({loading:true});
        let myData = await fetch(apiUrl);
        let parsedData = await myData.json();
        // console.log(parsedData);
        this.setState({
            loading: false,
            artcl: this.state.artcl.concat(parsedData.articles), 
            totalArticles: parsedData.totalResults
        })
    }

    render() {
        return (
            <>
                <h2 className="text-center my-3">NewsMonkey - Top {
                        this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
                    } Headlines
                </h2>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll dataLength={this.state.artcl.length} 
                    next={this.fetchMoreData} 
                    hasMore={this.state.artcl.length < this.state.totalArticles} 
                    loader={<Spinner/>}
                    >
                    <div className="container">
                        <div className="row">
                            {this.state.artcl.map((element)=>{
                                return (<div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title?element.title:"Something went wrong"} description={element.description?element.description.slice(0, 149):"Something went wrong"} imgUrl={element.urlToImage?element.urlToImage:"https://images.livemint.com/img/2021/12/03/600x338/415be322-4602-11eb-bc1d-4bfe13e32b0e_1608858841050_1608858879986_1638494350428.jpg"} newsUrl={element.url?element.url:"https://www.indiatoday.in/"} author={element.author?element.author:"Unknown"} date={element.publishedAt? (new Date(element.publishedAt)).toLocaleString():"Recently"} sourceName={element.source.name?element.source.name:"Unknown"}/>
                                </div>);
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* Prev/Next Btn code */}
                {/* {this.state.loading===false &&
                    <div className="container d-flex justify-content-between">
                        <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
                        <button type="button" disabled={this.state.page>=Math.ceil(this.state.totalArticles/this.state.pgsz)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
                    </div>
                } */}
            </>
        )
    }
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
