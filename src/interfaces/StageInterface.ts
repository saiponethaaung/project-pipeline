export interface AssemblyStage {
    name: string;
    tasks: StageTask[];
}

export interface StageTask {
    name: string;
}