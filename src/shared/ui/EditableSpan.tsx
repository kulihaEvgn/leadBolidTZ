import { type KeyboardEvent, useEffect, useRef } from "react";

interface IProps {
  text: string
  isEdit: boolean

  onEditEnd?: (isEdit: boolean, text: string) => void
}

export const EditableSpan = ({isEdit, text, onEditEnd}: IProps) => {

  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (isEdit && spanRef?.current) {
      const el = spanRef.current;
      el.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(el);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [isEdit]);

  const onBlur = () => {
    onEditEnd?.(false, spanRef.current?.innerText || '');
  };
  const onDoubleClick = () => {
    onEditEnd?.(true, spanRef.current?.innerText || '');
  };
  const onKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') onEditEnd?.(false, spanRef.current?.innerText || '');
  };

  return <span
    style={{
      userSelect: 'none',
      cursor: 'pointer',
      width: '100%',
      overflow: 'hidden',
      whiteSpace: 'pre-wrap',
      fontWeight: 600,
  }}
     ref={spanRef}
     contentEditable={isEdit}
     onDoubleClick={onDoubleClick}
     onKeyDown={onKeyDown}
     onBlur={onBlur}>
    {text}
  </span>;
};