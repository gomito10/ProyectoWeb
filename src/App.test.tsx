import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App",()=>{
  test("Array debe renderizar como elementoss li",()=>{
    render(<App/>);
    const array=["luis","maru","mili","leon","cielo"];
    const items=screen.getAllByRole("listitem");
    expect(items).toHaveLength(array.length)
    array.forEach(nombre=>{
      expect(screen.getByText(nombre)).toBeInTheDocument();
    });
  });
});