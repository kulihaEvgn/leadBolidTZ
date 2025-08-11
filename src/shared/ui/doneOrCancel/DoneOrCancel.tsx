import s from "./DoneOrCancel.module.css";
import cancelIcon from "assets/icons/cancel-close-delete-svgrepo-com.svg";
import doneIcon from "assets/icons/done-round-svgrepo-com.svg";

interface IProps {
  onAddClick: () => void;
  onCancelClick: () => void;
}

export const DoneOrCancel = ({onAddClick, onCancelClick}: IProps) => {
  return (
    <div className={s.container}>
        <div className={s.iconContainer} onClick={onCancelClick}>
          <img className={s.icon} src={cancelIcon} alt="cancel"/>
        </div>
        <div className={s.iconContainer} onClick={onAddClick}>
          <img className={s.icon} src={doneIcon} alt="done"/>
        </div>
    </div>
  );
};