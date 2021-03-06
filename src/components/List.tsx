import { useState } from "react";

type ListProps = {
  initialItems: string[];
};

export const List = ({ initialItems }: ListProps) => {
  const [newItem, setNewItem] = useState("");
  const [list, setList] = useState(initialItems);

  const addToList = () => {
    setTimeout(() => {
      setList((state) => [...state, newItem]);
    }, 500);
  };

  const removeFromList = (item: string) => {
    setTimeout(() => {
      setList((state) => state.filter((item) => item !== item));
    }, 500);
  };

  return (
    <>
      <input
        placeholder="Novo item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addToList}>Adicionar</button>
      <ul>
        {list.map((item) => (
          <li key={item}>
            {item} <button onClick={() => removeFromList(item)}>Remover</button>
          </li>
        ))}
      </ul>
    </>
  );
};
