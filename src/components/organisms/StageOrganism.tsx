import React from "react";
import { AssemblyStage } from "../../interfaces/StageInterface";
import TaskItemListMolecules from "../molecules/TaskItemListMolecules";

interface IProps {
    stages: AssemblyStage[];
    moveNextStage?(stage: number, task: number): void;
    movePrevStage?(stage: number, task: number): void;
}

class StageOrganism extends React.Component<IProps> {
    moveNextStage = (stage: number, task: number) => {
        if (this.props.moveNextStage !== undefined) {
            this.props.moveNextStage(stage, task);
        }
    }

    movePrevStage = (stage: number, task: number) => {
        if (this.props.movePrevStage !== undefined) {
            this.props.movePrevStage(stage, task);
        }
    }
    render(): React.ReactNode {
        return <div data-testid="stageOrganism" className='stage-organism'>
            {this.props.stages.map((stage, index) => {
                return <div data-testid="stageOrganismStage" className='stage-card' key={index}>
                    <h5 className="stage-name">{stage.name}</h5>
                    <TaskItemListMolecules tasks={stage.tasks} moveNextStage={(task) => this.moveNextStage(index, task)} movePrevStage={(task) => this.movePrevStage(index, task)} />
                </div>
            })}
        </div>
    }
}

export default StageOrganism;