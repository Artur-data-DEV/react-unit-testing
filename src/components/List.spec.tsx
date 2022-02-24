import {
  render,
  waitFor,
  waitForElementToBeRemoved
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { List } from "./List";

// test("sum", () => {
//   const { getByText } = render(<List />);
//   expect(getByText("Hello World!")).toBeInTheDocument();
//   expect(getByText("Hello World!")).toBeTruthy();
//   expect(getByText("Hello World!")).toHaveAttribute("class", "test");
// });

describe("List Component", () => {
  it("should render list items", () => {
    const { getByText } = render(
      <List initialItems={["Diego", "Rodz", "Mayk"]} />
    );
    expect(getByText("Diego")).toBeInTheDocument();
  });

  it("should be able to add new item to the list", async () => {
    const { findByText, getByText, debug, getByPlaceholderText } = render(
      <List initialItems={[]} />
    );
    const inputElement = getByPlaceholderText("Novo item");
    const addButton = getByText("Adicionar");
    debug();
    userEvent.type(inputElement, "Novo");
    userEvent.click(addButton);
    // duas maneiras
    expect(await findByText("Novo")).toBeInTheDocument(); //primeira
    await waitFor(() => {
      // segunda
      expect(getByText("Novo")).toBeInTheDocument();
    });
  });

  it("should be able to remove an item from the list", async () => {
    const { getByText, getAllByText, queryByText } = render(
      <List initialItems={["Diego"]} />
    );
    const removeButtons = getAllByText("Remover");
    userEvent.click(removeButtons[0]);
    //duas maneiras
    await waitForElementToBeRemoved(() => {
      //primeira
      return getByText("Diego");
    });
    //segunda
    await waitFor(() => {
      expect(queryByText("Diego")).not.toBeInTheDocument();
    });
  });
});
