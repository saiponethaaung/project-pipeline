import React from "react";
import { StageTask } from "../../interfaces/StageInterface";

interface IProps {
    task: StageTask;
    moveNextStage?(): void;
    movePrevStage?(): void;
}

class TaskItemAtom extends React.Component<IProps> {
    private ref!: HTMLDivElement | null;

    clickEvent = () => {
        if (this.props.moveNextStage) {
            this.props.moveNextStage();
        }
    }

    rightClickEvent = (e: MouseEvent) => {
        e.preventDefault();
        if (this.props.movePrevStage) {
            this.props.movePrevStage();
        }
    }

    componentDidMount() {
        if (this.ref !== null) {
            this.ref.addEventListener('contextmenu', this.rightClickEvent);
        }
    }

    componentWillUnmount() {
        if (this.ref !== null) {
            this.ref.removeEventListener('contextmenu', this.rightClickEvent);
        }
    }

    render(): React.ReactNode {
        return <div data-testid="taskItemAtom" className="task-item-atom" ref={(myRef) => this.ref = myRef} onClick={this.clickEvent}>
            {this.props.task.name}
        </div>
    }
}

export default TaskItemAtom;