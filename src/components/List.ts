import { Component } from '../core/Component';
import { ListItem } from './ListItem';

export class List extends Component {
  $listContainer!: HTMLElement;

  setup() {
    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'donates-container';

    const $header = document.createElement('h2');
    $header.className = 'donates-container__title';
    $header.textContent = 'Список донатов';
    
    const $listContainer = document.createElement('div');
    $listContainer.className = 'donates-container__donates';
    this.$listContainer = $listContainer;

    this.$rootElement.append($header, $listContainer);
  }

  addItem(item: ListItem): void {
    this.$listContainer.appendChild(item.$rootElement)
  }
}