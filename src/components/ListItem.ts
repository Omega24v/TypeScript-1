import { Component } from '../core/Component';

interface ListItemProps {
  amount: number;
  props: Record<string, any>;
  onDelete?: (item: ListItem) => void;
}

interface ListItemState {
  id: number;
  date: Date;
  amount: number;
}

export class ListItem extends Component {
  declare state: ListItemState;
  declare props: ListItemProps;
  $deleteButton!: HTMLElement;

  setup(props: ListItemProps) {
    this.props = props,
    this.state = {
      id: Date.now(),
      date: new Date(),
      amount: props.amount
    }

    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'donate-item';
    
    const $deleteButton = document.createElement('button');
    $deleteButton.className = 'delete-button';
    $deleteButton.textContent = 'Удалить';
    this.$deleteButton = $deleteButton;
    
    $deleteButton.addEventListener('click', () => {
      props.onDelete?.(this);
    })
    
    const formattedDate = this.state.date.toLocaleString();
    this.$rootElement.innerHTML = `${formattedDate} - <b>$${this.state.amount}</b>`;
    this.$rootElement.append($deleteButton)
  }
}
