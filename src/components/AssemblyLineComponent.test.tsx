import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import AssemblyLineComponent from "./AssemblyLineComponent";

describe("Test assembly line component", () => {
    let stages: string[] = [
        "Idea",
        "Planning",
    ];

    it("Test assembly line component", () => {
        const { container } = render(<AssemblyLineComponent stages={['Idea', 'Planning']} />);

        stages.forEach(s => {
            const stageItemElement = screen.getByText(s);
            expect(stageItemElement).toBeInTheDocument();
            expect(screen.getAllByText(s).length).toBe(1);
        });

        let elements = screen.getAllByTestId("assemblyLine");

        expect(elements.length).toBe(1);

        let input = screen.getByTestId('input');
        fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13, keyCode: 13 });
        expect(container.querySelectorAll('[data-testid="taskItemAtom"]').length).toBe(0);

        fireEvent.change(input, { target: { value: 'Sample task' } });
        fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13, keyCode: 13 });

        const taskItemElement = screen.getByText(/Sample task/i);
        expect(taskItemElement).toBeInTheDocument();
        expect(screen.getAllByText('Sample task').length).toBe(1);

        let stageCons = container.querySelectorAll('[data-testid="stageOrganismStage"]');

        expect(stageCons.length).toBe(2);

        expect(stageCons[0].querySelectorAll('[data-testid="taskItemAtom"]').length).toBe(1);
        expect(stageCons[1].querySelectorAll('[data-testid="taskItemAtom"]').length).toBe(0);

        fireEvent.click(screen.getByText("Sample task"));

        expect(stageCons[0].querySelectorAll('[data-testid="taskItemAtom"]').length).toBe(0);
        expect(stageCons[1].querySelectorAll('[data-testid="taskItemAtom"]').length).toBe(1);

        fireEvent.click(screen.getByText("Sample task"));
        
        expect(stageCons[0].querySelectorAll('[data-testid="taskItemAtom"]').length).toBe(0);
        expect(stageCons[1].querySelectorAll('[data-testid="taskItemAtom"]').length).toBe(0);
        
        fireEvent.change(input, { target: { value: 'Sample task' } });
        fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13, keyCode: 13 });
        
        fireEvent.click(screen.getByText("Sample task"));
        fireEvent.contextMenu(screen.getByText("Sample task"));

        expect(stageCons[0].querySelectorAll('[data-testid="taskItemAtom"]').length).toBe(1);
        expect(stageCons[1].querySelectorAll('[data-testid="taskItemAtom"]').length).toBe(0);

        fireEvent.contextMenu(screen.getByText("Sample task"));

        expect(stageCons[0].querySelectorAll('[data-testid="taskItemAtom"]').length).toBe(0);
        expect(stageCons[1].querySelectorAll('[data-testid="taskItemAtom"]').length).toBe(0);
    })
})