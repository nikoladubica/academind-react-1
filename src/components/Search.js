import React from 'react'
import axios from 'axios'

export default class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            originalItems: [],
            items: [],
            loadedData: false,
            shownData: false,
            value: '',
            button: 'Get Data'
        };
    }

    changeInput = (e) => {
        this.setState({
            items: this.state.originalItems.filter(item => item.item.name.toLowerCase().includes(e.target.value.toLowerCase())),
            value: e.target.value
        });
    }
  
    getData = () => {
        if (this.state.loadedData === false) {
            axios.get(`https://mocki.io/v1/04350505-d817-41ee-bcf9-e4492c83b484`).then(res => {
                let items = res.data;

                items.forEach(item => {
                    item.item.name = this.swapBrokenChars(item.item.name);
                });

                this.setState({
                    originalItems: items,
                    items: items,
                    loadedData: true,
                    shownData: true,
                    button: 'Hide Data'
                });
            });
        } else {
            if (this.state.shownData === true) {
                this.setState({
                    items: [],
                    shownData: false,
                    button: 'Show Data'
                });
            } else {
                this.setState({
                    items: this.state.originalItems.filter(item => item.item.name.toLowerCase().includes(this.state.value.toLowerCase())),
                    shownData: true,
                    button: 'Hide Data'
                });
            }
        }
    }

    swapBrokenChars = (string) => {
        const arrayOfBroken = ['Ã¼', 'â€“', 'â€™', '&amp;', 'Ã¨', 'Ã©', 'Ã¶', 'Ã´', 'Ã‰', 'Â', 'Ã¯'];
        const arrayOfFixed = ['ü', '–', '’', '&', 'è', 'è', 'ö', 'ô', 'É', '', 'ï'];

        arrayOfBroken.forEach((item, index) => {
            string = string.replaceAll(item, arrayOfFixed[index]);
        });

        return string;
    }
  
    render() {
      return (
        <div className='search'>
            <input  className='search__get-button' onClick={this.getData} type='button' value={this.state.button}  />
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