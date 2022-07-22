import { cls, getImageSrc } from '@libs/client/utils';
import Image from 'next/image';

interface MessageProps {
  message: string;
  reversed?: boolean;
  userId?: string | null;
}

export default function Message({ message, userId, reversed }: MessageProps) {
  return (
    <div
      className={cls(
        'flex items-center',
        reversed ? 'flex-row-reverse space-x-reverse space-x-2' : 'space-x-2',
      )}
    >
      {userId ? (
        <Image
          src={getImageSrc(userId, 'avatar')}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full bg-slate-300 cursor-pointer"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-slate-300" />
      )}
      <div
        className={cls(
          'w-1/2 text-sm font-bold  text-gray-700 p-2 border  border-gray-300 rounded-md cursor-default ',
          reversed
            ? 'text-white bg-orange-500 hover:bg-orange-600 border-orange-300'
            : 'bg-gray-200 hover:bg-gray-100',
        )}
      >
        <p>{message}</p>
      </div>
    </div>
  );
}
