import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export default class News extends Component {
    constructor(){
        super();
        console.log("Initialized a constructor for News Component");
        this.state = {
            artcl: [],
            loading: true,
            page: 1,
            pgsz: 12,
            totalArticles:0
        }
    }

    // runs after render()
    async componentDidMount(){
        let apiKey = "3fd5a45362454b99b2e64d9e9896c0e5";
        let apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}&page=${this.state.page}&pageSize=${this.state.pgsz}`;
        this.setState({loading:true});
        let myData = await fetch(apiUrl);
        let parsedData = await myData.json();
        // console.log(parsedData);
        this.setState({
            loading: false,
            artcl:parsedData.articles, 
            totalArticles: parsedData.totalResults
        })
    }
    
    handlePrev = async()=>{
        console.log("Prev");
        let apiKey = "3fd5a45362454b99b2e64d9e9896c0e5";
        let apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}&page=${this.state.page-1}&pageSize=${this.state.pgsz}`;
        this.setState({loading:true});
        let myData = await fetch(apiUrl);
        let parsedData = await myData.json();
        // console.log(parsedData);
        this.setState({
            loading:false,
            artcl:parsedData.articles,
            page: this.state.page-1
        })
    }
    
    handleNext = async ()=>{
        console.log("Next");
        if(this.state.page>=Math.ceil(this.state.totalArticles/this.state.pgsz)){
            return;
        }
        else{
            console.log(this.state.page);
            let apiKey = "3fd5a45362454b99b2e64d9e9896c0e5";
            let apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}&page=${this.state.page+1}&pageSize=${this.state.pgsz}`;
            this.setState({loading:true});
            let myData = await fetch(apiUrl);
            let parsedData = await myData.json();
            // console.log(parsedData);
            this.setState({
                loading:false,
                artcl:parsedData.articles,
                page: this.state.page+1
            })
        }
    }

    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center">NewsMonkey - Top headlines</h2>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {this.state.loading==false &&
                        this.state.artcl.map((element)=>{
                            return (<div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title?element.title:"Something went wrong"} description={element.description?element.description.slice(0, 149):"Something went wrong"} imgUrl={element.urlToImage?element.urlToImage:"https://images.livemint.com/img/2021/12/03/600x338/415be322-4602-11eb-bc1d-4bfe13e32b0e_1608858841050_1608858879986_1638494350428.jpg"} newsUrl={element.url?element.url:"https://www.indiatoday.in/"}/>
                            </div>);
                        })
                    }
                </div>
                {this.state.loading==false &&
                    <div className="container d-flex justify-content-between">
                        <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
                        <button type="button" disabled={this.state.page>=Math.ceil(this.state.totalArticles/this.state.pgsz)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
                    </div>
                }
            </div>
        )
    }
}
