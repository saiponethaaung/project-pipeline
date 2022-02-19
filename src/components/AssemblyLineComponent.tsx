import React from 'react';
import { AssemblyStage } from '../interfaces/StageInterface';
import InputAtom from './atoms/InputAtom';
import StageOrganism from './organisms/StageOrganism';

interface IProps {
    stages: string[];
}

interface IStates {
    stages: AssemblyStage[];
}

class AssemblyLineComponent extends React.Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);

        let stages: AssemblyStage[] = [];

        this.props.stages.forEach(s => {
            stages.push({
                name: s,
                tasks: [],
            });
        });

        this.state = {
            stages: stages,
        };
    }

    addTask = (task: string) => {
        if (task === '') return;

        const { stages } = this.state;

        stages[0].tasks.unshift({
            name: task
        });

        this.setState({
            stages,
        });
    }

    moveNextStage = (stage: number, task: number) => {
        const { stages } = this.state;
        let moveTask = stages[stage].tasks.splice(task, 1)[0];

        if (stage < stages.length - 1) {
            stages[stage + 1].tasks.unshift(moveTask);
        }
        
        this.setState({
            stages,
        });
    }

    movePrevStage = (stage: number, task: number) => {
        const { stages } = this.state;
        let moveTask = stages[stage].tasks.splice(task, 1)[0];
        
        if (stage > 0) {
            stages[stage - 1].tasks.push(moveTask);
        }

        this.setState({
            stages,
        });
    }

    render(): React.ReactNode {
        return <div data-testid="assemblyLine" className="con-st-pad full-width">
            <div className="assembly-input-con">
                <label className="assembly-input-label">
                    <span className="assembly-prefixName">Add an item:</span>
                    <InputAtom enterEvent={this.addTask} />
                </label>
            </div>
            <StageOrganism stages={this.state.stages} moveNextStage={this.moveNextStage} movePrevStage={this.movePrevStage} />
        </div>
    }
}

export default AssemblyLineComponent;