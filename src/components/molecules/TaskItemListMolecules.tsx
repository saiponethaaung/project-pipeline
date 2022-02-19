import React from "react";
import { StageTask } from "../../interfaces/StageInterface";
import TaskItemAtom from "../atoms/TaskItemAtom";

interface IProps {
    tasks: StageTask[];
    moveNextStage?(index: number): void;
    movePrevStage?(index: number): void;
}

class TaskItemListMolecules extends React.Component<IProps> {
    moveNextStage = (index: number) => {
        if (this.props.moveNextStage) {
            this.props.moveNextStage(index);
        }
    }

    movePrevStage = (index: number) => {
        if (this.props.movePrevStage) {
            this.props.movePrevStage(index);
        }
    }

    render(): React.ReactNode {
        return <ul className="task-item-molecules">
            {this.props.tasks.length === 0 &&
                <li className="empty-task">No task in this card!</li>
            }
            {this.props.tasks.length > 0 &&
                this.props.tasks.map((task, index) => {
                    return <li key={index} className="task-item">
                        <TaskItemAtom task={task} moveNextStage={() => this.moveNextStage(index)} movePrevStage={() => this.movePrevStage(index)} />
                    </li>
                })
            }
        </ul>
    }
}

export default TaskItemListMolecules;