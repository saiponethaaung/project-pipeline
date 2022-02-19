import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { AssemblyStage } from '../../interfaces/StageInterface';
import StageOrganism from './StageOrganism';

describe("Test stage organism", () => {
    let stages: AssemblyStage[] = [
        {
            name: "Idea",
            tasks: [
                { name: "Idea Sample task" },
                { name: "Idea Sample task 2" }
            ]
        },
        {
            name: "Planning",
            tasks: [
                { name: "Planning Sample task" },
                { name: "Planning Sample task 2" }
            ]
        },
    ];

    it("Test component render", () => {
        render(<StageOrganism stages={stages} />);

        stages.forEach(s => {
            const stageItemElement = screen.getByText(s.name);
            expect(stageItemElement).toBeInTheDocument();
            expect(screen.getAllByText(s.name).length).toBe(1);
            s.tasks.forEach(t => {
                const taskItemElement = screen.getByText(t.name);
                expect(taskItemElement).toBeInTheDocument();
                expect(screen.getAllByText(t.name).length).toBe(1);
            })
        })

        let elements = screen.getAllByTestId("stageOrganismStage");

        expect(elements.length).toBe(2);
    })

    it("Test move next stage", () => {
        let stage = -1;
        let task = -1;

        render(<StageOrganism stages={stages} moveNextStage={(s, t) => {
            stage = s;
            task = t;
        }} />);

        fireEvent.click(screen.getByText(stages[0].tasks[1].name));

        expect(stage).toBe(0);
        expect(task).toBe(1);
    })
})