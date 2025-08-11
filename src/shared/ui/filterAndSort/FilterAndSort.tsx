import s from './FilterAndSort.module.css';


interface IProps<S extends { value: string; label: string }> {
  selectValue: S;
  selectOptions: S[];
  onChangeSelect: (option: S) => void;

  inputValue: string;
  onChangeInput: (value: string) => void;
}

export const FilterAndSort = <S extends { value: string; label: string }>({inputValue, onChangeInput, selectOptions, onChangeSelect, selectValue}: IProps<S>) => {
  return (
    <div className={s.container}>
      <select
        value={selectValue.value}
        onChange={(e) => onChangeSelect(selectOptions[e.target.selectedIndex])}
        className={s.select}
        name="filter"
        id="filter"
      >
        {selectOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <input value={inputValue} onChange={(e) => onChangeInput(e.target.value)} className={s.select} type="text" placeholder="Search..."/>
    </div>
  );
};