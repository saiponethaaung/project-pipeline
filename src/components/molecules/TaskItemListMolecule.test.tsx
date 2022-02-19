import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import TaskItemListMolecules from "./TaskItemListMolecules";
import { StageTask } from "../../interfaces/StageInterface";

describe("Test task item list molecule", () => {
    let tasks: StageTask[] = [
        { name: "Sample task" },
        { name: "Sample task 2" }
    ];

    it("Test component render", () => {
        render(<TaskItemListMolecules tasks={tasks} />);

        tasks.forEach(t => {
            const taskItemElement = screen.getByText(t.name);
            expect(taskItemElement).toBeInTheDocument();
            expect(screen.getAllByText(t.name).length).toBe(1);
        })

        let elements = screen.getAllByTestId("taskItemAtom");

        expect(elements.length).toBe(2);
    })

    it("Test move next stage", () => {
        let index = -1;
        render(<TaskItemListMolecules tasks={tasks} moveNextStage={(i) => index = i} />);

        fireEvent.click(screen.getByText(tasks[1].name));

        expect(index).toBe(1)
    })

    it("Test move prev stage", () => {
        let index = -1;
        render(<TaskItemListMolecules tasks={tasks} movePrevStage={(i) => index = i} />);

        fireEvent.contextMenu(screen.getByText(tasks[1].name));

        expect(index).toBe(1)
    })
});