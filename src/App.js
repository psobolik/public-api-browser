import React, {Component} from 'react'
import EntryList from './EntryList'
import CategoryList from './CategoryList'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      baseUri: 'https://api.publicapis.org/',
      categories: {
        list: [],
        error: null,
        isLoaded: false,
      },
      entries: {
        list: [],
        error: null,
        isLoaded: false,
        category: null,
      }
    }
    this.selectCategoryHandler = this.selectCategoryHandler.bind(this)
  }

  componentDidMount() {
    this.fetchCategories()
  }

  render() {
    return (
      <div className="App">
        <div className="Header">
          <h1>Public API Browser</h1>
          <div><a href="https://github.com/toddmotto/public-apis">Public APIs Github Project</a> | <a
            href="https://api.publicapis.org">Public API for Public APIs</a></div>
        </div>
        <CategoryList categories={this.state.categories} selectCategoryHandler={(e) => this.selectCategoryHandler(e)}/>
        <EntryList entries={this.state.entries}/>
      </div>
    )
  }

  selectCategoryHandler(e) {
    // https://api.publicapis.org/entries?category=Anti-malware
    /*
    {"count":6,"entries":[{"API":"AlienVault Open Threat Exchange (OTX)","Description":"IP/domain/URL reputation","Auth":"apiKey","HTTPS":true,"Cors":"unknown","Link":"https://otx.alienvault.com/api/","Category":"Anti-Malware"},{"API":"Certly","Description":"Certly Link/Domain Flagging","Auth":"apiKey","HTTPS":true,"Cors":"unknown","Link":"https://guard.certly.io/","Category":"Anti-Malware"},{"API":"Google Safe Browsing","Description":"Google Link/Domain Flagging","Auth":"apiKey","HTTPS":true,"Cors":"unknown","Link":"https://developers.google.com/safe-browsing/","Category":"Anti-Malware"},{"API":"Metacert","Description":"Metacert Link Flagging","Auth":"apiKey","HTTPS":true,"Cors":"unknown","Link":"https://metacert.com/","Category":"Anti-Malware"},{"API":"VirusTotal","Description":"VirusTotal File/URL Analysis","Auth":"apiKey","HTTPS":true,"Cors":"unknown","Link":"https://www.virustotal.com/en/documentation/public-api/","Category":"Anti-Malware"},{"API":"Web Of Trust (WOT)","Description":"Website reputation","Auth":"apiKey","HTTPS":true,"Cors":"unknown","Link":"https://www.mywot.com/wiki/API","Category":"Anti-Malware"}]}
     */
    this.fetchEntries(e.target.value)
  }

  fetchCategories() {
    fetch(this.state.baseUri + 'categories')
      .then(res => res.json())
      .then(res => {
          this.setState({
            categories: {
              list: res,
              isLoaded: true
            }
          });
          if (res != null && res.length > 0) this.fetchEntries(res[0]);
        },
        error => {
          this.setState({
            categories: {
              error,
              isLoaded: false
            }
          })
        })
  }

  fetchEntries(category) {
    fetch(this.state.baseUri + 'entries?category=' + encodeURIComponent(category))
      .then(res => res.json())
      .then(res => {
          this.setState({
            entries: {
              category: category,
              list: res.entries,
              isLoaded: true
            }
          })
        },
        error => {
          this.setState({
            entries: {
              error,
              isLoaded: false
            }
          })
        })
  }
}

export default App
