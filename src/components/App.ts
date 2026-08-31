import { Component } from '../core/Component';
import { Form } from './Form';
import { List } from './List';
import { ListItem } from './ListItem';

interface AppState {
  total: number;
  donates: ListItem[];
}

export class App extends Component {
  declare state: AppState;

  $heading!: HTMLHeadingElement;
  $total!: HTMLSpanElement;
  donateList!: List;

  setup(_props: Record<string, any>) {
    this.state = {
      total: 0,
      donates: []
    }

    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'app';

    const count = document.createElement('span');
    count.textContent = String(this.state.total);

    const heading = document.createElement('h1');
    heading.className = 'total-amount';
    heading.textContent = 'Итого: $';
    
    const donateForm = new Form({onSubmit: this.onItemCreate.bind(this)});
    const donateList = new List();
    
    this.$heading = heading;
    this.donateList = donateList;
    this.$total = count;
    
    this.$heading.append(count)
    this.$rootElement.append(heading);
    this.$rootElement.appendChild(donateForm.$rootElement);
    this.$rootElement.appendChild(donateList.$rootElement);
  }
  
  onItemCreate(amount: number): void {
    const item = new ListItem({
      amount: amount,
      onDelete: this.deleteItem.bind(this)
    })
    this.state.donates.push(item);
    this.donateList.addItem(item);
    this.state.total += amount;
    this.$total.textContent = String(this.state.total);
  }

  deleteItem(item: ListItem): void {
    let donates = this.state.donates;

    donates = donates.filter(donate => {donate !== item;})

    this.state.total -= item.state.amount;
    this.$total.textContent = String(this.state.total);

    item.$rootElement.remove();
  }
}
