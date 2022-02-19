import React from "react";

interface IProps {
    updateValue?(value: string): void;
    enterEvent?(value: string): void;
}

interface IState {
    value: string;
}

class InputAtom extends React.Component<IProps, IState> {
    private inputRef!: HTMLInputElement | null;

    constructor(props: IProps) {
        super(props);
        this.state = {
            value: '',
        };
    }

    updateValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            value: e.target.value,
        });
        if (this.props.updateValue) {
            this.props.updateValue(e.target.value);
        }
    }

    handleEnterEvent = (e: React.KeyboardEvent) => {
        if (this.inputRef !== null && e.code === 'Enter') {
            if (this.props.enterEvent !== undefined) {
                this.props.enterEvent(this.state.value);
                // We can also use ref directly but I prefer using with state as it's more organize
                // this.props.enterEvent(this.inputRef.value)
            }

            this.setState({
                value: '',
            });

            this.inputRef.value = "";
        }
    }

    render(): React.ReactNode {
        return <div className="input-atom-con">
            <input data-testid="input" ref={(ref) => this.inputRef = ref} className="input-atom" onChange={this.updateValue} onKeyDown={this.handleEnterEvent} />
        </div>
    }
}

export default InputAtom;