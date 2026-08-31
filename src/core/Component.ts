export class Component {
  props: Record<string, any>;
  state: Record<string, any>;
  $rootElement!: HTMLElement;

  constructor(props: Record<string, any> = {}) {
    this.props = props;
    this.state = {};

    if (this.constructor === Component) {
      throw new Error('Cannot instantiate abstract class');
    }

    this.setup(props);
  }

  setup(props: Record<string, any>): void {
    throw new Error("Method 'setup' must be implemented by derived classes");
  }
}
