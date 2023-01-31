import FullList from "../model/FullList";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement;

  static instance: ListTemplate = new ListTemplate();

  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }

  clear(): void {
    this.ul.innerHTML = "";
  }

  render(fullList: FullList): void {
    this.clear();

    fullList.list.forEach((item) => {
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";

      // checkbox 생성
      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = item.id;
      check.checked = item.checked;
      // checkbox를 li에 추가
      li.append(check);
      // checkbox event 처리
      check.addEventListener("change", () => {
        item.checked = !item.checked;
        fullList.save();
      });

      // label 생성
      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;
      // label를 li에 추가
      li.append(label);

      // button 생성
      const button = document.createElement("button") as HTMLButtonElement;
      button.className = "button";
      button.textContent = "X";
      // button을 li에 추가
      li.append(button);
      // button event 처리
      button.addEventListener("click", () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });
      // li를 ul에 추가
      this.ul.append(li);
    }); //forEach
  } //render
} //ListTemplate
