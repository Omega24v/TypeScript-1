import { Component } from '../core/Component';

interface FormProps {
  onSubmit: (amount: number) => void;
}

interface FormState {
  amount: string;
}

export class Form extends Component {
  declare props: FormProps;
  declare state: FormState;

  $input!: HTMLInputElement;
  $button!: HTMLButtonElement;
  $errorSpan!: HTMLSpanElement;

  setup(props: FormProps) {
    this.props = props;
    this.state = {amount: ''}

    this.$rootElement = document.createElement('form');
    this.$rootElement.className = 'donate-form';
    
    const $label = document.createElement('label');
    $label.className = 'donate-form__input-label';
    $label.textContent = 'Введите сумму в $';
    this.$rootElement.append($label);

    const $input = document.createElement('input');
    $input.className = 'donate-form__donate-input';
    this.$input = $input;
    $label.append(this.$input);

    const $button = document.createElement('button');
    $button.className = 'donate-form__submit-button';
    $button.textContent = 'Задонатить';
    this.$button = $button;
    this.$rootElement.append($button);

    const $errorSpan = document.createElement('span');
    $errorSpan.className = 'donate-form__error-text';
    $errorSpan.style.color = 'red';
    this.$errorSpan = $errorSpan;
    this.$rootElement.append(this.$errorSpan);


    this.$input.addEventListener('input', this.handleInput.bind(this));
    this.$rootElement.addEventListener('submit', this.handleSubmit.bind(this));
  }

  get isValid() {
    const amount = Number(this.state.amount);
    return Number.isFinite(amount) && amount >= 1 && amount <= 100;
  }

  handleInput(event: Event): void {
    const target = event.target
    if(!(target instanceof HTMLInputElement)) return;

    this.state.amount = target.value;

    if(this.isValid) {
      this.$button.disabled = false;
      this.$errorSpan.textContent = '';
    } else {
      this.$button.disabled = true;
      this.$errorSpan.textContent = 'Введите число от 1 до 100';
    }
    
    this.$button.disabled = !this.isValid;
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    
    if (!this.isValid) return;

    const amount = Number(this.state.amount);
    this.props.onSubmit(amount)
    this.state.amount = '';
    this.$input.value = '';
    this.$button.disabled = true;
    this.$errorSpan.textContent = '';
  }
}