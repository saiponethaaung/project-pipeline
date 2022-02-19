import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import TaskItemAtom from "./TaskItemAtom";

describe("Test Task Item atom", () => {
    it("Test component render", () => {
        render(<TaskItemAtom task={{ name: "Sample task" }} />);

        const taskItemElement = screen.getByText(/Sample task/i);
        expect(taskItemElement).toBeInTheDocument();
        expect(screen.getAllByText('Sample task').length).toBe(1);
    })

    it("Test left click event", () => {
        let eventCalled = false;
        
        render(<TaskItemAtom task={{ name: "Sample task" }} moveNextStage={() => eventCalled = true} />);

        fireEvent.click(screen.getByTestId("taskItemAtom"));

        expect(eventCalled).toBe(true);
    })

    it("Test right click event", () => {
        let eventCalled = false;

        render(<TaskItemAtom task={{ name: "Sample task" }} movePrevStage={() => eventCalled = true} />);

        fireEvent.contextMenu(screen.getByTestId("taskItemAtom"));

        expect(eventCalled).toBe(true);
    })
});