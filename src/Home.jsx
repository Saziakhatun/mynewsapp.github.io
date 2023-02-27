import React, { Component } from 'react'
import Newsitem from './Newsitem'

export default class Home extends Component {
  constructor(){
    super()
    this.state={
      articles:[],
      totalResults:0
    }
  }
  getAPIdata= async()=>{
    var response=""
    if(this.props.search)
   response=await fetch(`https://newsapi.org/v2/everything?q=${this.props.search}&language=${this.props.language}&PageSize=20&apiKey=f96b7b329d22407389cb4f0fbf4c65be`)
   else
   response=await fetch(`https://newsapi.org/v2/everything?q=${this.props.q}&language=${this.props.language}&PageSize=20&apiKey=f96b7b329d22407389cb4f0fbf4c65be`)
   var result= await response.json()
    this.setState({
      articles:result.articles,
      totalResults:result.totalResults
    })

  }
  componentDidMount(){
    this.getAPIdata()
  }
  componentDidUpdate(oldprops){
    if(this.props!==oldprops)
    this.getAPIdata()
  }
  render() {
    return (
      <>
      <div className="container-fluid mt-2">
        <div className="row">
          <h5 className='background text-light text-center'> {this.props.q} News Section</h5>
       {
        this.state.articles.map((item,index)=>{
          return <Newsitem 
          key={index}
          pic={item.urlToImage}
          title={item.title}
          description={item.description}
          date={item.publishedAt}
          source={item.source.name}
          url={item.url}
          />
        })
       }
        </div>
      </div>
      </>
    )
  }
}
