import React from 'react'
import axios from 'axios'

export default class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            originalItems: [],
            items: [],
            loadedData: false,
            value: ''
        };
    }

    changeInput = (e) => {
        this.setState({
            items: this.state.originalItems.filter(item => item.item.name.toLowerCase().includes(e.target.value.toLowerCase())),
            value: e.target.value
        });
    }
  
    getData = () => {
        if (this.state.loadedData == false) {
            axios.get(`https://mocki.io/v1/04350505-d817-41ee-bcf9-e4492c83b484`).then(res => {
                const items = res.data;
                this.setState({
                    originalItems: items,
                    items: items,
                    loadedData: true
                });
            });

            this.state.loadedData = true;
        }
    }
  
    render() {
      return (
        <div className='search'>
            <input  className='search__get-button' onClick={this.getData} type='button' value='Get Data'  />
            <input className='search__input' value={this.state.value} onChange={this.changeInput} type='text' placeholder='Search...'  />

            <ul className='search__list'>
            {
                this.state.items.map(item =>
                    <li className='search__list-item' key={item.item.id}>{item.item.name}</li>
                )
            }
            </ul>
        </div>
      )
    }
  }