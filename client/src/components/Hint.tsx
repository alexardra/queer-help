/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Tooltip as ReactTooltip } from 'react-tooltip';

export const Hint = ({ id, text }: { id: string; text: string }) => {
  return (
    <>
      <a data-tooltip-id={id} data-tooltip-content={text}>
        <span className="ml-1 rounded-full border border-gray-300 px-1 text-xs text-gray-300">
          !
        </span>
      </a>
      <ReactTooltip id={id} />
    </>
  );
};
